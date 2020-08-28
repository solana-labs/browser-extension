import React, { useContext, useMemo } from "react"
import { useBackground } from "./background"
import { ProgramPluginManager } from "../../core/program-plugin"
import { useConnection } from "./connection"
import { createLogger, getSPLToken } from "../../core/utils"
import { Connection, PublicKey } from "@solana/web3.js"
import { Token } from "../../core/types"

const log = createLogger("ctx:plugins")

interface ProgramPluginsContextType {
  programPluginManager: ProgramPluginManager | undefined
}

const ProgramPluginsContext = React.createContext<ProgramPluginsContextType>(null!)

export function ProgramPluginsManagerProvider(props: React.PropsWithChildren<{}>) {
  const { getToken } = useBackground()
  const { connection } = useConnection()

  const resolveSPLToken = (
    publicKey: PublicKey,
    connection: Connection
  ): Promise<Token | undefined> => {
    log("resolving spl token with getToken: %O", getToken)
    return getSPLToken(publicKey, connection, getToken)
  }

  const programPluginManager = useMemo<ProgramPluginManager | undefined>(() => {
    log("programPluginManager created")
    return new ProgramPluginManager({
      getConnection: () => {
        return connection
      },
      getSPLToken: resolveSPLToken,
    })
  }, [getToken])

  return (
    <ProgramPluginsContext.Provider value={{ programPluginManager }}>
      {props.children}
    </ProgramPluginsContext.Provider>
  )
}

export const useProgramPluginManager = (): ProgramPluginManager | undefined => {
  const context = useContext(ProgramPluginsContext)
  if (!context) {
    throw new Error(
      "Program plugins manager not found, useProgramPlugins must be used within the <ProgramPluginsManagerProvider>..</ProgramPluginsManagerProvider>"
    )
  }

  return context.programPluginManager
}
