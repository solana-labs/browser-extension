import { PublicKey, Transaction } from "@solana/web3.js"


export const SPL_TOKEN_PROGRAM_ID = new PublicKey(
  'TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o',
);

export const WRAPPED_SOL_MINT = new PublicKey(
  'So11111111111111111111111111111111111111111',
);

export interface TransactionDetails {
  title: string
  description: string
  details: {[key: string]: any}
}

export interface ProgramDecoder {
  programId(): PublicKey
  decodeTransaction(transactions: Transaction): (TransactionDetails | undefined)
}