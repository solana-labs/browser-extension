import { LAMPORTS_PER_SOL, PublicKey, SystemInstruction, SystemProgram, Transaction } from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { TransactionDetails } from "../types"
import { Web3Connection } from "../../connection"
const log = createLogger("sol:decoder:sol")

export class SolanaDecoder {
  constructor() {
  }

  programId(): PublicKey {
    return SystemProgram.programId
  }

  decodeTransaction = async (_: Web3Connection, transaction: Transaction): Promise<(TransactionDetails | undefined)> => {
    log("Decoding solana system program transaction")
    const instruction = transaction.instructions[0]
    try {
      const instructionType = SystemInstruction.decodeInstructionType(instruction)
      switch (instructionType) {
        case "Transfer":
          const params = SystemInstruction.decodeTransfer(instruction)
          log("Decoded transaction: %s", instructionType)
          return {
            type: "sol_transfer",
            params: {
              from: params.fromPubkey.toBase58(),
              to: params.toPubkey.toBase58(),
              amount: params.lamports
            }
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

