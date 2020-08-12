import { Store } from "./store"
import { createLogger, decodeSerializedMessage } from "../core/utils"
import { RequestAccountsResp, SignTransactionResp, WallActions } from "../core/types"
import bs58 from "bs58"
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, SystemInstruction, Transaction } from '@solana/web3.js';
import { Buffer } from "buffer"
import { Decoder } from "../core/decoder"

const log = createLogger("sol:walletCtr")
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware")

interface WalletControllerOpt {
  store: Store
  decoder: Decoder
  openPopup: () => Promise<void>
}

interface MiddlewareOpts {
  origin: string
  extensionId: string
}

export class WalletController {
  private store: Store
  private openPopup: any
  private decoder: Decoder

  constructor(opts: WalletControllerOpt) {
    log("wallet controller constructor")
    const { store, openPopup, decoder } = opts
    this.store = store
    this.openPopup = openPopup
    this.decoder = decoder
  }

  createMiddleware(opts: MiddlewareOpts) {
    const { origin, extensionId } = opts

    if (typeof origin !== "string" || !origin.length) {
      throw new Error("Must provide non-empty string origin.")
    }

    return createAsyncMiddleware(async (req: any, res: any, next: any) => {
      const method = req.method as WallActions
      switch (method) {
        case "wallet_test":
          this._handleTest(req)
        case "wallet_requestAccounts":
          try {
            let resp = await this._handleRequestAccounts(req)
            res.result = resp
          } catch (err) {
            log("wallet_requestAccounts failed  with error: %O", err)
            res.error = err
          }
          break
        case "wallet_signTransaction":
          log("wallet controller middleware match: 'wallet_signTransaction'")
          try {
            let resp = await this._handleSignTransaction(req)
            log("wallet_signTransaction resolved %O", resp)
            res.result = resp
          } catch (err) {
            log("error: wallet_signTransaction failed  with error: %s", err)
            res.error = err
          }
          break
        case "wallet_getCluster":
          res.result = this.store.selectedNetwork.endpoint
          break
        case "wallet_getState":
          res.result = { locked: !this.store.isUnlocked() }
          log("wallet_getState returned:", { locked: !this.store.isUnlocked() })
          break
        default:
          log("wallet controller unknown method name [%s] with params: %o", req.method, req.params)
          // when this promise resolves, the response is on its way back
          // eslint-disable-next-line callback-return
          await next()
      }
    })
  }

  _handleTest = (req: any) => {
    const {
      tabId,
      params: { message },
    } = req
    log("Handling sign transaction tabId: %s message: %s", tabId, message)
    try {
      const decodedMessage = bs58.decode(message)
      const trxMessage = decodeSerializedMessage(new Buffer(decodedMessage))
      const trx = Transaction.populate(trxMessage,[])
      log("transaction: %O",trx)
      const details = this.decoder.decode(trx)
      if (details) {
        log("Transaction details: %O", details)
      } else {
        log("Could not determine transaction details")
      }
    }catch (e) {
      log("error populating transaction: %O",e)
    }
  }



  _handleRequestAccounts = (req: any): Promise<RequestAccountsResp> => {
    const { tabId, origin, metadata } = req
    log("Handling request accounts tabId: %s origin: %s, metadata: %O)", tabId, origin, metadata)

    //todo: popup only if user never agree to request account for this origin
    if (this.store._isOriginAuthorized(origin)) {
      return new Promise<RequestAccountsResp>((resolve, reject) => {
        resolve({ accounts: this.store.wallet ? this.store.wallet.getPublicKeysAsBs58() : [] })
      })
    }

    //origin need authorization
    this._showPopup()
    return new Promise<RequestAccountsResp>((resolve, reject) => {
      this.store._addPendingRequestAccount(tabId, origin, resolve, reject)
    })
  }

  _handleSignTransaction = (req: any): Promise<SignTransactionResp> => {
    const {
      tabId,
      params: { message },
    } = req
    log("Handling sign transaction tabId: %s message: %s", tabId, message)
    const serializedTrx = bs58.decode(message)
    log("Serialized transaction: %O", serializedTrx)



    /// decode the message if it matches a known address
    /*
    1 - Find the to address,
    2 - use connection.getAccountInfo to the the owner information of said account
    3a - if owner matches TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o decode as SPL token transfer
       - use the human readble token symbol if available
    3b - if owner matches dex program id  9o1FisE366msTQcEvXapyMorTLmvezrxSD8DnM5e5XKw decode as Serum Dex transaction using instruction.js from serum.js
    3c - Attempt to decode as SOL transfer
    */
    this._showPopup()

    return new Promise<SignTransactionResp>((resolve, reject) => {
      this.store._addPendingTransaction(tabId, message, resolve, reject)
    })
  }

  async _showPopup() {
    return this.openPopup().then(() => {
      log("popup opened!")
    })
  }
}
