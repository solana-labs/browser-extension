import { PublicKey, TransactionInstruction } from "@solana/web3.js"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"

export const TOKEN_PROGRAM_ID = new PublicKey("TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o")

const LAYOUT = BufferLayout.union(BufferLayout.u8("instruction"))
LAYOUT.addVariant(
  0,
  BufferLayout.struct([
    // TODO: does this need to be aligned?
    BufferLayout.nu64("amount"),
    BufferLayout.u8("decimals"),
  ]),
  "initializeMint"
)
LAYOUT.addVariant(1, BufferLayout.struct([]), "initializeAccount")
LAYOUT.addVariant(3, BufferLayout.struct([BufferLayout.nu64("amount")]), "transfer")
LAYOUT.addVariant(7, BufferLayout.struct([BufferLayout.nu64("amount")]), "mintTo")
LAYOUT.addVariant(8, BufferLayout.struct([BufferLayout.nu64("amount")]), "burn")

const instructionMaxSpan = Math.max(...Object.values(LAYOUT.registry).map((r: any) => r.span))

const encodeTokenInstructionData = (instruction: any) => {
  let b = Buffer.alloc(instructionMaxSpan)
  let span = LAYOUT.encode(instruction, b)
  return b.slice(0, span)
}

export const initializeMint = (
  mint: PublicKey,
  amount: number,
  decimals: number,
  initialAccount: PublicKey,
  mintOwner?: PublicKey
) => {
  let keys = [{ pubkey: mint, isSigner: false, isWritable: true }]
  if (amount) {
    keys.push({ pubkey: initialAccount, isSigner: false, isWritable: true })
  }
  if (mintOwner) {
    keys.push({ pubkey: mintOwner, isSigner: false, isWritable: false })
  }
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      initializeMint: {
        amount,
        decimals,
      },
    }),
    programId: TOKEN_PROGRAM_ID,
  })
}

export const initializeAccount = (account: PublicKey, mint: PublicKey, owner: PublicKey) => {
  let keys = [
    { pubkey: account, isSigner: false, isWritable: true },
    { pubkey: mint, isSigner: false, isWritable: false },
    { pubkey: owner, isSigner: false, isWritable: false },
  ]
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      initializeAccount: {},
    }),
    programId: TOKEN_PROGRAM_ID,
  })
}

export const transfer = (
  source: PublicKey,
  destination: PublicKey,
  amount: number,
  owner: PublicKey
) => {
  let keys = [
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: true, isWritable: false },
  ]
  return new TransactionInstruction({
    keys,
    data: encodeTokenInstructionData({
      transfer: { amount },
    }),
    programId: TOKEN_PROGRAM_ID,
  })
}
