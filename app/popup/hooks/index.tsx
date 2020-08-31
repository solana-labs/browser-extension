import { useEffect } from "react"
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js"
import { refreshCache, setCache, useAsyncData } from "../utils/fetch-loop"
import { useConnection } from "../context/connection"
import { OwnedAccount } from "../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { tuple } from "immutable-tuple"
import { useBackground } from "../context/background"
import { Buffer } from "buffer"
import { TOKEN_PROGRAM_ID } from "../../core/program-plugin/plugins/spl"
import { MintInfo, Token } from "@solana/spl-token"

const log = require("debug")("sol:hooks")

export const useSolanaExplorerUrlSuffix = (): string => {
  const { popupState } = useBackground()
  if (popupState?.selectedNetwork.cluster === "devnet") {
    return "?cluster=devnet"
  } else if (popupState?.selectedNetwork.cluster === "testnet") {
    return "?cluster=testnet"
  }
  return ""
}

export const refreshAccountsPublicKeys = (publicKey: PublicKey) => {
  // refreshCache(wallet.getTokenPublicKeys)
}

export const useAllAccountsForPublicKey = (
  publicKey: PublicKey
): [OwnedAccount<Buffer> | undefined, boolean] => {
  const [externalAccountInfo, externalAccountInfoLoaded] = useAccountInfo(publicKey)

  let out: OwnedAccount<Buffer>[] = []
  if (externalAccountInfoLoaded && externalAccountInfo) {
    return [
      {
        publicKey: publicKey,
        accountInfo: externalAccountInfo,
      } as OwnedAccount<Buffer>,
      true,
    ]
  } else if (externalAccountInfoLoaded && !externalAccountInfo) {
    // lets create a place holder account
    return [
      {
        publicKey: publicKey,
        accountInfo: {
          executable: false,
          owner: publicKey,
          lamports: 0,
        },
      } as OwnedAccount<Buffer>,
      false,
    ]
  }
  return [undefined, false]
}

export const useAccountInfo = (
  publicKey: PublicKey | null
): [AccountInfo<Buffer> | null, boolean] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, "accountInfo", publicKey?.toBase58())

  const [accountInfo, loaded] = useAsyncData<AccountInfo<Buffer> | null>(
    async () => {
      if (!publicKey) {
        return null
      }
      log("getting account info: %s", publicKey?.toBase58())
      try {
        const resp = connection.getAccountInfo(publicKey)
        log("received account information by owner %s: %O", publicKey.toBase58(), resp)
        return resp
      } catch (e) {
        log("error retrieving accounts information %s: %s", publicKey.toBase58(), e)
        return null
      }
    },
    { key: cacheKey, description: `accountInfo:${publicKey?.toBase58()}` }
  )

  useEffect(() => {
    if (!publicKey) {
      return () => {}
    }
    const id = connection.onAccountChange(publicKey, () => refreshCache(cacheKey))
    return () => connection.removeAccountChangeListener(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, publicKey?.toBase58(), cacheKey])

  return [accountInfo, loaded]
}

export const useTokenAccountsByOwner = (
  publicKey: PublicKey
): [OwnedAccount<Buffer>[], boolean] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, "ownedAccount", publicKey.toBase58())

  const [fetchedAccounts, loaded] = useAsyncData<
    Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }>
  >(
    () => {
      log("getting get token account by owner %s", publicKey.toBase58())
      return connection
        .getTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        })
        .then((data) => {
          log("received tokens by owner %s %O", publicKey.toBase58(), data.value)
          return data.value
        })
      // .catch((err) => {
      //   log("error retrieving accounts by owner for main key %s: %s", publicKey.toBase58(), err)
      //
      //   return []
      // })
    },
    { key: cacheKey, description: `ownedAccount:${publicKey.toBase58()}` }
  )

  if (!loaded) {
    return [[], false]
  }
  return [
    fetchedAccounts.map((a) => {
      return {
        publicKey: a.pubkey,
        accountInfo: a.account,
      } as OwnedAccount<Buffer>
    }),
    true,
  ]
}

export function refreshAccountInfo(
  connection: Connection,
  publicKey: PublicKey,
  clearCache = false
) {
  const cacheKey = tuple(connection, publicKey.toBase58())
  refreshCache(cacheKey, clearCache)
}

export function setInitialAccountInfo(
  connection: Connection,
  publicKey: PublicKey,
  accountInfo: AccountInfo<Buffer>
) {
  const cacheKey = tuple(connection, publicKey.toBase58())
  setCache(cacheKey, accountInfo, { initializeOnly: true })
}
