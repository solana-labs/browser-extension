import { useEffect } from "react"
import { AccountInfo, clusterApiUrl, Connection, PublicKey, TokenAccount } from "@solana/web3.js"
import { refreshCache, setCache, useAsyncData } from "../utils/fetch-loop"
import { useConnection } from "../context/connection"
import { Wallet } from "../models/wallet"
import { TOKEN_PROGRAM_ID } from "../utils/tokens/instructions"
import { parseMintData, parseTokenAccountData } from "../utils/tokens/data"
import { BalanceInfo } from "../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { tuple } from "immutable-tuple"
import { useBackground } from "../context/background"

const log = require("debug")("sol:hooks")
const bip32 = require("bip32")

export const useSolanaExplorerUrlSuffix = (): string => {
  const { popupState } = useBackground()
  if (popupState?.selectedNetwork.endpoint === clusterApiUrl("devnet")) {
    return "?cluster=devnet"
  } else if (popupState?.selectedNetwork.endpoint === clusterApiUrl("testnet")) {
    return "?cluster=testnet"
  }
  return ""
}

export const useAccountInfo = (publicKey: PublicKey | null): [AccountInfo | null, boolean] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, publicKey?.toBase58())
  log("useAccountInfo cache key: %s for account: %s", cacheKey, publicKey?.toBase58())
  const [accountInfo, loaded] = useAsyncData<AccountInfo | null>(
    async () => (publicKey ? connection.getAccountInfo(publicKey) : null),
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

export const useAllBalanceInfosForAccount = (publicKey: PublicKey): BalanceInfo[] => {
  const mainBalanceInfo = useBalanceInfo(publicKey)
  const otherBalanceInfo = useTokenAccountsByOwner(publicKey)

  let out: BalanceInfo[] = []
  if (mainBalanceInfo) {
    out = [mainBalanceInfo]
  }

  if (otherBalanceInfo.length > 0) {
    out = [...out, ...otherBalanceInfo]
  }

  return out
}

export const useTokenAccountsByOwner = (publicKey: PublicKey): BalanceInfo[] => {
  const { connection } = useConnection()
  const cacheKey = tuple(connection, publicKey.toBase58(), "tokenAccountsByOwner")
  log("useTokenAccountsByOwner cache key: %s for account: %s", cacheKey, publicKey?.toBase58())

  const [fetchedAccounts, loaded] = useAsyncData<
    Array<{ pubkey: PublicKey; account: TokenAccount }>
  >(async () => {
    const resp = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    })
    return resp.value
  }, cacheKey)

  if (!loaded) {
    return []
  }
  return fetchedAccounts.map((el) => {
    return {
      publicKey: el.pubkey,
      amount: BigInt(el.account.data.amount),
      decimals: 0,
      mint: el.account.data.mint,
      owner: el.account.data.owner,
      initialized: true,
      lamports: BigInt(el.account.lamports ?? 0),
    } as BalanceInfo
  })
}

export const useWalletPublicKeys = (wallet: Wallet): [PublicKey[], boolean] => {
  const [tokenPublicKeys, loaded] = useAsyncData<PublicKey[]>(
    wallet.getTokenPublicKeys,
    wallet.getTokenPublicKeys
  )

  let publicKeys = [wallet.account.publicKey, ...(tokenPublicKeys ?? [])]
  return [publicKeys, loaded]
}

export const useBalanceInfo = (publicKey: PublicKey): BalanceInfo | null => {
  const [accountInfo, accountInfoLoaded] = useAccountInfo(publicKey)
  const { mint, owner, amount } = accountInfo?.owner.equals(TOKEN_PROGRAM_ID)
    ? parseTokenAccountData(accountInfo.data)
    : { mint: null, owner: null, amount: BigInt(0) }
  const [mintInfo, mintInfoLoaded] = useAccountInfo(mint)

  if (accountInfoLoaded && mint && mintInfo && mintInfoLoaded && owner) {
    let { decimals } = parseMintData(mintInfo.data)
    return {
      publicKey: publicKey,
      amount,
      decimals,
      mint,
      owner,
      initialized: true,
      lamports: BigInt(accountInfo?.lamports ?? 0),
    }
  } else if (accountInfoLoaded && !mint) {
    return {
      publicKey: publicKey,
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
  accountInfo: AccountInfo
) {
  const cacheKey = tuple(connection, publicKey.toBase58())
  setCache(cacheKey, accountInfo, { initializeOnly: true })
}

export const refreshWalletPublicKeys = (wallet: Wallet) => {
  refreshCache(wallet.getTokenPublicKeys)
}
