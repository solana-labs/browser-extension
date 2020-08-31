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
    // We align on BIP44 like the Ledger support in Solana
    // All path components are hardened (i.e with ')
    // https://github.com/solana-labs/ledger-app-solana/blob/c66543976aa8171be6ea0c0771b1e9447a857c40/examples/example-sign.js#L57-L83v
    //
    // m/44'/501'/${accountIndex}'/0'
    //
    // m / purpose' / coin_type' / account'    / change / address_index
    // m / 44'      / 501'       / [VARIABLE]' / 0'      / [ABSENT]
    const derivedSeed = bip32.fromSeed(this.seed).derivePath(`m/44'/501'/${accountIndex}'/0'`)
      .privateKey
    const newAccount = new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey)
    this.accounts = [...this.accounts, newAccount]
    return newAccount
  }

  findAccount(pubKey: string): Account | undefined {
    let account = undefined
    this.accounts.forEach((acc) => {
      if (acc.publicKey.toBase58() === pubKey) {
        account = acc
      }
    })
    return account
  }

  getPublicKeysAsBs58 = (): string[] => {
    return this.accounts.map((a) => a.publicKey.toBase58())
  }
}
