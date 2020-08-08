import { Account, Connection, PublicKey, TransactionSignature } from "@solana/web3.js"
import nacl from "tweetnacl"
import { setInitialAccountInfo } from "../hooks"
import { ACCOUNT_LAYOUT } from "../utils/tokens/data"
import {
  createAndInitializeTokenAccount,
  getOwnedTokenAccounts,
  transferTokens,
} from "../utils/tokens"

const bip32 = require("bip32")

export class Wallet {
  public connection: Connection
  public walletIndex: number
  public seed: Buffer
  public account: Account

  constructor(connection: Connection, seed: Buffer, walletIndex = 0) {
    this.connection = connection
    this.seed = seed
    this.walletIndex = walletIndex
    this.account = Wallet.getAccountFromSeed(this.seed, this.walletIndex)
  }

  static getAccountFromSeed(seed: Buffer, walletIndex: number, accountIndex = 0): Account {
    const derivedSeed = bip32.fromSeed(seed).derivePath(`m/501'/${walletIndex}'/0/${accountIndex}`)
      .privateKey
    // TODO: not sure here
    return new Account(nacl.sign.keyPair.fromSeed(derivedSeed as Uint8Array).secretKey)
  }

  get publicKey(): PublicKey {
    return this.account.publicKey
  }

  getTokenPublicKeys = async (): Promise<PublicKey[]> => {
    let accounts = await getOwnedTokenAccounts(this.connection, this.account.publicKey)
    return accounts.map(({ publicKey, accountInfo }) => {
      setInitialAccountInfo(this.connection, publicKey, accountInfo)
      return publicKey
    })
  }

  createTokenAccount = async (tokenAddress: PublicKey): Promise<TransactionSignature> => {
    return await createAndInitializeTokenAccount(
      this.connection,
      this.account,
      tokenAddress,
      new Account()
    )
  }

  tokenAccountCost = async () => {
    return this.connection.getMinimumBalanceForRentExemption(ACCOUNT_LAYOUT.span)
  }

  transferToken = async (source: PublicKey, destination: PublicKey, amount: number) => {
    return await transferTokens(this.connection, this.account, source, destination, amount)
  }
}
