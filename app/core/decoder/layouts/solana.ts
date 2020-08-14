import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemInstruction,
	SystemProgram,
	Transaction,
	TransactionInstruction
} from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { InstructionDetails } from "../types"
import { Web3Connection } from "../../connection"
const log = createLogger("sol:decoder:sol")

export class SolanaDecoder {
  constructor() {
  }

  programId(): PublicKey {
    return SystemProgram.programId
  }

  decodeInstruction = async (_: Web3Connection, instruction: TransactionInstruction): Promise<(InstructionDetails | undefined)> => {
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
              amount: params.lamports
            }
          }
        case "Create":
          let  crParam = SystemInstruction.decodeCreateAccount(instruction)
          log("Decoded transaction: %s", instructionType)
          return {
            type: "sol_createAccount",
            params: {
              from: crParam.fromPubkey.toBase58(),
              newAccount: crParam.newAccountPubkey.toBase58(),
              lamports: crParam.lamports,
              space: crParam.space,
              programId: crParam.programId.toBase58()
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

