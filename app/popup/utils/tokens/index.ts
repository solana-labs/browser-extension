import {
  Account,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js"
import { initializeAccount, initializeMint, TOKEN_PROGRAM_ID, transfer } from "./instructions"
import { ACCOUNT_LAYOUT, getOwnedAccountsFilters, MINT_LAYOUT } from "./data"
import { OwnedAccount } from "../../types"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import bs58 from "bs58"

type getProgramAccountsResp = {
  pubkey: string
  account: {
    data: any
    executable: boolean
    owner: string
    lamports: number
  }
}

// TODO _rpcRequest... on what?
export const getOwnedTokenAccounts = async (
  connection: any,
  publicKey: PublicKey
): Promise<OwnedAccount<Buffer>[]> => {
  let filters = getOwnedAccountsFilters(publicKey)
  let resp = await connection._rpcRequest("getProgramAccounts", [
    TOKEN_PROGRAM_ID.toBase58(),
    {
      commitment: connection.commitment,
      filters,
    },
  ])
  if (resp.error) {
    throw new Error(
      "failed to get token accounts owned by " + publicKey.toBase58() + ": " + resp.error.message
    )
  }
  const results = resp.result as getProgramAccountsResp[]
  return results
    .map(
      ({ pubkey, account: { data, executable, owner, lamports } }) =>
        ({
          publicKey: new PublicKey(pubkey),
          accountInfo: {
            data: bs58.decode(data),
            executable,
            owner: new PublicKey(owner),
            lamports,
          },
        } as OwnedAccount<Buffer>)
    )
    .filter(({ accountInfo }) => {
      // TODO: remove this check once mainnet is updated
      return filters.every((filter) => {
        if (filter.dataSize) {
          return accountInfo.data.length === filter.dataSize
        } else if (filter.memcmp) {
          let filterBytes = bs58.decode(filter.memcmp.bytes)
          return accountInfo.data
            .slice(filter.memcmp.offset, filter.memcmp.offset + filterBytes.length)
            .equals(filterBytes)
        }
        return false
      })
    })
}

export const createAndInitializeMint = async (
  connection: Connection,
  payer: Account, // Account for paying fees
  mint: Account, // Account to hold token information
  amount: number, // Number of tokens to issue
  decimals: number,
  initialAccount: Account, // Account to hold newly issued tokens, if amount > 0
  mintOwner?: Account // Optional account, allowed to mint tokens
) => {
  let transaction = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mint.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(MINT_LAYOUT.span),
    space: MINT_LAYOUT.span,
    programId: TOKEN_PROGRAM_ID,
  })
  let signers = [payer, mint]
  if (amount) {
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: initialAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(ACCOUNT_LAYOUT.span),
        space: ACCOUNT_LAYOUT.span,
        programId: TOKEN_PROGRAM_ID,
      })
    )
    signers.push(initialAccount)
    transaction.add(initializeAccount(initialAccount.publicKey, mint.publicKey, payer.publicKey))
  }
  transaction.add(
    initializeMint(
      mint.publicKey,
      amount,
      decimals,
      initialAccount?.publicKey,
      mintOwner?.publicKey
    )
  )
  return await connection.sendTransaction(transaction, signers)
}

export const createAndInitializeTokenAccount = async (
  connection: Connection,
  payer: Account,
  mintPublicKey: PublicKey,
  newAccount: Account
): Promise<TransactionSignature> => {
  let transaction = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: newAccount.publicKey,
    lamports: await connection.getMinimumBalanceForRentExemption(ACCOUNT_LAYOUT.span),
    space: ACCOUNT_LAYOUT.span,
    programId: TOKEN_PROGRAM_ID,
  })
  transaction.add(initializeAccount(newAccount.publicKey, mintPublicKey, payer.publicKey))
  let signers = [payer, newAccount]
  return await connection.sendTransaction(transaction, signers)
}

export const transferTokens = async (
  connection: Connection,
  owner: Account,
  sourcePublicKey: PublicKey,
  destinationPublicKey: PublicKey,
  amount: number
) => {
  let transaction = new Transaction().add(
    transfer(sourcePublicKey, destinationPublicKey, amount, owner.publicKey)
  )
  let signers = [owner]
  return await connection.sendTransaction(transaction, signers)
}
