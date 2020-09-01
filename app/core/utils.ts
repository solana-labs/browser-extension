import { ENVIRONMENT_TYPE_NOTIFICATION, ENVIRONMENT_TYPE_POPUP, Token } from "./types"
import { CompiledInstruction, Connection, Message, PublicKey } from "@solana/web3.js"
import * as shortvec from "./shortvec-encoding"
import bs58 from "bs58"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import { Buffer } from "buffer"
import { MintInfo, Token as SPLToken } from "@solana/spl-token"
import { TOKEN_PROGRAM_ID } from "./program-plugin/plugins/spl"

const debug = require("debug")
const ObjectMultiplex = require("obj-multiplex")
export const createLogger = (module: string): any => {
  return debug(module)
}
const log = createLogger("sol:util")

export const createObjectMultiplex = (name: string): any => {
  return new ObjectMultiplex(name)
  // return (new ObjectMultiplex())
}

export const isInternalProcess = (processName: string): boolean => {
  return processName === ENVIRONMENT_TYPE_POPUP || processName === ENVIRONMENT_TYPE_NOTIFICATION
}

export const checkForError = () => {
  const lastError = chrome.runtime.lastError
  if (!lastError) {
    return
  }
  // if it quacks like an Error, its an Error
  if (lastError.message) {
    return lastError
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message)
}

const PUBKEY_LENGTH = 32

export const decodeSerializedMessage = (buffer: Buffer): Message => {
  log("Decoding serialized message: %O", buffer)
  let byteArray = [...buffer]

  const numRequiredSignatures = byteArray.shift() as number
  const numReadonlySignedAccounts = byteArray.shift() as number
  const numReadonlyUnsignedAccounts = byteArray.shift() as number

  const accountCount = shortvec.decodeLength(byteArray)
  let accountKeys = []
  for (let i = 0; i < accountCount; i++) {
    const account = byteArray.slice(0, PUBKEY_LENGTH)
    byteArray = byteArray.slice(PUBKEY_LENGTH)
    accountKeys.push(bs58.encode(Buffer.from(account)))
  }

  const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH)
  byteArray = byteArray.slice(PUBKEY_LENGTH)

  const instructionCount = shortvec.decodeLength(byteArray)
  let instructions = []
  for (let i = 0; i < instructionCount; i++) {
    let instruction = {} as CompiledInstruction
    instruction.programIdIndex = byteArray.shift() as number
    const accountCount = shortvec.decodeLength(byteArray)
    instruction.accounts = byteArray.slice(0, accountCount)
    byteArray = byteArray.slice(accountCount)
    const dataLength = shortvec.decodeLength(byteArray)
    const data = byteArray.slice(0, dataLength)
    instruction.data = bs58.encode(Buffer.from(data))
    byteArray = byteArray.slice(dataLength)
    instructions.push(instruction)
  }

  const messageArgs = {
    header: {
      numRequiredSignatures,
      numReadonlySignedAccounts,
      numReadonlyUnsignedAccounts,
    },
    recentBlockhash: bs58.encode(Buffer.from(recentBlockhash)),
    accountKeys,
    instructions,
  }
  return new Message(messageArgs)
}

export const getMintInfo = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<MintInfo> => {
  const splToken = new SPLToken(connection, publicKey, TOKEN_PROGRAM_ID, {
    displayName: "string",
    id: "string",
    rpDisplayName: "string",
  })

  try {
    return await splToken.getMintInfo()
  } catch (e) {
    throw new Error(`could not get mint account info: ${e}`)
  }
}

export const getSPLToken = async (
  publicKey: PublicKey,
  connection: Connection,
  getToken: (address: string) => Token | undefined
): Promise<Token | undefined> => {
  log("Retrieving SPL token at mint address %s", publicKey.toBase58())
  const token = getToken(publicKey.toBase58())
  if (token) {
    return token
  }

  log("SPL token at mint address %s not in cache... retrieving mint data", publicKey.toBase58())
  try {
    const mintInfo = await getMintInfo(connection, publicKey)
    return {
      mintAddress: publicKey.toBase58(),
      name: "",
      symbol: "",
      decimals: mintInfo.decimals,
    }
  } catch (e) {
    log("Could not retrieve 'mint' account %s information: %s", publicKey.toBase58(), e)
    return undefined
  }
}
