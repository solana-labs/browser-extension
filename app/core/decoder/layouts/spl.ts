import {
  PublicKey,
  SystemProgram,
  SystemInstructionType,
  Transaction,
  SYSTEM_INSTRUCTION_LAYOUTS, SystemInstruction, LAMPORTS_PER_SOL
} from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import * as Layout from './common';
import { SPL_TOKEN_PROGRAM_ID, TransactionDetails } from "../types"
const log = createLogger("sol:decoder:sol")


const LAYOUT = BufferLayout.union(BufferLayout.u8('instruction'));
LAYOUT.addVariant(
  0,
  BufferLayout.struct([
    // TODO: does this need to be aligned?
    BufferLayout.nu64('amount'),
    BufferLayout.u8('decimals'),
  ]),
  'initializeMint',
);
LAYOUT.addVariant(1, BufferLayout.struct([]), 'initializeAccount');
LAYOUT.addVariant(
  3,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'transfer',
);
LAYOUT.addVariant(
  7,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'mintTo',
);
LAYOUT.addVariant(
  8,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'burn',
);



export class SplDecoder {
  constructor() {
  }

  programId(): PublicKey {
    return SPL_TOKEN_PROGRAM_ID
  }

  decodeTransaction = (transaction: Transaction): (TransactionDetails | undefined) => {
    log("Decoding solana system program transaction")
    const instruction = transaction.instructions[0]
    try {
      const resp = LAYOUT.decode(instruction.data)
      log("Decoded SPL Transaction: %O", resp)
    }catch (e) {
      log("Unable to decode spl instruction: %O", e)
    }
    return undefined
  }


}

