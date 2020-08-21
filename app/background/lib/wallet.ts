import { Account } from "@solana/web3.js"
import nacl from "tweetnacl"

const log = require("debug")("sol:wallet")

const bip32 = require("bip32")

export class Wallet {
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
    this.accounts = []
  }

  addAccount() {
    const accountIndex = this.accounts.length
    log("Adding account to wallet with index %s", accountIndex)
		// Ref. We align on BIP44 like Ledger's most recent Live products now do
		// https://medium.com/myetherwallet/hd-wallets-and-derivation-paths-explained-865a643c7bf2
		// >> https://github.com/MyCryptoHQ/MyCrypto/issues/2070#issue-341249164
    const derivedSeed = bip32
      .fromSeed(this.seed)
			.derivePath(`m/44'/501'/${accountIndex}'/0/0'`)
			.privateKey
    const newAccount = new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
    this.accounts = [...this.accounts, newAccount]
    return newAccount
  }

  findAccount(pubKey: string): (Account | undefined) {
    let account = undefined
    this.accounts.forEach(acc => {
      if(acc.publicKey.toBase58() === pubKey) {
        account =  acc
      }
    })
    return account
  }

  getPublicKeysAsBs58 = (): string[] => {
    return this.accounts.map((a) => a.publicKey.toBase58())
  }
}
