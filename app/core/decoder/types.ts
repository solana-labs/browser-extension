import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { Web3Connection } from "../connection"
import { InstructionDetails } from "../types"

export type ProgramDecoderContext = {
  connection: Web3Connection
  programId: PublicKey
}

export interface ProgramDecoder {
  // Decode the given instruction into its details elements. If the decoder is unable to decode the
  // given instruction either due to a malformed message or to an unexpected error when querying some
  // state, it should throw an `Error`.
  decodeInstruction(
    instruction: TransactionInstruction,
    context: ProgramDecoderContext
  ): Promise<InstructionDetails>
}
