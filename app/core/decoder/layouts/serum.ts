import {
	PublicKey,
	SystemProgram,
	SystemInstructionType,
	Transaction,
	SYSTEM_INSTRUCTION_LAYOUTS, SystemInstruction, LAMPORTS_PER_SOL, AccountInfo, TransactionInstruction
} from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import * as Layout from './common';
import { Web3Connection } from "../../connection"
import { Buffer } from "buffer"
import { TokenCache } from "./token"
import { Mint, InstructionDetails } from "../../types"
import { DEX_PROGRAM_ID, INSTRUCTION_LAYOUT } from "./serum-js/instructions"

const log = createLogger("sol:decoder:serum-js")

export class SplDecoder {
	private tokenCache: TokenCache

	constructor() {
		this.tokenCache = new TokenCache()
	}

	programId(): PublicKey {
		return DEX_PROGRAM_ID
	}

	decodeInstruction = async (connection: Web3Connection, instruction: TransactionInstruction): Promise<(InstructionDetails | undefined)> => {
		const foo = INSTRUCTION_LAYOUT.decode(instruction.data)
		log("Decoding spl transaction: %O", foo)
		return undefined
	}

}

