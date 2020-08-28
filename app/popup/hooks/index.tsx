import { useEffect } from "react"
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js"
import { refreshCache, setCache, useAsyncData } from "../utils/fetch-loop"
import { useConnection } from "../context/connection"
import { BalanceInfo, OwnedAccount } from "../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { tuple } from "immutable-tuple"
import { useBackground } from "../context/background"
import { Buffer } from "buffer"
import { parseMintData, parseTokenAccountData, TOKEN_PROGRAM_ID } from "../utils/account-data"

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

export const useAllAccountsForPublicKey = (publicKey: PublicKey): OwnedAccount<Buffer>[] => {
  const [externalAccountInfo, externalAccountInfoLoaded] = useAccountInfo(publicKey)
  const storagedAcountInfo = useTokenAccountsByOwner(publicKey)

  let out: OwnedAccount<Buffer>[] = []
  if (externalAccountInfoLoaded && externalAccountInfo) {
    out = [
      {
        publicKey: publicKey,
        accountInfo: externalAccountInfo
      } as OwnedAccount<Buffer>
    ]
  } else if (externalAccountInfoLoaded && !externalAccountInfo) {
    // lets create a place holder account
    out = [
      {
        publicKey: publicKey,
        accountInfo: {
          executable: false,
          owner: publicKey,
          lamports: 0
        }
      } as OwnedAccount<Buffer>
    ]
  }

  if (storagedAcountInfo.length > 0) {
    out = [...out, ...storagedAcountInfo]
  }

  return out
}

export const useBalanceInfo = (
  publicKey: PublicKey,
  accountInfo: AccountInfo<Buffer> | null
): BalanceInfo | null => {
  const { mint, owner, amount } =
    accountInfo && TOKEN_PROGRAM_ID.equals(accountInfo.owner)
      ? parseTokenAccountData(accountInfo.data)
      : { mint: null, owner: null, amount: BigInt(0) }

  const [mintInfo, mintInfoLoaded] = useAccountInfo(mint)
  let { name, symbol } = useTokenName(mint)

  if (accountInfo && mint && mintInfo && mintInfoLoaded && owner) {
    let { decimals } = parseMintData(mintInfo.data)
    return {
      amount,
      decimals,
      mint,
      owner,
      tokenName: name,
      tokenSymbol: symbol,
      initialized: true,
      lamports: BigInt(accountInfo.lamports ?? 0)
    }
  } else if (accountInfo && !mint) {
    return {
      amount: BigInt(accountInfo.lamports ?? 0),
      decimals: 9,
      mint: undefined,
      owner: publicKey,
      tokenName: "",
      tokenSymbol: "SOL",
      initialized: false,
      lamports: BigInt(accountInfo.lamports ?? 0)
    }
  } else {
    return null
  }
}

export const useAccountInfo = (
  publicKey: PublicKey | null
): [AccountInfo<Buffer> | null, boolean] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, "accountInfo", publicKey?.toBase58())

  const [accountInfo, loaded] = useAsyncData<AccountInfo<Buffer> | null>(async () => {
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
  }, { key: cacheKey, description: `accountInfo:${publicKey?.toBase58()}` })

  useEffect(() => {
    if (!publicKey) {
      return () => {
      }
    }
    const id = connection.onAccountChange(publicKey, () => refreshCache(cacheKey))
    return () => connection.removeAccountChangeListener(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, publicKey?.toBase58(), cacheKey])

  return [accountInfo, loaded]
}

export const useTokenAccountsByOwner = (publicKey: PublicKey): OwnedAccount<Buffer>[] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, "ownedAccount", publicKey.toBase58())


  const [fetchedAccounts, loaded] = useAsyncData<Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }>>(() => {
    log("getting get token account by owner %s", publicKey.toBase58())
    return connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID
    }).then(data => {
      log("received tokens by owner %s %O", publicKey.toBase58(), data.value)
      return data.value
    }).catch(err => {
      log("error retrieving accounts by owner for main key %s: %s", publicKey.toBase58(), err)
      return []
    })
  }, { key: cacheKey, description: `ownedAccount:${publicKey.toBase58()}` })

  if (!loaded) {
    log("could not load token by owner %s", publicKey.toBase58())
    return []
  }
  return fetchedAccounts.map((a) => {
    return {
      publicKey: a.pubkey,
      accountInfo: a.account
    } as OwnedAccount<Buffer>
  })
}

export const useTokenName = (
  mintPubKey: PublicKey | null
): { name: string | undefined; symbol: string | undefined } => {
  const { getToken } = useBackground()

  if (!mintPubKey) {
    return { name: undefined, symbol: undefined }
  }

  let match = getToken(mintPubKey.toBase58())
  if (match) {
    return { name: match.name, symbol: match.symbol }
  }
  return { name: undefined, symbol: undefined }
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
