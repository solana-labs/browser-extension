import { AccountInfo, PublicKey } from "@solana/web3.js"

export type BalanceInfo = {
  publicKey: PublicKey
  amount: bigint
  decimals: number
  mint?: PublicKey
  owner: PublicKey
  tokenName?: string
  tokenSymbol?: string
  initialized: boolean
  lamports: bigint
}

export type OwnedAccount = {
  publicKey: PublicKey
  accountInfo: AccountInfo
}

export type MnemonicAndSeed = {
  mnemonic: string
  seed: string
}
