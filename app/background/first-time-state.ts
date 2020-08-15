import { DEFAULT_NETWORK, Mint, StoredData } from "../core/types"
import { clusterApiUrl } from "@solana/web3.js"

const initialState: StoredData = {
  secretBox: undefined,
  accountCount: 1, // this is important the default wallet should create an account
  selectedNetwork: DEFAULT_NETWORK,
  selectedAccount: "",
  authorizedOrigins: [],
  tokens: {
    [clusterApiUrl('mainnet-beta')]: {
      '7JMYnisD7vu9c5LQDxaEfmiGrvAa11nT8M6QW3YZ3xN4': {
        publicKey: "7JMYnisD7vu9c5LQDxaEfmiGrvAa11nT8M6QW3YZ3xN4",
        name: "Serum",
        symbol: "SRM",
        decimals: 9,
      },
      "MSRMmR98uWsTBgusjwyNkE8nDtV79sJznTedhJLzS4B": {
        publicKey: "MSRMmR98uWsTBgusjwyNkE8nDtV79sJznTedhJLzS4B",
        name: "MegaSerum",
        symbol: "MSRM",
        decimals: 9,
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
        decimals: 9,
      }
    },
  }
}

export default initialState



