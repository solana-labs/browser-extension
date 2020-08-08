export default function createTabIdMiddleware(opts: { tabId: number }) {
  return function tabIdMiddleware(req: any, _: any, next: any) {
    req.tabId = opts.tabId
    next()
  }
}
