import React, { useContext, useMemo } from "react"
import { useBackground } from "./background"
import { createLogger } from "../../core/utils"
import { TokenProvider } from "../../background/store"

const log = createLogger("ctx:plugins")

interface TokenProviderContextType {
  tokenProvider: TokenProvider | undefined
}

const TokenProviderContext = React.createContext<TokenProviderContextType>(null!)

export function TokensProviderProvider(props: React.PropsWithChildren<{}>) {
  const { popupState } = useBackground()
  const tokensProvider = popupState?.tokensProvider

  const tokenProvider = useMemo<TokenProvider | undefined>(() => {
    log("tokenProvider create with tokensProvider: %O", tokensProvider)
    if (!tokensProvider) {
      return undefined
    }

    return new TokenProvider(tokensProvider.tokens) //this is a patch because token provider is not json rpc serializabl
  }, [tokensProvider])

  return (
    <TokenProviderContext.Provider value={{ tokenProvider }}>
      {props.children}
    </TokenProviderContext.Provider>
  )
}

export const useTokensProvider = (): TokenProvider | undefined => {
  const context = useContext(TokenProviderContext)
  if (!context) {
    throw new Error(
      "Token not found, useProgramPlugins must be used within the <TokensProviderProvider>..</TokensProviderProvider>"
    )
  }

  return context.tokenProvider
}
