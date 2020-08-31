import { PublicKey, TransactionInstruction } from "@solana/web3.js"
import { createLogger } from "../../utils"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import { Buffer } from "buffer"
import { DecodedInstruction, Markdown, Ricardian } from "../../types"
import { PluginContext, ProgramPlugin } from "../types"
import { DecoderError } from "../common"
import { formatAmount } from "../../../popup/utils/format"

const log = createLogger("sol:decoder:sol")

export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")

export const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, "mint"),
  BufferLayout.blob(32, "owner"),
  BufferLayout.nu64("amount"),
  BufferLayout.blob(48),
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

export class SplPlugin implements ProgramPlugin {
  decode(instruction: TransactionInstruction): DecodedInstruction {
    log("Decoding spl instrustion: %O", instruction)
    const decodedData = SPL_LAYOUT.decode(instruction.data)
    log("Decoded SPL Transaction: %O", decodedData)
    const instructionType = Object.keys(decodedData)[0]
    switch (instructionType) {
      case "transfer":
        if (instruction.keys.length !== 3) {
          throw new DecoderError(
            `Unable to decode SPL transfer, expected 3 keys in instruction, got ${instruction.keys.length}`
          )
        }

        return {
          instruction: instruction,
          instructionType: instructionType,
          properties: {
            amount: decodedData.transfer.amount,
            from: instruction.keys[0].pubkey.toBase58(),
            to: instruction.keys[1].pubkey.toBase58(),
            owner: instruction.keys[2].pubkey.toBase58(),
          },
        }
    }

    throw new DecoderError(`SPL instruction of type ${instructionType} is not supported`)
  }

  async decorate(
    decodedInstruction: DecodedInstruction,
    context: PluginContext
  ): Promise<DecodedInstruction> {
    const { instruction } = decodedInstruction
    const conn = context.getConnection()

    switch (decodedInstruction.instructionType) {
      case "transfer":
        const fromPubKey = instruction.keys[0].pubkey
        const fromAccount = await conn.getAccountInfo(fromPubKey)
        if (!fromAccount) {
          log(
            "Could not retrieve 'from' account %s information for spl transfer",
            fromPubKey.toBase58()
          )
          return decodedInstruction
        }

        const mintPubKey = this._getMintAccount(fromAccount.data)
        // check in local cache for mint information
        let mint = await context.getSPLToken(mintPubKey, context.getConnection())
        if (!mint) {
          throw new Error(`Could not retrieve 'mint' account ${mintPubKey.toBase58()}`)
        }

        decodedInstruction.properties.mint = mint
        return decodedInstruction
    }

    log(`SPL instruction of type %s is not decorated`, decodedInstruction.instructionType)
    return decodedInstruction
  }

  getMarkdown(decodedInstruction: DecodedInstruction): Markdown {
    switch (decodedInstruction.instructionType) {
      case "transfer":
        const mintDecimals = decodedInstruction.properties.mint.decimals
        const amount = formatAmount(decodedInstruction.properties.amount, mintDecimals)
        return {
          type: "markdown",
          content: `<p>Transfer: <b>${amount} ${decodedInstruction.properties.mint.symbol}<b><br/>from: <b><small>${decodedInstruction.properties.from}</small></b><br/> to: <b><small>${decodedInstruction.properties.to}</small></b></p>`,
        }
    }
    throw new Error(
      `Markdown render does not support instruction of type ${decodedInstruction.instructionType}`
    )
  }

  getRicardian(decodedInstruction: DecodedInstruction): Ricardian {
    switch (decodedInstruction.instructionType) {
      case "transfer":
        const mintDecimals = decodedInstruction.properties.mint.decimals
        const amount = formatAmount(decodedInstruction.properties.amount, mintDecimals)

        return {
          type: "ricardian",
          content: `Transfer of '${amount} ${decodedInstruction.properties.mint.symbol}' from ${decodedInstruction.properties.from} to ${decodedInstruction.properties.to}`,
        }
    }

    throw new Error(
      `Ricardian render does not support instruction of type ${decodedInstruction.instructionType} is not supported`
    )
  }

  _getMintAccount(data: Buffer): PublicKey {
    let { mint } = ACCOUNT_LAYOUT.decode(data)
    return new PublicKey(mint)
  }
}
