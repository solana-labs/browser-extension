import { PublicKey, Transaction } from "@solana/web3.js"
import { ProgramDecoder } from "./types"
import { SolanaDecoder } from "./layouts/solana"
import { createLogger } from "../utils"
import { SplDecoder } from "./layouts/spl"
import { Web3Connection } from "../connection"
import { TransactionDetails } from "../types"

const log = createLogger("sol:decoder")
const supportedProgramId = new Map<string, ProgramDecoder>()



export class Decoder {
  private supportedProgramId: Map<string, ProgramDecoder>
  private connection: Web3Connection

  constructor(connection: Web3Connection) {
    this.supportedProgramId = new Map<string, ProgramDecoder>()
    this.connection = connection
    this._setupDecoders()
  }

  decode = async (transaction: Transaction): Promise<(TransactionDetails | undefined)> => {
    if (transaction.instructions.length == 0) {
      log("Unable to decode transaction without any instructions")
      return undefined
    }

    if (transaction.instructions.length != 1) {
      log("Unable to decode transaction who instruction count is greater not 1: %s", transaction.instructions.length)
      return undefined
    }
    const instruction = transaction.instructions[0]
    const programId = instruction.programId
    log("Finding decoder for programId: %s", programId.toBase58())
    const decoder = this._getDecoder(instruction.programId)

    if (decoder == undefined) {
      log("Unable to retrieve decoder for programId: %s", programId.toBase58())
      return undefined
    }

    log("Decoding transaction for programId : %s", programId.toBase58())
    return decoder.decodeTransaction(this.connection, transaction)
  }

  _setupDecoders = (): void => {
    log("setting up known decoders")
    this._registerProgramId(new SolanaDecoder())
    this._registerProgramId(new SplDecoder())
  }

  _registerProgramId = (decoder: ProgramDecoder): void => {
    this.supportedProgramId.set(decoder.programId().toBase58(), decoder)
  }

  _getDecoder = (programId: PublicKey): (ProgramDecoder | undefined) => {
    return this.supportedProgramId.get(programId.toBase58())
  }

}

