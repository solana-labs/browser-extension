import { PublicKey, AccountInfo, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import { Buffer } from "buffer"
import { Mint, InstructionDetails, Network } from "../types"
import { Store } from "../../background/store"
import { ProgramDecoderContext } from "./types"

const log = createLogger("sol:decoder:sol")

export const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, "mint"),
  BufferLayout.blob(32, "owner"),
  BufferLayout.nu64("amount"),
  BufferLayout.blob(48),
])

export const MINT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(36),
  BufferLayout.u8("decimals"),
  BufferLayout.blob(3),
])

const SPL_LAYOUT = BufferLayout.union(BufferLayout.u8("instruction"))
SPL_LAYOUT.addVariant(
  0,
  BufferLayout.struct([
    // TODO: does this need to be aligned?
    BufferLayout.nu64("amount"),
    BufferLayout.u8("decimals"),
  ]),
  "initializeMint"
)
SPL_LAYOUT.addVariant(1, BufferLayout.struct([]), "initializeAccount")
SPL_LAYOUT.addVariant(3, BufferLayout.struct([BufferLayout.nu64("amount")]), "transfer")
SPL_LAYOUT.addVariant(7, BufferLayout.struct([BufferLayout.nu64("amount")]), "mintTo")
SPL_LAYOUT.addVariant(8, BufferLayout.struct([BufferLayout.nu64("amount")]), "burn")

export class SplDecoder {
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  decodeInstruction = async (
    instruction: TransactionInstruction,
    { connection }: ProgramDecoderContext
  ): Promise<InstructionDetails | undefined> => {
    log("Decoding spl transaction")
    try {
      const decodedData = SPL_LAYOUT.decode(instruction.data)
      log("Decoded SPL Transaction: %O", decodedData)
      const instructionType = Object.keys(decodedData)[0]
      switch (instructionType) {
        case "transfer":
          if (instruction.keys.length !== 3) {
            log(
              "Unable to decode SPL transfer, expected 3 keys in instruction received: %s",
              instruction.keys.length
            )
            return undefined
          }

          const fromPubKey = instruction.keys[0].pubkey
          const fromAccount = await connection.conn.getAccountInfo(fromPubKey)
          if (!fromAccount) {
            log(
              "Could not retrieve 'from' account %s information for spl transfer",
              fromPubKey.toBase58()
            )
            return {
              type: "spl_transfer",
              params: {
                amount: decodedData.transfer.amount,
                from: fromPubKey.toBase58(),
                to: instruction.keys[1].pubkey.toBase58(),
                owner: instruction.keys[2].pubkey.toBase58(),
                mint: {},
              },
            }
          }
          const mintPubKey = this._getMintAccount(fromAccount.data)

          const mintAccount = await connection.conn.getAccountInfo(mintPubKey)
          if (!mintAccount) {
            log(
              "Could not retrieve 'mint' account %s information for spl transfer",
              mintPubKey.toBase58()
            )
            return {
              type: "spl_transfer",
              params: {
                amount: decodedData.transfer.amount,
                from: fromPubKey.toBase58(),
                to: instruction.keys[1].pubkey.toBase58(),
                owner: instruction.keys[2].pubkey.toBase58(),
                mint: {
                  publicKey: mintPubKey.toBase58(),
                },
              },
            }
          }
          const mint = this._getMint(connection.network, mintPubKey, mintAccount)
          return {
            type: "spl_transfer",
            params: {
              amount: decodedData.transfer.amount,
              from: fromPubKey.toBase58(),
              to: instruction.keys[1].pubkey.toBase58(),
              owner: instruction.keys[2].pubkey.toBase58(),
              mint: mint,
            },
          }
        default:
          log("unhandled spl instruction type: %s", instructionType)
      }
    } catch (e) {
      log("Unable to decode spl instruction: %O", e)
    }
    return undefined
  }

  _getMintAccount(data: Buffer): PublicKey {
    let { mint } = ACCOUNT_LAYOUT.decode(data)
    return new PublicKey(mint)
  }

  _getMint(network: Network, mintPubkey: PublicKey, mintAccount: AccountInfo<Buffer>): Mint {
    log("Retrieving mint %s information on %s", mintPubkey.toBase58(), network.endpoint)
    const mint = this.store.getToken(network, mintPubkey.toBase58())
    if (mint) {
      return mint
    }
    const { decimals } = MINT_LAYOUT.decode(mintAccount.data)
    return {
      publicKey: mintPubkey.toBase58(),
      decimals: decimals,
    }
  }
}
