import { Store } from "./store"
import pump from "pump"
import createLoggerMiddleware from "./lib/createLoggerMiddleware"
import createOriginMiddleware from "./lib/createOriginMiddleware"
import createTabIdMiddleware from "./lib/createTabIdMiddleware"
import { WalletController } from "./wallet-controller"
import { PopupController } from "./popup-controller"
import { nanoid } from "nanoid"
import { JsonRpcEngine } from "json-rpc-engine"
import { createLogger, createObjectMultiplex } from "../core/utils"
import { ENVIRONMENT_TYPE_POPUP, Notification, PopupState, StoredData } from "../core/types"
import { ExtensionManager } from "./lib/extension-manager"

const createEngineStream = require("json-rpc-middleware-stream/engineStream")
const PortStream = require("extension-port-stream")
const RpcEngine = require("json-rpc-engine")
const log = createLogger("sol:ctr")

interface SolanaControllerOpts {
  storedData: StoredData
  persistData: (data: StoredData) => Promise<boolean>
}

interface Connection {
  engine: typeof RpcEngine
  tabId: string
}
export default class SolanaController {
  public store: Store
  // TODO: Figure out the typing for RpcEngine
  private connections: { [origin: string]: { [id: string]: Connection } }
  private walletController: WalletController
  private popupController: PopupController
  private extensionManager: ExtensionManager
  private persistData: (data: StoredData) => Promise<boolean>

  constructor(opts: SolanaControllerOpts) {
    log("Setting up Solana Controller")
    const { storedData, persistData } = opts
    const store = new Store(storedData)
    this.store = store
    this.extensionManager = new ExtensionManager()
    this.walletController = new WalletController({
      store,
      openPopup: this.triggerUi.bind(this),
    })
    this.popupController = new PopupController({
      store,
      notifyAllDomains: this.notifyAllConnections.bind(this),
    })
    this.connections = {}
    this.persistData = persistData
    this.saveStore()
  }

  setPopupOpen() {
    this.store.popIsOpen = true
  }

  setPopupClose() {
    this.store.popIsOpen = false
  }

  setupTrustedCommunication(
    processName: string,
    connectionStream: any,
    sender?: chrome.runtime.MessageSender
  ) {
    // setup multiplexing
    const mux = setupMultiplex(connectionStream, `bg-${processName}-mux`)
    // connect features
    this.setupControllerConnection(processName, mux.createStream("controller"), sender)
    // this.setupProviderConnection(mux.createStream('provider'), sender, true)
  }

  setupUntrustedCommunication(
    connectionStream: typeof PortStream,
    sender?: chrome.runtime.MessageSender
  ) {
    // setup multiplexing
    const mux = setupMultiplex(connectionStream, "bg-cs-mux")
    // connect features
    this.setupProviderConnection(mux.createStream("provider"), sender, false)
  }

  setupControllerConnection(processName: string, outStream: any, sender: any) {
    const origin = processName
    // setup json rpc engine stack
    const engine = new RpcEngine()
    // logging
    engine.push(createLoggerMiddleware({ origin }))
    // engine.push(createTesterMiddleware())
    engine.push(this.popupController.createMiddleware())
    // setup connection
    const providerStream = createEngineStream({ engine })

    let tabId
    if (sender.tab && sender.tab.id) {
      tabId = sender.tab.id
    }

    const connectionId = this.addConnection(origin, tabId, engine)

    pump(outStream, providerStream, outStream, (err) => {
      if (err) {
        log("Controller %s disconnected with error: %O", origin, err)
      } else {
        log("Controller  %s disconnected", origin)
      }
      connectionId && this.removeConnection(origin, connectionId)
      // engine._middleware.forEach((mid : any) => {
      //   if (mid.destroy && typeof mid.destroy === 'function') {
      //     mid.destroy()
      //   }
      // })
    })
  }

  setupProviderConnection(outStream: any, sender: any, isInternal: boolean) {
    const origin = new URL(sender.url).origin
    let extensionId
    if (sender.id !== chrome.runtime.id) {
      extensionId = sender.id
    }
    let tabId
    if (sender.tab && sender.tab.id) {
      tabId = sender.tab.id
    }

    // setup json rpc engine stack
    const engine = new RpcEngine()

    // add logging middleware
    engine.push(createLoggerMiddleware({ origin }))
    // append origin to each request
    engine.push(createOriginMiddleware({ origin, store: this.store }))
    // append tabId to each request if it exists
    if (tabId) {
      engine.push(createTabIdMiddleware({ tabId }))
    }
    engine.push(this.walletController.createMiddleware({ origin, extensionId }))

    // setup connection
    const providerStream = createEngineStream({ engine })
    const connectionId = this.addConnection(origin, tabId, engine)

    pump(outStream, providerStream, outStream, (err) => {
      if (err) {
        log("Provider %s disconnected with error: %O", origin, err)
      } else {
        log("Provider %s disconnected", origin)
      }
      connectionId && this.removeConnection(origin, connectionId)
      //  handle any middleware cleanup
      // engine._middleware.forEach((mid) => {
      //   if (mid.destroy && typeof mid.destroy === 'function') {
      //     mid.destroy()
      //   }
      // })
    })
  }

  addConnection(origin: string, tabId: string, engine: JsonRpcEngine) {
    if (!this.connections[origin]) {
      this.connections[origin] = {}
    }

    const id = nanoid()
    this.connections[origin][id] = {
      engine,
      tabId,
    }
    log("Added a new connection for origin: %s with id: %s", origin, id)
    return id
  }

  removeConnection(origin: string, id: string) {
    const connections = this.connections[origin]
    if (!connections) {
      return
    }

    const conn = connections[id]
    delete connections[id]
    log("Removed connection with id %s for origin: %s", id, origin)

    if (Object.keys(connections).length === 0) {
      log("No more connections left for origin: %s", origin)
      delete this.connections[origin]
    }

    if (conn) {
      log(
        "TabId %s for origin %s disconnected removing pending transaction and request accounts",
        conn.tabId,
        origin
      )
      this.store._removePendingTransaction(conn.tabId)
      this.store._removePendingRequestAccounts(origin, conn.tabId)
    }
  }

  notifyConnections(origin: string, notification: Notification) {
    const connections = this.connections[origin]
    if (!this.store.isUnlocked() || !connections) {
      return
    }
    log("Notifying connections from origin %s: %O", origin, notification)

    Object.keys(connections).forEach((connId) => {
      connections[connId] && connections[connId].engine.emit("notification", notification)
    })
  }

  notifyAllConnections(notification: Notification): Promise<void> {
    const that = this
    return new Promise((resolve, reject) => {
      log("Notifying all connections: %O", notification)
      if (!this.store.isUnlocked()) {
        return
      }

      Object.values(that.connections).forEach((conns) => {
        Object.keys(conns).forEach((connId) => {
          conns[connId] && conns[connId].engine.emit("notification", notification)
        })
      })
    })
  }

  async triggerUi() {
    const notify = () => {
      log("notifying popup")
      this.notifyConnections(ENVIRONMENT_TYPE_POPUP, {
        type: "popupStateChanged",
        data: this.store.getState(),
      })
    }
    await this.extensionManager.showPopup(notify)
    // const tabs = await platform.getActiveTabs()
    // const currentlyActiveMetamaskTab = Boolean(tabs.find((tab) => openSolanaTabsIDs[tab.id]))
    // if (!popupIsOpen && !currentlyActiveMetamaskTab) {
    // }
  }

  saveStore() {
    setInterval(() => {
      this._save()
    }, 2000)
  }

  _save() {
    this.persistData({
      secretBox: this.store.secretBox,
      accountCount: this.store.wallet?.accounts.length,
      selectedNetwork: this.store.selectedNetwork,
      selectedAccount: this.store.selectedAccount,
      authorizedOrigins: this.store.authorizedOrigins,
    } as StoredData)
  }
  monitor() {
    const that = this
    setTimeout(function () {
      log("bg: dumping connections")
      Object.keys(that.connections).forEach((origin) => {
        Object.keys(that.connections[origin]).forEach((connId) => {
          log("connection: %s with id %s", origin, connId)
        })
      })
    }, 5000)
  }
}

/**
 * Sets up stream multiplexing for the given stream
 * @param {any} connectionStream - the stream to mux
 * @returns {stream.Stream} - the multiplexed stream
 */
export function setupMultiplex(connectionStream: typeof PortStream, name: string) {
  const mux = createObjectMultiplex(name)
  pump(connectionStream, mux, connectionStream, (err) => {
    if (err) {
      console.error(err)
    }
  })
  return mux
}
