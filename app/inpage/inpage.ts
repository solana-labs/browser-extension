import pump from "pump"
import { createLogger, createObjectMultiplex } from "../core/utils"
import { WallActions, Notification } from "../core/types"
import { EventEmitter } from "events"
import { CONTENT_MESSAGE_STREAM, INPAGE_MESSAGE_STREAM, MUX_PROVIDER_SUBSTREAM } from "../core/types"

const LocalMessageDuplexStream = require("post-message-stream")
const RpcEngine = require("json-rpc-engine")
const createJsonRpcStream = require("json-rpc-middleware-stream")
const { duplex: isDuplex } = require("is-stream")
const log = createLogger("sol:inPage")

export interface RequestArgs {
  method: WallActions
  params?: unknown[] | object
}

class Provider extends EventEmitter {
  private _csStream: any
  private _rpcEngine: any

  constructor(csStream: any) {
    super() // TODO: secure that, do we want to expose all the methods therein?

    this._csStream = csStream

    if (!isDuplex(csStream)) {
      throw new Error("Must provide a Node.js-style duplex stream.")
    }

    // setup connectionStream multiplexing
    const mux = createObjectMultiplex("inpage-cs-mux")
    pump(csStream, mux, csStream, this._handleDisconnect.bind(this, "Solana content"))

    const jsonRpcConnection = createJsonRpcStream()
    pump(
      jsonRpcConnection.stream,
      mux.createStream(MUX_PROVIDER_SUBSTREAM),
      jsonRpcConnection.stream,
      this._handleDisconnect.bind(this, "Solana RpcProvider")
    )

    // handle RPC requests via dapp-side rpc engine
    const rpcEngine = new RpcEngine()
    // rpcEngine.push(createIdRemapMiddleware())
    // rpcEngine.push(createErrorMiddleware())
    rpcEngine.push(jsonRpcConnection.middleware)
    this._rpcEngine = rpcEngine

    // json rpc notification listener
    const that = this;
    jsonRpcConnection.events.on("notification", (resp: Notification) => {
      log("Received notification [%s] : %O", resp.type, resp.data)
      that.emit(resp.type, resp.data)
    })
  }

  request = (args: RequestArgs): Promise<any> => {
    const that = this
    log("provider with method: ", args.method)
    return new Promise<any>(function(resolve, reject) {
      let req = { id: 1, jsonrpc: "2.0", method: args.method }
      if (args.params) {
        req = Object.assign(req, { params: args.params })
      }
      that._rpcEngine.handle(req, function(err: any, response: any) {
        log("rpc engine response: ", response)
        log("rpc engine err: ", err)
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  }

  // Called when connection is lost to critical streams.
  _handleDisconnect = (streamName: any, err: any) => {
    log("Solana Inpage Provider lost connection to %s: %s", streamName, err)
    this.emit("disconnected")
  }
}

// setup background connection./app/background/background.ts
const csStream = new LocalMessageDuplexStream({
  name: INPAGE_MESSAGE_STREAM,
  target: CONTENT_MESSAGE_STREAM,
})

function initProvider() {
  log("initializing provider")
  const provider = new Provider(csStream)
  // @ts-ignore
  window.solana = provider
  log("dispatching window event 'solana#initialized'")
  window.dispatchEvent(new Event("solana#initialized"))
}

; (function() {
  initProvider()
})()
