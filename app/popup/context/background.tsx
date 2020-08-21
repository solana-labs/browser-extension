import React, { createContext, useContext, useEffect, useState } from "react"
import pump from "pump"
import { createObjectMultiplex, getEnvironmentType } from "../../core/utils"
import { Network, Notification, PopupActions, PopupState } from "../../core/types"
import RpcEngine from "json-rpc-engine"
import { MUX_CONTROLLER_SUBSTREAM } from "../../core/types"

const PortStream = require("extension-port-stream")
const createJsonRpcStream = require("json-rpc-middleware-stream")
const log = require("debug")("sol:bgContext")

interface RPCResp<T> {
  id: number
  jsonrpc: string
  result: T
}

interface BackgroundContextType {
  popupState: PopupState | undefined
  request: (method: PopupActions, params: any) => Promise<RPCResp<PopupState>>
  changeNetwork: (network: Network) => void
  changeAccount: (account: string) => void
}

export const BackgroundContext = createContext<BackgroundContextType | null>(null)

export function BackgroundProvider(props: React.PropsWithChildren<{}>) {
  let [engine, setEngine] = useState<any>()
  const [state, setState] = useState<PopupState>()

  const setupStreams = () => {
    const windowType = getEnvironmentType()
    log("Window type detected: %s", windowType)
    const bgPort = chrome.runtime.connect({ name: "popup" })
    const bgStream = new PortStream(bgPort)
    const popupMux = createObjectMultiplex("popup-ext-mux")
    // not sure why we do this
    popupMux.setMaxListeners(25)

    pump(bgStream, popupMux, bgStream, (err) => {
      log("Background stream <> mux disconnected: %s", err)
    })

    const jsonRpcConnection = createJsonRpcStream()
    pump(
      jsonRpcConnection.stream,
      popupMux.createStream(MUX_CONTROLLER_SUBSTREAM),
      jsonRpcConnection.stream,
      (err) => {
        log("JsonRPC stream <> controller sub-stream disconnected: %s", err)
      }
    )

    // @ts-ignore FIXME: Type definition in json-rpc-engine is incorrect, RpcEngine is not exported
    const rpcEngine = new RpcEngine()
    rpcEngine.push(jsonRpcConnection.middleware)
    // json rpc notification listener
    jsonRpcConnection.events.on("notification", (resp: Notification) => {
      switch (resp.type) {
        case "popupStateChanged":
          log("Received state change notification: %O", resp.data)
          setState(resp.data)
          return
        default:
          log("Received unhandled notification [%s] : %O", resp.type, resp.data)
      }
    })
    setEngine(rpcEngine)
    engine = rpcEngine
    getBackgroundState()
  }

  const getBackgroundState = () => {
    log("retrieving popup state from background")
    request("popup_getState", {}).catch((err) => {
      log("error received popup state from background: %O", err)
    })
  }

  useEffect(() => {
    setupStreams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const request: BackgroundContextType["request"] = (method: PopupActions, params: any) => {
    return new Promise<RPCResp<PopupState>>(function (resolve, reject) {
      let request = { id: 1, jsonrpc: "2.0", method: method }
      if (params) {
        request = Object.assign(request, { params: params })
      }
      log("performing rpc request: %O", request)
      engine.handle(request, function (err: any, response: any) {
        if (err) {
          reject(err)
        } else {
          const res = response as RPCResp<PopupState>
          log("received new popup state from background: %O", res)
          setState(res.result)
          resolve(res)
        }
      })
    })
  }

  const changeNetwork: BackgroundContextType["changeNetwork"] = (network: Network) => {
    log("Changing network from: %s to %s", state?.selectedNetwork.cluster, network.cluster)
    request("popup_changeNetwork", { cluster: network.cluster })
      .then((state) => {
        log("Changed network to: %s", state.result.selectedNetwork.cluster)
      })
      .catch((err) => {
        log(
          "Unable to switch network from: %s to %s : ",
          state?.selectedNetwork.cluster,
          network,
          err
        )
      })
  }

  const changeAccount: BackgroundContextType["changeAccount"] = (account: string) => {
    log("Changing account from: %s to %s", state?.selectedAccount, account)
    request("popup_changeAccount", { account: account })
      .then((state) => {
        log("Changed account to: %s", state.result.selectedAccount)
      })
      .catch((err) => {
        log("Unable to switch account from: %s to %s : ", state?.selectedAccount, account, err)
      })
  }

  return (
    <BackgroundContext.Provider
      value={{
        request,
        popupState: state,
        changeNetwork,
        changeAccount,
      }}
    >
      {props.children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (!context) {
    throw new Error("Background not found, useWeb3 must be used within the Web3Provider")
  }
  return context
}
