import { Account } from "@solana/web3.js"
import nacl from "tweetnacl"

const log = require("debug")("sol:wallet")

const bip32 = require("bip32")

export class Wallet {
  public walletIndex: number
  public seed: Buffer
  public accounts: Account[]

  static NewWallet(seed: string, accountCount: number): Wallet {
    const bufSeed = Buffer.from(seed, "hex")
    const wallet = new Wallet(bufSeed)
    for (let itr = 0; itr < accountCount; itr++) {
      wallet.addAccount()
    }
    return wallet
  }

  constructor(seed: Buffer) {
    this.seed = seed
    this.walletIndex = 0 // todo: in the future when we support multiple wallets we will change this
    this.accounts = []
  }

  addAccount() {
    const accountIndex = this.accounts.length
    log("Adding account to wallet with index %s", accountIndex)
    const derivedSeed = bip32
      .fromSeed(this.seed)
      .derivePath(`m/501'/${this.walletIndex}'/0/${accountIndex}`).privateKey
    const newAccount = new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
    this.accounts = [...this.accounts, newAccount]
    return newAccount
  }

  getPublicKeysAsBs58 = (): string[] => {
    return this.accounts.map((a) => a.publicKey.toBase58())
  }
}
