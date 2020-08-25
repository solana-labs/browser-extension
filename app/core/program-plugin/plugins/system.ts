import { SystemInstruction, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
import { DecodedInstruction, Markdown, Ricardian } from "../../types"
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
    let content: string | undefined = undefined
    switch (decodedInstruction.instructionType) {
      case "Transfer":
        content = `<p>Transfer of '${this._formatAmount(decodedInstruction.properties.amount, 9)} SOL' from **${decodedInstruction.properties.from}** to **${decodedInstruction.properties.to}**</p>`
      case "Create":
        content = `<p>Create new account  **${decodedInstruction.properties.newAccount}** (creator **${decodedInstruction.properties.from}**)</p>`
    }

    if(content) {
      return {
        type: 'markdown',
        content: content
      }
    }
    throw new Error(`Markdown render does not support instruction of type ${decodedInstruction.instructionType}`)
  }

  getRicardian(decodedInstruction: DecodedInstruction): Ricardian {
    let content: string | undefined = undefined

    switch (decodedInstruction.instructionType) {
      case "Transfer":
        content = `Transfer of '${this._formatAmount(decodedInstruction.properties.amount, 9)} SOL' from ${decodedInstruction.properties.from} to ${decodedInstruction.properties.to}`
      case "Create":
        content = `Create new account  ${decodedInstruction.properties.newAccount} (creator ${decodedInstruction.properties.from})</p>`

    }

    if(content) {
      return {
        type: 'ricardian',
        content: content
      }
    }
    throw new Error(`Ricardian render does not support instruction of type ${decodedInstruction.instructionType}`)
  }

  _formatAmount(amount: number, decimal: number): string {
    return `${amount / Math.pow(10, decimal)}`
  }



}
