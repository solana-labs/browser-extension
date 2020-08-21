import { PublicKey, Transaction, TransactionInstruction, SystemProgram } from "@solana/web3.js"
import { ProgramDecoder } from "./types"
import { SolanaDecoder } from "./system"
import { createLogger } from "../utils"
import { SplDecoder } from "./spl"
import { Web3Connection } from "../connection"
import { InstructionDetails } from "../types"
import { Store } from "../../background/store"
import { SerumDecoder } from "./serum"
import { DEX_PROGRAM_ID } from "@project-serum/serum/lib/instructions"

const log = createLogger("sol:decoder")

export class Decoder {
  private supportedProgramId: Record<string, ProgramDecoder>
  private connection: Web3Connection
  private store: Store

  constructor(connection: Web3Connection, store: Store) {
    this.supportedProgramId = {}
    this.connection = connection
    this.store = store
    this._setupDecoders()
  }

  decode = async (transaction: Transaction): Promise<(InstructionDetails | undefined)[]> => {
    const decodeInstruction = (
      instruction: TransactionInstruction
    ): Promise<InstructionDetails | undefined> => {
      return new Promise<InstructionDetails | undefined>((resolve, reject) => {
        const programId = instruction.programId
        log("Finding decoder for programId: %s", programId.toBase58())
        const decoder = this._getDecoder(instruction.programId)

        if (decoder == null) {
          //TODO: Maybe add support to skip unknown instructions and put a placeholder type instead
          log("Unable to retrieve decoder for programId: %s", programId.toBase58())
          resolve(undefined)
          return
        }

        log("Decoding transaction for programId : %s", programId.toBase58())
        decoder
          .decodeInstruction(instruction, { connection: this.connection, programId })
          .then((decodedInstruction) => {
            resolve(decodedInstruction)
          })
      })
    }

    return Promise.all(
      transaction.instructions.map((instruction) => decodeInstruction(instruction))
    )
  }

  _setupDecoders = (): void => {
    log("setting up known decoders")
    this._registerProgramId(SystemProgram.programId, new SolanaDecoder())
    this._registerProgramId(
      "TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o",
      new SplDecoder(this.store)
    )
    this._registerProgramId(DEX_PROGRAM_ID, new SerumDecoder())
  }

  _registerProgramId = (programId: PublicKey | string, decoder: ProgramDecoder): void => {
    let key: string
    if (typeof programId === "string") {
      key = programId
    } else {
      key = programId.toBase58()
    }

    this.supportedProgramId[key] = decoder
  }

  _getDecoder = (programId: PublicKey): ProgramDecoder | undefined => {
    return this.supportedProgramId[programId.toBase58()]
  }
}
