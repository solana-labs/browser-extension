import { useEffect } from "react"
import { AccountInfo, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js"
import { refreshCache, setCache, useAsyncData } from "../utils/fetch-loop"
import { useConnection } from "../context/connection"
import { Wallet } from "../models/wallet"
import { TOKEN_PROGRAM_ID } from "../utils/tokens/instructions"
import { parseMintData, parseTokenAccountData } from "../utils/tokens/data"
import { BalanceInfo, OwnedAccount } from "../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { tuple } from "immutable-tuple"
import { useBackground } from "../context/background"
import { Buffer } from "buffer"

const log = require("debug")("sol:hooks")
const bip32 = require("bip32")

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

export const useAllAccountsForPublicKey = (publicKey: PublicKey): OwnedAccount<Buffer>[] => {
  const [externalAccountInfo, externalAccountInfoLoaded] = useAccountInfo(publicKey)
  const storagedAcountInfo = useTokenAccountsByOwner(publicKey)

  let out: OwnedAccount<Buffer>[] = []
  if (externalAccountInfoLoaded && externalAccountInfo) {
    out = [{
      publicKey: publicKey,
      accountInfo: externalAccountInfo
    } as OwnedAccount<Buffer>]
  }

  if (storagedAcountInfo.length > 0) {
    out = [...out, ...storagedAcountInfo]
  }

  return out
}

export const useBalanceInfo = (publicKey: PublicKey, accountInfo: AccountInfo<Buffer>): BalanceInfo | null => {
  const { mint, owner, amount } = accountInfo?.owner.equals(TOKEN_PROGRAM_ID)
    ? parseTokenAccountData(accountInfo.data)
    : { mint: null, owner: null, amount: BigInt(0) }
  const [mintInfo, mintInfoLoaded] = useAccountInfo(mint)

  if (accountInfo && mint && mintInfo && mintInfoLoaded && owner) {
    let { decimals } = parseMintData(mintInfo.data)
    return {
      amount,
      decimals,
      mint,
      owner,
      initialized: true,
      lamports: BigInt(accountInfo?.lamports ?? 0),
    }
  } else if (accountInfo && !mint) {
    return {
      amount: BigInt(accountInfo?.lamports ?? 0),
      decimals: 9,
      mint: undefined,
      owner: publicKey,
      tokenName: "",
      tokenSymbol: "SOL",
      initialized: false,
      lamports: BigInt(accountInfo?.lamports ?? 0),
    }
  } else {
    return null
  }
}

export const useAccountInfo = (publicKey: PublicKey | null): [AccountInfo<Buffer> | null, boolean] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, publicKey?.toBase58())

  const [accountInfo, loaded] = useAsyncData<AccountInfo<Buffer> | null>(
    async () => {
      log("getting account info: %s", publicKey?.toBase58())
      if (!publicKey) {
        return null
      }
      try {
        const resp =connection.getAccountInfo(publicKey)
        log("received account information by owner %s: %O",publicKey.toBase58(), resp)
        return resp
      }catch (e) {
        log("error retrieving accounts information %s: %s", publicKey.toBase58(), e)
        return null
      }
    },
    cacheKey
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

export const useTokenAccountsByOwner = (publicKey: PublicKey): OwnedAccount<Buffer>[] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, publicKey.toBase58(), "tokenAccountsByOwner")
  const [fetchedAccounts, loaded] = useAsyncData<
    Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }>
  >(async () => {
    log("getting get token account by owner %s",publicKey.toBase58() )
    try {
      const resp = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      })
      log("received tokens by owner %s %O",publicKey.toBase58(), resp.value)
      return resp.value
    }catch (e) {
      log("error retrieving accounts by owner for main key %s: %s", publicKey.toBase58(), e)
      return []
    }
  },cacheKey)

  if (!loaded) {
    log("could not load token by owner %s", publicKey.toBase58())
    return []
  }
  return fetchedAccounts.map( a =>{
    return {
      publicKey: a.pubkey,
      accountInfo: a.account
    } as OwnedAccount<Buffer>
  })
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

