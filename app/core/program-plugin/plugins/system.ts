import { SystemInstruction, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
import { DecodedInstruction, Markdown } from "../../types"
import { DecoderError } from "../common"
import { PluginContext, ProgramPlugin } from "../types"
import { formatSolAmount } from "../../../popup/utils/format"

const log = createLogger("sol:decoder:sol")

export class SolanaPlugin implements ProgramPlugin {
  decode(instruction: TransactionInstruction): DecodedInstruction {
    log("Decoding solana system program transaction")
    const instructionType = SystemInstruction.decodeInstructionType(instruction)
    switch (instructionType) {
      case "Transfer":
        let params = SystemInstruction.decodeTransfer(instruction)
        log("Decoded Transfer: %s", instructionType)
        return {
          instruction: instruction,
          instructionType: instructionType,
          properties: {
            from: params.fromPubkey.toBase58(),
            to: params.toPubkey.toBase58(),
            amount: params.lamports,
          },
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
          },
        }
    }

    throw new DecoderError(`System instruction of type ${instructionType} is not supported`)
  }

  async decorate(
    decodedInstruction: DecodedInstruction,
    context: PluginContext
  ): Promise<DecodedInstruction> {
    log(`System instruction of type %s is not decorated`, decodedInstruction.instructionType)
    return decodedInstruction
  }

  getMarkdown(decodedInstruction: DecodedInstruction): Markdown {
    let content: string | undefined = undefined
    switch (decodedInstruction.instructionType) {
      case "Transfer":
        const amount = formatSolAmount(decodedInstruction.properties.amount)
        content = `<p>Transfer: <b>${amount}</b> SOL <br/>from: <b><small>${decodedInstruction.properties.from}</small></b><br/>to <b><small>${decodedInstruction.properties.to}</small></b></p>`
        break
      case "Create":
        content = `<p>Create account: <b>${decodedInstruction.properties.newAccount}</b><br/>Creator: <b>${decodedInstruction.properties.from}</b></p>`
        break
    }

    if (content) {
      return content
    }
    throw new Error(
      `Markdown render does not support instruction of type ${decodedInstruction.instructionType}`
    )
  }

  getRicardian(decodedInstruction: DecodedInstruction): Markdown {
    let content: string | undefined = undefined

    switch (decodedInstruction.instructionType) {
      case "Transfer":
        const amount = formatSolAmount(decodedInstruction.properties.amount)
        content = `Transfer of '${amount} SOL' from ${decodedInstruction.properties.from} to ${decodedInstruction.properties.to}`
        break
      case "Create":
        content = `Create new account  ${decodedInstruction.properties.newAccount} (creator ${decodedInstruction.properties.from})</p>`
        break
    }

    if (content) {
      return content
    }
    throw new Error(
      `Ricardian render does not support instruction of type ${decodedInstruction.instructionType}`
    )
  }
}
