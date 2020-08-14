import { clusterApiUrl } from "@solana/web3.js"
import { Mint } from "../../types"

export class TokenCache {
  private tokens: {[network: string]: {[mintAddress: string]: Mint}}

  constructor() {
    // TODO this should be stored in the store and persisted. Furthermore the pop should be able to Add, Update, Delete Mint information per network
    this.tokens = {
      [clusterApiUrl('mainnet-beta')]: {
        '7JMYnisD7vu9c5LQDxaEfmiGrvAa11nT8M6QW3YZ3xN4': {
          publicKey: "7JMYnisD7vu9c5LQDxaEfmiGrvAa11nT8M6QW3YZ3xN4",
          name: "Serum",
          symbol: "SRM",
          decimals: 9, // TODO validate this number
        },
        "MSRMmR98uWsTBgusjwyNkE8nDtV79sJznTedhJLzS4B": {
          publicKey: "MSRMmR98uWsTBgusjwyNkE8nDtV79sJznTedhJLzS4B",
          name: "MegaSerum",
          symbol: "MSRM",
          decimals: 9, // TODO validate this number
        },
      },
      [clusterApiUrl('testnet')]: {
        "G65iDJGE9NPYVrPNAFbYvTN4Q7bPhtemwAjrdvmVk4Ly": {
          publicKey: "G65iDJGE9NPYVrPNAFbYvTN4Q7bPhtemwAjrdvmVk4Ly",
          name: "dfuse",
          symbol: "DFU",
          decimals: 2,
        },
        "9o1FisE366msTQcEvXapyMorTLmvezrxSD8DnM5e5XKw": {
          publicKey: "9o1FisE366msTQcEvXapyMorTLmvezrxSD8DnM5e5XKw",
          name: "Serum",
          symbol: "SRM",
          decimals: 9, // TODO validate this number
        }
      },
    }
  }

  getTokens(networkEndpoint: string): Mint[] {
    const networkMints = this.tokens[networkEndpoint]
    return Object.keys(networkMints).map(key => {
      return networkMints[key]
    })
  }

  getToken(networkEndpoint: string, accountAddress: string): (Mint | undefined) {
    const networkMints = this.tokens[networkEndpoint]
    if (networkMints) {
      return networkMints[accountAddress]
    }
    return undefined
  }
}
