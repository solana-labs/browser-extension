import { createLogger } from "../core/utils"
import { Wallet } from "./lib/wallet"
import { randomBytes, secretbox } from "tweetnacl"
import bs58 from "bs58"
import { pbkdf2 } from "crypto"
import {
  AVAILABLE_NETWORKS,
  DEFAULT_NETWORK,
  Network,
  PendingRequestAccounts,
  PendingSignTransaction,
  PopupState,
  RequestAccountsResp,
  SecretBox,
  SignTransactionResp,
  StoredData,
  TransactionDetails,
} from "../core/types"

const log = createLogger("sol:bg:store")

type StorePendingRequestAccount = {
  request: PendingRequestAccounts
  resolve: (resp: RequestAccountsResp) => void
  reject: any
}

type StorePendingTransaction = {
  transaction: PendingSignTransaction
  resolve: (resp: SignTransactionResp) => void
  reject: any
}

export class Store {
  public popIsOpen: boolean

  public pendingRequestAccounts: Map<string, { [tabId: string]: StorePendingRequestAccount }>
  public pendingTransactions: Map<string, StorePendingTransaction>
  public wallet: Wallet | null
  private initialAccountCount: number

  // persisted information
  public secretBox: SecretBox | null
  public selectedNetwork: Network
  public selectedAccount: string
  public authorizedOrigins: string[]

  constructor(initialStore: StoredData) {
    const {
      secretBox,
      accountCount,
      selectedNetwork,
      selectedAccount,
      authorizedOrigins,
    } = initialStore
    this.popIsOpen = false

    // We should always have at-least 1 account at all time
    this.initialAccountCount = accountCount == undefined ? 1 : accountCount
    this.pendingRequestAccounts = new Map()

    this.pendingTransactions = new Map()
    this.selectedNetwork = selectedNetwork || DEFAULT_NETWORK
    this.selectedAccount = selectedAccount
    this.wallet = null
    this.secretBox = null
    if (secretBox) {
      this.secretBox = secretBox
    }
    this.authorizedOrigins = authorizedOrigins || []
  }

  isUnlocked(): boolean {
    if (this.wallet) {
      return true
    }
    return false
  }
  getState(): PopupState {
    let state: PopupState = {
      walletState: "uninitialized",
      accounts: [],
      selectedNetwork: this.selectedNetwork,
      availableNetworks: AVAILABLE_NETWORKS,
      selectedAccount: this.selectedAccount,
      pendingTransactions: [],
      pendingRequestAccounts: [],
      authorizedOrigins: [],
    }

    if (this.secretBox) {
      state.walletState = "locked"
    }
    if (this.wallet) {
      state.walletState = "unlocked"
      state.accounts = this.wallet.getPublicKeysAsBs58()
      state.authorizedOrigins = this.authorizedOrigins
    }

    this.pendingTransactions.forEach((value, key, map) => {
      state.pendingTransactions = [
        ...state.pendingTransactions,
        {
          tabId: key,
          message: value.transaction.message,
          details: value.transaction.details,
        } as PendingSignTransaction,
      ]
    })

    this.pendingRequestAccounts.forEach((originRequest, origin, map) => {
      Object.keys(originRequest).forEach(function (tabId) {
        state.pendingRequestAccounts = [
          ...state.pendingRequestAccounts,
          {
            tabId: tabId,
            origin: origin,
          } as PendingRequestAccounts,
        ]
      })
    })

    return state
  }

  unlockSecretBox(password: string) {
    if (!this.secretBox) {
      throw new Error("Cannot find secret box in storage")
    }

    if (this.wallet) {
      log("Wallet already exists in memory.. don't do anything")
      return
    }

    const {
      encryptedBox: encodedEncrypted,
      nonce: encodedNonce,
      salt: encodedSalt,
      iterations,
      digest,
    } = this.secretBox

    const encrypted = bs58.decode(encodedEncrypted)
    const nonce = bs58.decode(encodedNonce)
    const salt = bs58.decode(encodedSalt)

    return deriveEncryptionKey(password, salt, iterations, digest)
      .then((key) => {
        const plaintext = secretbox.open(encrypted, nonce, key)
        if (!plaintext) {
          throw new Error("Incorrect password")
        }
        const decodedPlaintext = new Buffer(plaintext).toString()
        const { seed } = JSON.parse(decodedPlaintext)

        this.wallet = Wallet.NewWallet(seed, this.initialAccountCount)
        this.selectedAccount = this.wallet.accounts[0].publicKey.toBase58()
      })
      .catch((err) => {
        throw new Error(`Unable to decrypt box: ${err}`)
      })
  }

  async createSecretBox(mnemonic: string, seed: string, password: string): Promise<void> {
    const plaintext = JSON.stringify({ mnemonic, seed })

    const salt = new Buffer(randomBytes(16))
    const kdf = "pbkdf2"
    const iterations = 100000
    const digest = "sha256"

    return deriveEncryptionKey(password, salt, iterations, digest)
      .then((key) => {
        const nonce = randomBytes(secretbox.nonceLength)
        const encrypted = secretbox(Buffer.from(plaintext), nonce, key)
        this.secretBox = {
          encryptedBox: bs58.encode(encrypted),
          nonce: bs58.encode(nonce),
          kdf,
          salt: bs58.encode(salt),
          iterations,
          digest,
        } as SecretBox
        this.wallet = Wallet.NewWallet(seed, 1)
        this.selectedAccount = this.wallet.accounts[0].publicKey.toBase58()
        return
      })
      .catch((err) => {
        throw new Error(`Unable to encrypt box: ${err}`)
      })
  }

  _getPendingRequestAccountsForOrigin(
    origin: string
  ): { [tabId: string]: StorePendingRequestAccount } | undefined {
    return this.pendingRequestAccounts.get(origin)
  }

  _getPendingRequestAccounts(
    origin: string,
    tabId: string
  ): StorePendingRequestAccount | undefined {
    log("Retrieving pending request accounts for origin %s and tabId %s", origin, tabId)
    const originTabs = this.pendingRequestAccounts.get(origin)
    if (!originTabs) {
      return undefined
    }
    return originTabs[tabId]
  }

  _addPendingRequestAccount(tabId: string, origin: string, resolve: any, reject: any) {
    const pendingRequestAccount = {
      request: { origin, tabId },
      resolve,
      reject,
    } as StorePendingRequestAccount
    let originTabs = this.pendingRequestAccounts.get(origin)

    if (!originTabs) {
      log("First tab %s from origin %s, creating an origin map", tabId, origin)
      originTabs = {}
      originTabs[tabId] = pendingRequestAccount
    } else if (Object.keys(originTabs).includes(tabId)) {
      throw new Error(
        `Pending request account with id '${tabId}' and origin '${origin}' already exists.`
      )
    } else {
      log("Adding tab %s to origin %s map", tabId, origin)
      originTabs[tabId] = pendingRequestAccount
    }
    log(
      "Updating requesting accounts for origin  %s and tabId %s, new count %s",
      tabId,
      origin,
      Object.keys(originTabs).length
    )
    this.pendingRequestAccounts.set(origin, originTabs)
  }

  _removePendingRequestAccountsForOrigin(origin: string) {
    log("Removing pending request accounts for origin %s ", origin)
    this.pendingRequestAccounts.delete(origin)
  }

  _removePendingRequestAccounts(origin: string, tabId: string) {
    log("Removing pending request accounts for origin %s and tabId %s", origin, tabId)
    const originTabs = this.pendingRequestAccounts.get(origin)
    if (!originTabs) {
      return
    }
    log("Deleting request account for origin %s at tabId %s", origin, tabId)
    delete originTabs[tabId]
    if (Object.keys(originTabs).length == 0) {
      log("No more request account tabs for origin %s cleaning up", origin)
      this.pendingRequestAccounts.delete(origin)
    }
  }

  _addPendingTransaction(
    tabId: string,
    message: string,
    resolve: any,
    reject: any,
    details?: TransactionDetails
  ) {
    if (this.pendingTransactions.has(tabId)) {
      throw new Error(`Pending transaction from tabID '${tabId}' already exists.`)
    }

    log("Adding pending transaction from tabId %s", tabId)
    this.pendingTransactions.set(tabId, {
      transaction: { message, tabId, details },
      resolve,
      reject,
    })
  }

  _removePendingTransaction(tabId: string) {
    const result = this.pendingTransactions.get(tabId)
    if (!result) {
      return
    }
    this.pendingTransactions.delete(tabId)
  }

  _addAutorizedOrigin(origin: string) {
    this.authorizedOrigins = [...this.authorizedOrigins, origin]
    log("Authorized this origin %s", origin)
  }

  _isOriginAuthorized(origin: string): boolean {
    const found = this.authorizedOrigins.includes(origin)

    if (found) {
      log("origin was already authorize")
      return true
    }

    log("origin need to be authorize")
    return false
  }
}

const deriveEncryptionKey = async (
  password: any,
  salt: any,
  iterations: number,
  digest: any
): Promise<any> => {
  return new Promise((resolve, reject) =>
    pbkdf2(password, salt, iterations, secretbox.keyLength, digest, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  )
}
