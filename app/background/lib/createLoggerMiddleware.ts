import { createLogger } from "../../core/utils"

const log = createLogger("sol:rpc")

export default function createLoggerMiddleware(opts: { origin: string }) {
  return function loggerMiddleware(req: any, res: any, next: any) {
    next((/** @type {Function} */ cb: any) => {
      if (res.error) {
        log("Error in RPC response:\n", res)
      }
      if (req.isMetamaskInternal) {
        return
      }
      log("RPC (%s): %O -> %O", opts.origin, req, res)
      cb()
    })
  }
}
