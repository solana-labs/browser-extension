import { TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { InstructionDetails } from "../types"
import { INSTRUCTION_LAYOUT } from "@project-serum/serum/lib/instructions"

const log = createLogger("sol:decoder:serum")

export class SerumDecoder {
  decodeInstruction = async (
    instruction: TransactionInstruction
  ): Promise<InstructionDetails | undefined> => {
    try {
      console.log("decoding instruction: %O", instruction)
      const foo = INSTRUCTION_LAYOUT.decode(instruction.data)

      log("Decoding serum transaction: %O", foo)
      // const resp: InstructionDetailsDexNewOrder = {}
      // resp.params.
    } catch (e) {
      log("ERROR: failed to decode instruction: %O", e)
      return undefined
    }
  }
}
