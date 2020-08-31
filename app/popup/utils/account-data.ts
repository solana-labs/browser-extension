import { Connection, PublicKey } from "@solana/web3.js"
import { Token as SPLToken } from "@solana/spl-token"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import BufferLayout from "buffer-layout"
import { BalanceInfo, OwnedAccount } from "../types"
import { TOKEN_PROGRAM_ID } from "../../core/program-plugin/plugins/spl"
import { Buffer } from "buffer"
import { Token } from "../../core/types"

export const ACCOUNT_LAYOUT = BufferLayout.struct([
  BufferLayout.blob(32, "mint"),
  BufferLayout.blob(32, "owner"),
  BufferLayout.nu64("amount"),
  BufferLayout.blob(48),
])

export const parseTokenAccountData = (
  data: Buffer
): { mintPublicKey: PublicKey; owner: PublicKey; amount: bigint } => {
  let { mint, owner, amount } = ACCOUNT_LAYOUT.decode(data)
  return {
    mintPublicKey: new PublicKey(mint),
    owner: new PublicKey(owner),
    amount: BigInt(amount),
  }
}

export const isSPLAccount = (ownedAccount: OwnedAccount<Buffer>): boolean => {
  if (TOKEN_PROGRAM_ID.equals(ownedAccount.accountInfo.owner)) {
    return true
  } else {
    return false
  }
}

export const getBalanceInfo = async (
  connection: Connection,
  tokenGetter: (mintAddress: string) => Token | undefined,
  ownedAccount: OwnedAccount<Buffer>
): Promise<BalanceInfo> => {
  if (!isSPLAccount(ownedAccount)) {
    // if not SPL account assume SOL based account
    return {
      amount: BigInt(ownedAccount.accountInfo.lamports ?? 0),
      owner: ownedAccount.publicKey,
      lamports: BigInt(ownedAccount.accountInfo.lamports ?? 0),
      token: {
        mintAddress: "Asdfasdf",
        decimals: 9,
        name: "",
        symbol: "SOL",
      },
    }
  }
  const { mintPublicKey, owner, amount } = parseTokenAccountData(ownedAccount.accountInfo.data)

  let token = tokenGetter(mintPublicKey.toBase58())
  if (token) {
    return {
      amount: amount,
      owner: ownedAccount.publicKey,
      lamports: BigInt(ownedAccount.accountInfo.lamports ?? 0),
      token: {
        mintAddress: mintPublicKey.toBase58(),
        decimals: token.decimals,
        name: token.name,
        symbol: token.symbol,
      },
    }
  }

  const splToken = new SPLToken(connection, mintPublicKey, TOKEN_PROGRAM_ID, {
    displayName: "string",
    id: "string",
    rpDisplayName: "string",
  })

  return splToken
    .getMintInfo()
    .then((mintInfo) => {
      return {
        amount: amount,
        owner: ownedAccount.publicKey,
        lamports: BigInt(ownedAccount.accountInfo.lamports ?? 0),
        token: {
          mintAddress: mintPublicKey.toBase58(),
          decimals: mintInfo.decimals,
          name: "",
          symbol: "",
        },
      }
    })
    .catch((e) => {
      throw new Error(
        `Unable to retrieve mint information at address: ${mintPublicKey.toBase58()}: ${e}`
      )
    })
}
