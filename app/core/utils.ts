import {
  ENVIRONMENT_TYPE_BACKGROUND,
  ENVIRONMENT_TYPE_NOTIFICATION,
  ENVIRONMENT_TYPE_POPUP, Token
} from "./types"
import { memoize } from "lodash"
import { CompiledInstruction, Connection, Message, PublicKey } from "@solana/web3.js"
import * as shortvec from "./shortvec-encoding"
import bs58 from "bs58"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
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
  return processName === ENVIRONMENT_TYPE_POPUP || processName === ENVIRONMENT_TYPE_POPUP
}
// `popup` refers to the extension opened through the browser app icon (in top right corner in chrome)
// `notification` refers to the popup that appears in its own window when taking action outside of solana
export const getEnvironmentType = (url = window.location.href) => getEnvironmentTypeMemo(url)

const getEnvironmentTypeMemo = memoize((url) => {
  const parsedUrl = new URL(url)
  if (parsedUrl.pathname === "/popup.html") {
    return ENVIRONMENT_TYPE_POPUP
  } else if (parsedUrl.pathname === "/notification.html") {
    return ENVIRONMENT_TYPE_NOTIFICATION
  } else {
    return ENVIRONMENT_TYPE_BACKGROUND
  }
})

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


// TODO not sure where to put this
const MINT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(36),
  BufferLayout.u8("decimals"),
  BufferLayout.blob(3),
])

export const getMintData = async(connection: Connection, publicKey: PublicKey): Promise<{ decimals: number, mintAddress: string }> => {
  const mintAccount = await connection.getAccountInfo(publicKey)
  if (!mintAccount) {
    throw new Error(`could not get mint account info`)
  }
  const { decimals } = MINT_LAYOUT.decode(mintAccount.data)
  return {
    mintAddress: publicKey.toBase58(),
    decimals: decimals,
  }
}