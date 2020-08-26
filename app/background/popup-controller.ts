import { Store } from "./store"
import { createLogger, getMintData } from "../core/utils"
import { Buffer } from "buffer"
import bs58 from "bs58"
import nacl from "tweetnacl"
import invariant from "assert"
import {
  AVAILABLE_NETWORKS,
  Network,
  Notification,
  PopupActions,
  SignatureResult,
} from "../core/types"
import {
  Account,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import { Web3Connection } from "../core/connection"
import { ExtensionManager } from "./lib/extension-manager"
import { TOKEN_PROGRAM_ID } from "../popup/components/dialogs/send-spl-dialog"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
const log = createLogger("sol:popup")
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware")

export interface PopupControllerOpt {
  store: Store
  connection: Web3Connection
  notifyAllDomains: ((payload: Notification) => Promise<void>) | null
  extensionManager: ExtensionManager
}

export class PopupController {
  private store: Store
  private _notifyAllDomains: ((payload: Notification) => Promise<void>) | null
  private connection: Web3Connection
  private extensionManager: ExtensionManager

  constructor(opts: PopupControllerOpt) {
    log("popup controller constructor")
    const { store, notifyAllDomains, connection, extensionManager } = opts
    this.store = store
    this.connection = connection
    this._notifyAllDomains = notifyAllDomains
    this.extensionManager = extensionManager
  }

  createMiddleware() {
    return createAsyncMiddleware(async (req: any, res: any, next: any) => {
      log("createAsyncMiddleware with req: %O", req)
      const method = req.method as PopupActions
      switch (method) {
        case "popup_getState":
          break
        case "popup_createWallet":
          const { mnemonic, seed, password } = req.params
          try {
            await this.store.createSecretBox(mnemonic, seed, password)
            this._notifyAll({
              type: "stateChanged",
              data: { state: "unlocked" },
            })
          } catch (err) {
            log("error: popup_createWallet failed  with error: %s", err)
            res.error = err
          }
          break
        case "popup_unlockWallet":
          log("Handling popup_unlockWallet with origin:")
          try {
            await this.store.unlockSecretBox(req.params.password)

            this._notifyAll({
              type: "stateChanged",
              data: { state: "unlocked" },
            })
          } catch (err) {
            log("error: popup_unlockWallet failed  with error: %s", err)
            res.error = err
          }
          break
        case "popup_lockWallet":
          log("Handling popup_lockWallet")
          try {
            await this.store.lockSecretBox()
            this._notifyAll({
              type: "stateChanged",
              data: { state: "locked" },
            })
          } catch (err) {
            log("error: popup_lockWallet failed  with error: %s", err)
            res.error = err
          }
          break
        case "popup_authoriseRequestAccounts":
          try {
            await this.approveRequestAccounts(req)
            await this.extensionManager.closePopup()
          } catch (err) {
            log("Failed popup_approvePermissionsRequest with error: %s", err)
            res.error = err
          }
          break
        case "popup_deleteAuthorizedWebsite":
          try {
            await this.deleteAuthorizedWebsite(req)
          } catch (err) {
            log("Failed popup_deleteAuthorizedWebsite with error: %s", err)
            res.error = err
          }
          break
        case "popup_declineRequestAccounts":
          try {
            await this.declineRequestAccounts(req)
            await this.extensionManager.closePopup()
          } catch (err) {
            log("Failed popup_declineRequestAccounts with error: %s", err)
            res.error = err
          }
          break
        case "popup_authoriseTransaction":
          try {
            await this.signTransaction(req)
            await this.extensionManager.closePopup()
          } catch (err) {
            log("popup_approvePermissionsRequest failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_declineTransaction":
          try {
            await this.declineTransaction(req)
            await this.extensionManager.closePopup()
          } catch (err) {
            log("popup_declineTransaction failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_sendSolToken":
          try {
            await this.sendSolToken(req)
          } catch (err) {
            log("popup_sendSolToken failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_sendSplToken":
          try {
            await this.sendSplToken(req)
          } catch (err) {
            log("popup_sendSolToken failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_addToken":
          try {
            await this.addToken(req)
          } catch (err) {
            log("popup_addToken failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_removeToken":
          log(`remove token for req %O`, req)
          const { mintAddress } = req.params
          this.store.removeToken(mintAddress)
          break
        case "popup_updateToken":
          log(`update token for req %O`, req)
          this.store.updateToken(req.params['mintAddress'], req.params['token'])
          break
        case "popup_addWalletAccount":
          this.addAccount()
          break
        case "popup_changeNetwork":
          try {
            this.changeNetwork(req)
          } catch (err) {
            log("popup_changeNetwork failed with error: %s", err)
            res.error = err
          }
          break
        case "popup_changeAccount":
          try {
            this.changeAccount(req)
          } catch (err) {
            log("popup_changeAccount failed with error: %s", err)
            res.error = err
          }
          break
        default:
          log("popup controller middleware did not match method name %s", req.method)
          await next()
          return
      }
      // if any of the above popup commands did not error
      // out make sure to return the state, the popup expects it!
      if (!res.error) {
        res.result = this.store.getState()
      }
    })
  }


  async addToken(req: any) {
    log(`adding token for req %O`, req)
    const { token } = req.params

    try {
      log("Retrieving mint data: %s", token.mintAddress)
      const mintData = await getMintData(this.connection.conn, new PublicKey(token.mintAddress))
      this.store.addToken({
        mintAddress: token.mintAddress,
        name: token.name,
        symbol: token.symbol,
        decimals: mintData.decimals
      })
    }catch (e) {
      throw new Error(`Could not add token: ${e}`)
    }
  }

  async approveRequestAccounts(req: any) {
    log("Approving request request account: %O", req)

    const { tabId, origin } = req.params
    if (!tabId) {
      log(
        "Unable to determine request accounts permission for tabId %s and origin %s:",
        tabId,
        origin
      )
      return
    }
    const tabs = this.store.getPendingRequestAccountsForOrigin(origin)

    if (!tabs) {
      log("Request Account with origin %s and tabId %s not found", origin, tabId)
      return
    }
    this.store.addAuthorizedOrigin(origin)
    Object.keys(tabs).forEach((tabId) => {
      tabs[tabId].resolve({
        accounts: this.store.wallet ? this.store.wallet.getPublicKeysAsBs58() : [],
      })
    })

    this.store.removePendingRequestAccountsForOrigin(origin)
  }

  async deleteAuthorizedWebsite(req: any) {
    log("deleting authorized website: %O", req)

    const { origin } = req.params

    this.store.removeAuthorizedOrigin(origin)
  }

  async declineRequestAccounts(req: any) {
    log("Declining request accounts for %O", req)
    const { origin, tabId } = req.params

    const request = this.store.getPendingRequestAccounts(origin, tabId)
    if (!request) {
      log("Permissions request with origin %s and tabId %s not found", origin, tabId)
      return
    }

    request.reject("access to accounts deny")
    this.store.removePendingRequestAccounts(origin, tabId)
  }

  async signTransaction(req: any) {
    log("Signing transaction request for %O", req)
    const { tabId } = req.params

    const pendingTransaction = this.store.pendingTransactions.get(tabId)
    if (!pendingTransaction) {
      log("Unable to determine request transaction to be signed for tabId: %s", tabId)
      return
    }

    if (!this.store.wallet) {
      log("Unable sign tranasction with out a wallet for tabId %s", tabId)
      return
    }
    const wallet = this.store.wallet

    const m = new Buffer(bs58.decode(pendingTransaction.transaction.message))

    const signatureResults: SignatureResult[] = []
    pendingTransaction.transaction.signers.forEach((signerKey) => {
      log("Search for signer account: %s", signerKey)
      const account = wallet.findAccount(signerKey)
      if (!account) {
        throw new Error("no account found for signer key: " + signerKey)
      }
      const signature = nacl.sign.detached(m, account.secretKey)
      invariant(signature.length === 64)
      signatureResults.push({ publicKey: signerKey, signature: bs58.encode(signature) })
    })

    pendingTransaction.resolve({ signatureResults: signatureResults })
    this.store.removePendingTransaction(tabId)
  }

  async declineTransaction(req: any) {
    log("Declining transaction request for %O", req)
    const { tabId } = req.params

    const pendingTransaction = this.store.pendingTransactions.get(tabId)
    if (!pendingTransaction) {
      log("Unable to determine request transaction to be declined for tabId: %s", tabId)
      return
    }

    pendingTransaction.reject("Transaction declined")
    this.store.removePendingTransaction(tabId)
  }

  changeNetwork(req: any) {
    log("Changing network: %O", req)

    const onExit = (network: Network) => {
      // change the connection network option
      this.connection.changeNetwork(network)
      this._notifyAll({
        type: "clusterChanged",
        data: network,
      })
    }
    // TODO: Endpoint will be used here to add a customer cluster
    const { cluster, endpoint } = req.params
    if (!cluster) {
      throw new Error("Must specify an network endpoint to change network")
    }
    for (const network of AVAILABLE_NETWORKS) {
      if (network.cluster === cluster) {
        this.store.selectedNetwork = network
        onExit(network)
        return
      }
    }

    this.store.selectedNetwork = {
      title: "Custom",
      cluster: cluster,
      endpoint: endpoint,
    }
    onExit(this.store.selectedNetwork)
  }

  changeAccount(req: any) {
    log("Changing account: %O", req)

    const { account } = req.params
    if (!account) {
      throw new Error("Must specify an account")
    }
    if (!this.store.wallet) {
      throw new Error("Cannot select account without a wallet ")
    }

    for (const act of this.store.wallet?.getPublicKeysAsBs58()) {
      if (account === act) {
        this.store.selectedAccount = account
        return
      }
    }

    throw new Error(`Selected account %{act} not found`)
  }

  addAccount() {
    const newAccount = this.store.wallet?.addAccount()

    if (newAccount) {
      this.store.selectedAccount = newAccount.publicKey.toBase58()
      this._notifyAll({
        type: "accountsChanged",
        data: this.store.wallet?.getPublicKeysAsBs58() || [],
      })
    }
  }

  _notifyAll(notification: Notification) {
    log("Notifying all domains")
    if (this._notifyAllDomains) {
      this._notifyAllDomains(notification)
        .then(() => {
          log("Notifying domains completed")
        })
        .catch((err) => {
          log("Error notifying domains: %s", err)
        })
    }
  }

  async sendSolToken(req: any) {
    log(`send token for req %O`, req)
    const transfer = req.params.transfer

    if (!this.store.wallet) {
      throw new Error(`Unable sign and send transaction with out a wallet`)
    }

    let signingAccount: Account | undefined
    this.store.wallet.accounts.forEach((a: Account) => {
      if (a.publicKey.toBase58() === req.params.transfer.fromPubkey) {
        signingAccount = a
      }
    })

    if (!signingAccount) {
      throw new Error(`no account found in wallet for pubkey: ${req.params.transfer}`)
    }

    const lamports = req.params.transfer.lamports
    log("lamports for transaction: %O", lamports)
    const transaction = SystemProgram.transfer({
      fromPubkey: new PublicKey(transfer.fromPubkey),
      toPubkey: new PublicKey(transfer.toPubkey),
      lamports: lamports,
    })

    log("creating connection with address: ", this.store.selectedNetwork.endpoint)
    const connection = new Connection(this.store.selectedNetwork.endpoint)

    log("sending transaction %O", transaction)

    try {
      const signature = await connection.sendTransaction(transaction, [signingAccount])
      log("Got signature:", signature)
    } catch (e) {
      throw new Error("Failed to send transaction: " + e)
    }
  }

  async sendSplToken(req: any) {
    log(`send spl token for req %O`, req)
    const transfer = req.params.transfer

    if (!this.store.wallet) {
      throw new Error(`Unable sign and send transaction with out a wallet`)
    }

    let signingAccount: Account | undefined
    this.store.wallet.accounts.forEach((a: Account) => {
      if (a.publicKey.toBase58() === req.params.transfer.signer) {
        signingAccount = a
      }
    })

    if (!signingAccount) {
      throw new Error(`no account found in wallet for pubkey: ${req.params.transfer}`)
    }

    const amount = req.params.transfer.amount
    log("amount for transaction: %O", amount)

    const bufferLayout = BufferLayout.union(BufferLayout.u8("instruction"))
    bufferLayout.addVariant(3, BufferLayout.struct([BufferLayout.nu64("amount")]), "transfer")
    const instructionMaxSpan = Math.max(
      ...Object.values(bufferLayout.registry).map((r: any) => r.span)
    )
    let b = Buffer.alloc(instructionMaxSpan)
    let span = bufferLayout.encode(
      {
        transfer: { amount: amount },
      },
      b
    )

    const encodedData = b.slice(0, span)
    const transaction = new Transaction()
    transaction.add(
      new TransactionInstruction({
        keys: [
          { pubkey: new PublicKey(transfer.fromPubkey), isSigner: false, isWritable: true },
          { pubkey: new PublicKey(transfer.toPubkey), isSigner: false, isWritable: true },
          { pubkey: signingAccount.publicKey, isSigner: false, isWritable: false },
        ],
        data: encodedData,
        programId: TOKEN_PROGRAM_ID,
      })
    )

    log("creating connection with address: ", this.store.selectedNetwork.endpoint)
    const connection = new Connection(this.store.selectedNetwork.endpoint)

    log("sending transaction %O", transaction)
    try {
      const signature = await connection.sendTransaction(transaction, [signingAccount])
      log("Got signature:", signature)
    } catch (e) {
      throw new Error("Failed to send transaction: " + e)
    }
  }
}
