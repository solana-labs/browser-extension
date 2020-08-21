import { SystemInstruction, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../utils"
import { InstructionDetails } from "../types"
const log = createLogger("sol:decoder:sol")

export class SolanaDecoder {
  decodeInstruction = async (
    instruction: TransactionInstruction
  ): Promise<InstructionDetails | undefined> => {
    log("Decoding solana system program transaction")
    try {
      const instructionType = SystemInstruction.decodeInstructionType(instruction)
      switch (instructionType) {
        case "Transfer":
          let params = SystemInstruction.decodeTransfer(instruction)
          log("Decoded transaction: %s", instructionType)
          return {
            type: "sol_transfer",
            params: {
              from: params.fromPubkey.toBase58(),
              to: params.toPubkey.toBase58(),
              amount: params.lamports,
            },
          }

        case "Create":
          let crParam = SystemInstruction.decodeCreateAccount(instruction)
          log("Decoded transaction: %s", instructionType)
          return {
            type: "sol_createAccount",
            params: {
              from: crParam.fromPubkey.toBase58(),
              newAccount: crParam.newAccountPubkey.toBase58(),
              lamports: crParam.lamports,
              space: crParam.space,
              programId: crParam.programId.toBase58(),
            },
          }
        default:
          log("Instruction type decoding not supported: %s", instructionType)
      }
    } catch (e) {
      log("Unable to decode instruction type: %O", e)
    }
    return undefined
  }
}
