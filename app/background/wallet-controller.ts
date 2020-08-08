import { Store } from "./store"
import { createLogger } from "../core/utils"
import { RequestAccountsResp, SignTransactionResp, WallActions } from "../core/types"

const log = createLogger("sol:walletCtr")
const createAsyncMiddleware = require("json-rpc-engine/src/createAsyncMiddleware")

interface WalletControllerOpt {
  store: Store
  openPopup: () => Promise<void>
}

interface MiddlewareOpts {
  origin: string
  extensionId: string
}

export class WalletController {
  private store: Store
  private openPopup: any

  constructor(opts: WalletControllerOpt) {
    log("wallet controller constructor")
    this.store = opts.store
    this.openPopup = opts.openPopup
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
          res.result = this.store.selectedNetwork.endpoint
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
