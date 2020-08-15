import { createLogger } from "../../core/utils"
import { Store } from "../store"

const log = createLogger("sol:middleware:origin")

export default function createOriginMiddleware(opts: { origin: string; store: Store }) {
  return function originMiddleware(req: any, res: any, next: any) {
    const { origin, store } = opts

    log("adding origin %s to request", origin)
    req.origin = origin

    if (origin.startsWith("chrome-extension://")) {
      //todo: should check for full ext url
      next()
      return
    }

    if (store.isOriginAuthorized(origin)) {
      log("origin already authorize")
      next()
      return
    }

    if (
      req.method === "wallet_requestAccounts" ||
      req.method === "wallet_getCluster" ||
      req.method === "wallet_getState"
    ) {
      log("letting through: ", req.method)
      next()
      return
    }

    log("authorized origin require to request: " + req.method)
    res.err = "authorized origin require to request: " + req.method
    return
  }
}
