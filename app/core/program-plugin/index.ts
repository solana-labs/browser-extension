import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import { ProgramPlugin } from "./types"
import { createLogger } from "../utils"
import { SplPlugin, TOKEN_PROGRAM_ID } from "./plugins/spl"
import { DecodedInstruction, Markdown, Token } from "../types"
import { SolanaPlugin } from "./plugins/system"
import base58 from "bs58"

const log = createLogger("sol:decoder")

interface ProgramPluginManagerOpt {
  getConnection: () => Connection
  getSPLToken: (publicKey: PublicKey, connection: Connection) => Promise<Token | undefined>
}

export class ProgramPluginManager {
  private supportedProgramId: Record<string, ProgramPlugin>
  private opts: ProgramPluginManagerOpt

  constructor(opts: ProgramPluginManagerOpt) {
    this.supportedProgramId = {}
    this.opts = opts
    this._setupPlugins()
  }

  renderTransactionItemMarkdown = async (transaction: Transaction): Promise<Markdown[]> => {
    const re = (idx: number, instruction: TransactionInstruction): Markdown => {
      const data = base58.encode(instruction.data)
      return `<p>Failed to decode instruction<br/>Program id: <b><small>${instruction.programId}</small></b><br/>data: <b>${data}</b></p>`
    }

    const rd = (idx: number, instruction: TransactionInstruction): Markdown => {
      const data = base58.encode(instruction.data)
      return `<p>Program id: <b>${instruction.programId}</b><br/>data: <b>${data}</b></p>`
    }

    const ri = (plugin: ProgramPlugin, decodedInstruction: DecodedInstruction): Markdown => {
      return plugin.getMarkdown(decodedInstruction)
    }

    return this.render(transaction, rd, ri, re)
  }

  renderRicardian = async (transaction: Transaction): Promise<Markdown[]> => {
    const re = (idx: number, instruction: TransactionInstruction): Markdown => {
      const data = base58.encode(instruction.data)
      return `Failed to decode: Program id: ${instruction.programId} data: ${data}`
    }
    const rd = (idx: number, instruction: TransactionInstruction): Markdown => {
      const data = base58.encode(instruction.data)
      return `Program id: ${instruction.programId} data: ${data}`
    }

    const ri = (plugin: ProgramPlugin, decodedInstruction: DecodedInstruction): Markdown => {
      return plugin.getRicardian(decodedInstruction)
    }

    return this.render(transaction, rd, ri, re)
  }

  render = async (
    transaction: Transaction,
    renderUndecodedInsutrction: (idx: number, instruction: TransactionInstruction) => Markdown,
    renderInstruction: (plugin: ProgramPlugin, decodedInstruction: DecodedInstruction) => Markdown,
    renderError: (idx: number, instruction: TransactionInstruction) => Markdown
  ): Promise<Markdown[]> => {
    const decodeInstructionFunc = async (
      idx: number,
      instruction: TransactionInstruction
    ): Promise<Markdown> => {
      const programId = instruction.programId
      log("Finding decoder for program [%s]", programId)
      const plugin = this._getPlugin(instruction.programId)

      if (plugin == null) {
        log("Unable to retrieve decoder for program [%s]", programId)
        return renderUndecodedInsutrction(idx, instruction)
      }

      let decodedInstruction: DecodedInstruction
      log("Decoding transaction instruction for program [%s]", programId)
      try {
        decodedInstruction = plugin.decode(instruction)
      } catch (error) {
        log(
          "An error occurred when decoding instruction for program [%s] %o",
          programId.toBase58(),
          error
        )
        return renderError(idx, instruction)
      }

      log("Decorating transaction instruction for program [%s]", programId)
      try {
        decodedInstruction = await plugin.decorate(decodedInstruction, {
          getConnection: this.opts.getConnection,
          getSPLToken: this.opts.getSPLToken,
        })
      } catch (error) {
        log("An error occurred when decorating instruction for program [%s] %o", programId, error)
        return renderError(idx, instruction)
      }

      try {
        return renderInstruction(plugin, decodedInstruction)
      } catch (error) {
        log("An error occurred when renderin instruction: %o", error)
        return renderError(idx, instruction)
      }
    }

    // Promise.all rejects as soon as one promise rejects, so we must make sure that `decodeInstruction` never fail
    return Promise.all(
      transaction.instructions.map((instruction, index) =>
        decodeInstructionFunc(index, instruction)
      )
    )
  }

  _setupPlugins = (): void => {
    this._registerProgramPlugin(TOKEN_PROGRAM_ID, new SplPlugin())
    this._registerProgramPlugin(SystemProgram.programId, new SolanaPlugin())
    // this._registerProgramPlugin(DEX_PROGRAM_ID, new SerumDecoder())
  }

  _registerProgramPlugin = (programId: PublicKey, plugin: ProgramPlugin): void => {
    this.supportedProgramId[programId.toBase58()] = plugin
  }

  _getPlugin = (programId: PublicKey): ProgramPlugin | undefined => {
    return this.supportedProgramId[programId.toBase58()]
  }
}
