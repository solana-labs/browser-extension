import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { Web3Connection } from "../../connection"
import { InstructionDetails } from "../../types"
import { INSTRUCTION_LAYOUT } from "./serum-js/instructions"

const log = createLogger("sol:decoder:serum-js")

export class SerumDecoder {

  constructor() {
  }

  programId(): PublicKey {
    return new PublicKey("6CZL4vVQqVzms4ZQEFtH91nMiPEph2szTHaRMjyrDyWM")
  }

  decodeInstruction = async (connection: Web3Connection, instruction: TransactionInstruction): Promise<(InstructionDetails | undefined)> => {
    const foo = INSTRUCTION_LAYOUT.decode(instruction.data)
    log("Decoding spl transaction: %O", foo)
    return undefined
  }

}

