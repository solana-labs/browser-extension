import { AccountInfo, PublicKey } from "@solana/web3.js"

export type BalanceInfo = {
  amount: bigint
  decimals: number
  mint?: PublicKey
  owner: PublicKey
  tokenName?: string
  tokenSymbol?: string
  initialized: boolean
  lamports: bigint
}

export type OwnedAccount<T> = {
  publicKey: PublicKey
  accountInfo: AccountInfo<T>
}

export type MnemonicAndSeed = {
  mnemonic: string
  seed: string
}
