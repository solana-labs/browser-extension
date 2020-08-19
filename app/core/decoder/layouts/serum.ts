import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import { Web3Connection } from "../../connection"
import { InstructionDetails, InstructionDetailsDexNewOrder } from "../../types"
import { DEX_PROGRAM_ID, INSTRUCTION_LAYOUT } from "@project-serum/serum/lib/instructions"

const log = createLogger("sol:decoder:serum-js")

export class SerumDecoder {
  programId(): PublicKey {
    return DEX_PROGRAM_ID
  }

  decodeInstruction = async (
    connection: Web3Connection,
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
