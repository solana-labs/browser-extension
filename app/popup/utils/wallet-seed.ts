import { pbkdf2 } from "crypto"
import { randomBytes, secretbox } from "tweetnacl"
import { EventEmitter } from "events"
import { MnemonicAndSeed } from "../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import bs58 from "bs58"

export const generateMnemonicAndSeed = async (): Promise<MnemonicAndSeed> => {
  const bip39 = await import("bip39")
  const mnemonic = bip39.generateMnemonic(128)
  const seed = await bip39.mnemonicToSeed(mnemonic)
  return { mnemonic, seed: new Buffer(seed).toString("hex") }
}

export const mnemonicToSeed = async (mnemonic: string): Promise<string> => {
  const bip39 = await import("bip39")
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid seed words")
  }
  const seed = await bip39.mnemonicToSeed(mnemonic)
  return new Buffer(seed).toString("hex")
}

let unlockedMnemonicAndSeed: MnemonicAndSeed | undefined =
  JSON.parse(sessionStorage.getItem("unlocked") || localStorage.getItem("unlocked") || "null") ||
  undefined

export const walletSeedChanged = new EventEmitter()

export const getUnlockedMnemonicAndSeed = (): MnemonicAndSeed | undefined => {
  return unlockedMnemonicAndSeed
}

export const hasLockedMnemonicAndSeed = (): boolean => {
  return !!localStorage.getItem("locked")
}

export const setUnlockedMnemonicAndSeed = (mnemonic: string, seed: string): void => {
  unlockedMnemonicAndSeed = { mnemonic, seed }
  walletSeedChanged.emit("change", unlockedMnemonicAndSeed)
}

export const storeMnemonicAndSeed = async (
  mnemonic: string,
  seed: string,
  password: string
): Promise<void> => {
  const plaintext = JSON.stringify({ mnemonic, seed })
  if (password) {
    const salt = new Buffer(randomBytes(16))
    const kdf = "pbkdf2"
    const iterations = 100000
    const digest = "sha256"
    const key = await deriveEncryptionKey(password, salt, iterations, digest)
    const nonce = randomBytes(secretbox.nonceLength)
    const encrypted = secretbox(Buffer.from(plaintext), nonce, key)
    localStorage.setItem(
      "locked",
      JSON.stringify({
        encrypted: bs58.encode(encrypted),
        nonce: bs58.encode(nonce),
        kdf,
        salt: bs58.encode(salt),
        iterations,
        digest,
      })
    )
    localStorage.removeItem("unlocked")
    sessionStorage.removeItem("unlocked")
  } else {
    localStorage.setItem("unlocked", plaintext)
    localStorage.removeItem("locked")
    sessionStorage.removeItem("unlocked")
  }
  setUnlockedMnemonicAndSeed(mnemonic, seed)
}

export const loadMnemonicAndSeed = async (password: string, stayLoggedIn: boolean) => {
  const lockedData = localStorage.getItem("locked")
  if (!lockedData) {
    return
  }

  const {
    encrypted: encodedEncrypted,
    nonce: encodedNonce,
    salt: encodedSalt,
    iterations,
    digest,
  } = JSON.parse(lockedData)
  const encrypted = bs58.decode(encodedEncrypted)
  const nonce = bs58.decode(encodedNonce)
  const salt = bs58.decode(encodedSalt)
  const key = await deriveEncryptionKey(password, salt, iterations, digest)
  const plaintext = secretbox.open(encrypted, nonce, key)
  if (!plaintext) {
    throw new Error("Incorrect password")
  }
  const decodedPlaintext = new Buffer(plaintext).toString()
  const { mnemonic, seed } = JSON.parse(decodedPlaintext)
  if (stayLoggedIn) {
    sessionStorage.setItem("unlocked", decodedPlaintext)
  }
  setUnlockedMnemonicAndSeed(mnemonic, seed)
  return { mnemonic, seed }
}

const deriveEncryptionKey = async (
  password: any,
  salt: any,
  iterations: number,
  digest: any
): Promise<any> => {
  return new Promise((resolve, reject) =>
    pbkdf2(password, salt, iterations, secretbox.keyLength, digest, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  )
}

export const lockWallet = () => {
  setUnlockedMnemonicAndSeed("", "")
}
