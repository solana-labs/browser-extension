import React, { useContext, useMemo } from "react"
import { Connection } from "@solana/web3.js"
import { useBackground } from "./background"

const log = require("debug")("sol:connContext")
const tuple = require("immutable-tuple")

interface ConnectionContextType {
  connection: Connection
}

const ConnectionContext = React.createContext<ConnectionContextType>(null!)

export function ConnectionProvider(props: React.PropsWithChildren<{}>) {
  const { request, popupState } = useBackground()
  const connection = useMemo<Connection>(
    () => new Connection(popupState?.selectedNetwork.endpoint || "", "single"),
    [popupState?.selectedNetwork.endpoint]
  )

  return (
    <ConnectionContext.Provider value={{ connection }}>{props.children}</ConnectionContext.Provider>
  )
}

export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext)
  if (!context) {
    throw new Error(
      "Connection not found, useConnection must be used within the <ConnectionProvider>..</ConnectionProvider>"
    )
  }
  return context
}
