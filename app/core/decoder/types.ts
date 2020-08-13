import { PublicKey, Transaction } from "@solana/web3.js"
import { Web3Connection } from "../connection"
import { TransactionDetails } from "../types"

export interface ProgramDecoder {
  programId(): PublicKey

  decodeTransaction(connection: Web3Connection, transactions: Transaction): Promise<(TransactionDetails | undefined)>
}