import { DEFAULT_NETWORK, StoredData } from "../core/types"

const initialState: StoredData = {
  secretBox: undefined,
  accountCount: 1, // this is important the default wallet should create an account
  selectedNetwork: DEFAULT_NETWORK,
  selectedAccount: "",
  authorizedOrigins: [],
}

export default initialState
