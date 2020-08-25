import { Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"
import { ProgramPlugin } from "./types"
import { createLogger } from "../utils"
import { SplPlugin } from "./plugins/spl"
import { DecodedInstruction, Markdown, Ricardian, Token } from "../types"
import { Web3Connection } from "../connection"
import { Store } from "../../background/store"
import { SolanaPlugin } from "./plugins/system"

const log = createLogger("sol:decoder")

interface ProgramPluginManagerOpt {
  getConnection: () => Connection
  getSPLMint: (publicKey: PublicKey) => Token | undefined
}

export class ProgramPluginManager {
  private supportedProgramId: Record<string, ProgramPlugin>
  private opts: ProgramPluginManagerOpt

  constructor(opts: ProgramPluginManagerOpt) {
    this.supportedProgramId = {}
    this.opts = opts
    this._setupPlugins()
  }

  decode = async(transaction: Transaction): Promise<(string)[]> => {
    const decodeInstruction = async(
      idx: number,
      instruction: TransactionInstruction
    ): Promise<(Ricardian | Markdown)> => {
      const programId = instruction.programId
      log("Finding decoder for program [%s]", programId)
      const plugin = this._getPlugin(instruction.programId)
      const undecodedInstruction =  `Unknown instruction #${idx + 1} for program ${instruction.programId}`


      if (plugin == null) {
        log("Unable to retrieve decoder for program [%s]", programId)
        return undecodedInstruction
      }

      let decodedInstruction: DecodedInstruction
      log("Decoding transaction instruction for program [%s]", programId)
      try {
        decodedInstruction = plugin.decode(instruction)
      } catch (error) {
        log("An error occurred when decoding instruction for program [%s] %o", programId, error)
        return undecodedInstruction
      }

      log("Decorating transaction instruction for program [%s]", programId)
      try {
        decodedInstruction = await plugin.decorate(decodedInstruction, {
          getConnection: (): Connection => {
            return this.opts.getConnection()
          },
          getSPLMint: (publicKey: PublicKey): Token | undefined => {
            return this.opts.getSPLMint(publicKey)
          }
        })
      } catch (error) {
        log("An error occurred when decorating instruction for program [%s] %o", programId, error)
        return undecodedInstruction
      }


      log("Generating markdown for transaction instruction for program [%s]", programId)
      try {
        return plugin.getMarkdown(decodedInstruction)
      } catch (error) {
        log("An error occurred when generating markdown instruction for program [%s] %o", programId, error)
        return undecodedInstruction
      }
    }

    // Promise.all rejects as soon as one promise rejects, so we must make sure that `decodeInstruction` never fail
    return Promise.all(
      transaction.instructions.map((instruction, index) => decodeInstruction(index, instruction))
    )
  }

  _setupPlugins = (): void => {
    log("registering plugins")
    this._registerProgramPlugin(new PublicKey("TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o"), new SplPlugin())
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
