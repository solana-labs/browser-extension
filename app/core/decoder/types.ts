import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { Web3Connection } from "../connection"
import { InstructionDetails } from "../types"

export type ProgramDecoderContext = {
  connection: Web3Connection
  programId: PublicKey
}

export interface ProgramDecoder {
  decodeInstruction(
    instruction: TransactionInstruction,
    context: ProgramDecoderContext
  ): Promise<InstructionDetails | undefined>
}
