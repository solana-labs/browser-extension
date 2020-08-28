import { createLogger } from "../core/utils"
import { Wallet } from "./lib/wallet"
import { randomBytes, secretbox } from "tweetnacl"
import bs58 from "bs58"
import { pbkdf2 } from "crypto"
import {
  DEFAULT_NETWORK,
  MintAddressTokens,
  Network,
  NetworkTokens,
  SecretBox,
  StoredData,
  Token,
  WalletState
} from "../core/types"

const log = createLogger("sol:bg:store")

export class Store {
  public popIsOpen: boolean

  public wallet: Wallet | null
  private initialAccountCount: number

  // persisted information
  public secretBox: SecretBox | null
  public selectedNetwork: Network
  public selectedAccount: string
  public authorizedOrigins: string[]
  public tokens: NetworkTokens

  constructor(initialStore: StoredData) {
    const {
      secretBox,
      accountCount,
      selectedNetwork,
      selectedAccount,
      authorizedOrigins,
      tokens
    } = initialStore
    this.popIsOpen = false

    // We should always have at-least 1 account at all time
    this.initialAccountCount = accountCount ?? 1
    this.selectedNetwork = selectedNetwork || DEFAULT_NETWORK
    this.selectedAccount = selectedAccount
    this.wallet = null
    this.secretBox = null
    if (secretBox) {
      this.secretBox = secretBox
    }
    this.authorizedOrigins = authorizedOrigins || []
    console.log("setting up tokens: ", tokens)
    this.tokens = tokens || {}
  }

  isLocked(): boolean {
    if (this.secretBox) {
      return true
    }
    return false
  }

  isUnlocked(): boolean {
    if (this.wallet) {
      return true
    }
    return false
  }

  getWalletState = (): WalletState => {
    if (this.hasSecretBox()) {
      return "locked"
    } else if (this.hasWallet()) {
      return "unlocked"
    } else {
      return "uninitialized"
    }
  }

  lockSecretBox() {
    this.wallet = null
    this.selectedAccount = ""
  }

  hasSecretBox() {
    if (this.secretBox) {
      return true
    }
    return false
  }

  hasWallet() {
    if (this.wallet) {
      return true
    }
    return false
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
      digest
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
          digest
        } as SecretBox
        this.wallet = Wallet.NewWallet(seed, 1)
        this.selectedAccount = this.wallet.accounts[0].publicKey.toBase58()
        return
      })
      .catch((err) => {
        throw new Error(`Unable to encrypt box: ${err}`)
      })
  }

  addAuthorizedOrigin(origin: string) {
    this.authorizedOrigins = [...this.authorizedOrigins, origin]
    log("Authorized this origin %s", origin)
  }

  removeAuthorizedOrigin(originToRemove: string) {
    this.authorizedOrigins = this.authorizedOrigins.filter(function(origin) {
      return origin !== originToRemove
    })
  }

  isOriginAuthorized(origin: string): boolean {
    const found = this.authorizedOrigins.includes(origin)

    if (found) {
      log("origin was already authorize:", origin)
      return true
    }

    log("origin need to be authorize", origin)
    return false
  }

  addToken(token: Token): boolean {
    log(
      "Adding Token [%s] %s to network %s",
      token.mintAddress,
      token.name,
      this.selectedNetwork.endpoint
    )
    if (!token.mintAddress) {
      log(
        "Unable to add mint [%s] %s to network %s: Mint does not have a public key",
        token.mintAddress,
        token.name,
        this.selectedNetwork.endpoint
      )
      return false
    }

    const networkTokens = this.tokens[this.selectedNetwork.endpoint]
    if (!networkTokens) {
      log(
        "Unable to add mint [%s] %s to network %s: network not found",
        token.mintAddress,
        token.name,
        this.selectedNetwork.endpoint
      )
      return false
    }

    networkTokens[token.mintAddress] = token
    return true
  }

  updateToken(oldPublicKey: string, token: Token): boolean {
    log(
      "Updating mint with public key: %s to:  [%s] %s to network %s",
      oldPublicKey,
      token.mintAddress,
      token.name,
      this.selectedNetwork.endpoint
    )

    if (!token.mintAddress) {
      log("Unable to update mint: Mint %s does not have a public key", token.name)
      return false
    }

    const networkTokens = this.tokens[this.selectedNetwork.endpoint]
    if (!networkTokens) {
      log(
        "Unable to update mint [%s] %s to network %s: network not found",
        token.mintAddress,
        token.name,
        this.selectedNetwork.endpoint
      )
      return false
    }

    if (!networkTokens[oldPublicKey]) {
      log(
        "Unable to update mint [%s] %s to network %s: mint not found",
        token.mintAddress,
        token.name,
        this.selectedNetwork.endpoint
      )
      return false
    }

    if (token.mintAddress !== oldPublicKey) {
      log("Mint public key is changing removing old mint and adding new one")
      delete networkTokens[oldPublicKey]
    }

    log("Updating mint")
    networkTokens[token.mintAddress] = token
    return true
  }

  removeToken(publicKey: string): boolean {
    log("Removing mint with public key %s: %s", publicKey, this.selectedNetwork.endpoint)

    const networkTokens = this.tokens[this.selectedNetwork.endpoint]
    if (!networkTokens) {
      log(
        "Unable to remove mint %s to network %s: network not found",
        publicKey,
        this.selectedNetwork.endpoint
      )
      return false
    }

    if (!networkTokens[publicKey]) {
      log(
        "Unable to remove mint %s from network %s: mint not found",
        publicKey,
        this.selectedNetwork.endpoint
      )
      return false
    }

    delete networkTokens[publicKey]
    return true
  }

  getTokens(network: Network): MintAddressTokens {
    log("getTokens with network: %O, tokens: %O", network, this.tokens)
    return this.tokens[network.endpoint] || {}
  }

  getToken(network: Network, accountAddress: string): Token | undefined {
    const networkTokens = this.tokens[network.endpoint]
    log("token for network: %O, %O", network)
    if (networkTokens) {
      return networkTokens[accountAddress]
    }
    return undefined
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
