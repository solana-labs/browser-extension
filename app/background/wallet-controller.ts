import { Store } from "./store"
import { createLogger, decodeSerializedMessage } from "../core/utils"
import { InstructionDetails, RequestAccountsResp, SignTransactionResp, WallActions } from "../core/types"
import bs58 from "bs58"
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js"
import { Buffer } from "buffer"
import { Decoder } from "../core/decoder"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"

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
          res.result = this.store.selectedNetwork
          break
        case "wallet_getState":
          let resp = { state: "uninitialized" }
          if (this.store.isLocked()) {
            resp.state = "locked"
          }
          if (this.store.isUnlocked()) {
            resp.state = "unlocked"
          }
          log("wallet_getState returned:", resp)
          res.result = resp
          break
        default:
          log("wallet controller unknown method name [%s] with params: %o", req.method, req.params)
          // when this promise resolves, the response is on its way back
          // eslint-disable-next-line callback-return
          await next()
      }
    })
  }

  _handleRequestAccounts = (req: any): Promise<RequestAccountsResp> => {
    const { tabId, origin, metadata } = req
    log("Handling request accounts tabId: %s origin: %s, metadata: %O)", tabId, origin, metadata)

    //todo: popup only if user never agree to request account for this origin
    if (this.store.isOriginAuthorized(origin)) {
      return new Promise<RequestAccountsResp>((resolve, reject) => {
        resolve({ accounts: this.store.wallet ? this.store.wallet.getPublicKeysAsBs58() : [] })
      })
    }

    //origin need authorization
    this._showPopup()
    return new Promise<RequestAccountsResp>((resolve, reject) => {
      this.store.addPendingRequestAccount(tabId, origin, resolve, reject)
    })
  }

  _handleSignTransaction = async (req: any): Promise<SignTransactionResp> => {
    let {
      tabId,
      params: { message, blockHash, signer }
    } = req
    log("Handling sign transaction tabId: %s message: %s for signer %s", tabId, message, signer)
    let instructionDetailsList: (InstructionDetails | undefined)[] = []
    try {
      const decodedMessage = bs58.decode(message)
      const trxMessage = decodeSerializedMessage(new Buffer(decodedMessage))
      const trx = Transaction.populate(trxMessage, [])
      log("transaction: %O", trx)
      instructionDetailsList = await this.decoder.decode(trx)
      if (instructionDetailsList) {
        log("Transaction details: %O", instructionDetailsList)
      } else {
        log("Could not determine transaction details")
      }
    } catch (e) {
      log("error populating transaction: %O", e)
    }

    this._showPopup()

    return new Promise<SignTransactionResp>((resolve, reject) => {
      this.store.addPendingTransaction(tabId, message, signer, resolve, reject, instructionDetailsList)
    })
  }

  async _showPopup() {
    return this.openPopup().then(() => {
      log("popup opened!")
    })
  }
}
