import { SystemInstruction, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
import { DecodedInstruction, Markdown } from "../../types"
import { DecoderError } from "../common"
import { PluginContext, ProgramPlugin } from "../types"
const log = createLogger("sol:decoder:sol")

export class SolanaPlugin implements ProgramPlugin {

  decode(instruction: TransactionInstruction): DecodedInstruction {
    log("Decoding solana system program transaction")
    const instructionType = SystemInstruction.decodeInstructionType(instruction)
    switch (instructionType) {
      case "Transfer":
        let params = SystemInstruction.decodeTransfer(instruction)
        return {
          instruction: instruction,
          instructionType: instructionType,
          properties: {
            from: params.fromPubkey.toBase58(),
            to: params.toPubkey.toBase58(),
            amount: params.lamports,
          }
        }
      case "Create":
        let crParam = SystemInstruction.decodeCreateAccount(instruction)
        log("Decoded transaction: %s", instructionType)
        return {
          instruction: instruction,
          instructionType: instructionType,
          properties: {
            from: crParam.fromPubkey.toBase58(),
            newAccount: crParam.newAccountPubkey.toBase58(),
            lamports: crParam.lamports,
            space: crParam.space,
            programId: crParam.programId.toBase58(),
          }
        }
    }

    throw new DecoderError(`System instruction of type ${instructionType} is not supported`)
  }

  async decorate(decodedInstruction: DecodedInstruction, context: PluginContext): Promise<DecodedInstruction> {
    log(`System instruction of type %s is not decorated`, decodedInstruction.instructionType)
    return decodedInstruction
  }

  getMarkdown(decodedInstruction: DecodedInstruction): Markdown {
    switch (decodedInstruction.instructionType) {
      case "Transfer":
        return `<p>Transfer of '${this._formatAmount(decodedInstruction.properties.amount, 9)} SOL' from **${decodedInstruction.properties.from}** to **${decodedInstruction.properties.to}**</p>`
      case "Create":
        return `<p>Create new account  **${decodedInstruction.properties.newAccount}** (creator **${decodedInstruction.properties.from}**)</p>`
    }
    throw new Error(`Markdown render does not support instruction of type ${decodedInstruction.instructionType}`)
  }

  getRicardian(decodedInstruction: DecodedInstruction): string {
    switch (decodedInstruction.instructionType) {
      case "Transfer":
        return `Transfer of '${this._formatAmount(decodedInstruction.properties.amount, 9)} SOL' from ${decodedInstruction.properties.from} to ${decodedInstruction.properties.to}`
      case "Create":
        return `Create new account  ${decodedInstruction.properties.newAccount} (creator ${decodedInstruction.properties.from})</p>`

    }
    throw new Error(`Ricardian render does not support instruction of type ${decodedInstruction.instructionType}`)
  }

  _formatAmount(amount: number, decimal: number): string {
    return `${amount / Math.pow(10, decimal)}`
  }



}
