import { PublicKey } from "@solana/web3.js"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"

export const TOKEN_PROGRAM_ID = new PublicKey("TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o")

export const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, "mint"),
  BufferLayout.blob(32, "owner"),
  BufferLayout.nu64("amount"),
  BufferLayout.blob(48)
])

export const MINT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(36),
  BufferLayout.u8("decimals"),
  BufferLayout.blob(3)
])

export const parseTokenAccountData = (
  data: Buffer
): { mint: PublicKey; owner: PublicKey; amount: bigint } => {
  let { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data)
  return {
    mint: new PublicKey(mint),
    owner: new PublicKey(owner),
    amount: BigInt(amount)
  }
}

export const parseMintData = (data: Buffer): { decimals: number } => {
  let { decimals } = MINT_LAYOUT.decode(data)
  return { decimals }
}
