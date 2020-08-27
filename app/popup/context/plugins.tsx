import React, { useContext, useMemo } from "react"
import { useBackground } from "./background"
import { ProgramPluginManager } from "../../core/program-plugin"
import { useConnection } from "./connection"
import { getSPLToken } from "../../background/solana-controller"
import { createLogger } from "../../core/utils"
import { TokenProvider } from "../../background/store"
import { useTokensProvider } from "./token"

const log = createLogger("ctx:plugins")

interface ProgramPluginsContextType {
  programPluginManager: ProgramPluginManager | undefined
}

const ProgramPluginsContext = React.createContext<ProgramPluginsContextType>(null!)

export function ProgramPluginsManagerProvider(props: React.PropsWithChildren<{}>) {
  const { popupState } = useBackground()
  const { connection } = useConnection()
  const selectedNetwork = popupState?.selectedNetwork
  const tokensProvider = useTokensProvider()

  const programPluginManager = useMemo<ProgramPluginManager | undefined>(() => {
    log(
      "programPluginManager create with selectedNetwork: %O and tokensProvider: %O",
      selectedNetwork,
      tokensProvider
    )
    if (!selectedNetwork || !tokensProvider) {
      return undefined
    }

    return new ProgramPluginManager({
      getConnection: () => {
        return connection
      },
      getNetwork: () => {
        return selectedNetwork
      },
      tokenProvider: tokensProvider,
      getSPLToken: getSPLToken,
    })
  }, [selectedNetwork, tokensProvider])

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
