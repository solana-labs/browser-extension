import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { Web3Connection } from "../connection"
import { InstructionDetails } from "../types"

export interface ProgramDecoder {
  programId(): PublicKey

	decodeInstruction(connection: Web3Connection, instruction: TransactionInstruction): Promise<(InstructionDetails | undefined)>
}
