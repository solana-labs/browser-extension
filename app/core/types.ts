import { clusterApiUrl, Cluster, TransactionInstruction } from "@solana/web3.js"

export const ENVIRONMENT_TYPE_POPUP = "popup"
export const ENVIRONMENT_TYPE_BACKGROUND = "background"
export const ENVIRONMENT_TYPE_NOTIFICATION = "notification" // will be supported soon
export const INPAGE_MESSAGE_STREAM = "sol.inpage"
export const CONTENT_MESSAGE_STREAM = "sol.cs"
export const MUX_PROVIDER_SUBSTREAM = "sol.provider"
export const MUX_CONTROLLER_SUBSTREAM = "sol.controller"
export const CHROME_CONN_CS = "sol.cs"

export const DEFAULT_NETWORK: Network = {
  title: "Devnet",
  cluster: "devnet",
  endpoint: clusterApiUrl("devnet"),
}
export const AVAILABLE_NETWORKS: Network[] = [
  { title: "Mainnet Beta", cluster: "mainnet-beta", endpoint: clusterApiUrl("mainnet-beta") },
  { title: "Devnet", cluster: "devnet", endpoint: clusterApiUrl("devnet") },
  { title: "Testnet", cluster: "testnet", endpoint: clusterApiUrl("testnet") },
  // { title: "Break", cluster: "testnet", endpoint: "https://break-api.testnet.solana.com" },
]
export type RequestAccountsResp = {
  accounts: string[]
}

export type SignatureResult = {
  publicKey: string
  signature: string
}
export type SignTransactionResp = {
  signatureResults: SignatureResult[]
}

export type Network = {
  title: string
  cluster: Cluster | string
  endpoint: string
}

export type VersionedData = {
  version: string
  data: StoredData
}

export type StoredData = {
  secretBox: SecretBox | undefined
  accountCount: number
  selectedNetwork: Network
  selectedAccount: string
  authorizedOrigins: string[]
  tokens: { [network: string]: { [mintAddress: string]: Token } }
}

export type WalletState = {
  state: "locked" | "unlocked" | "uninitialized"
}

export type PopupState = {
  walletState: "locked" | "unlocked" | "uninitialized"
  accounts: string[]
  selectedAccount: string
  selectedNetwork: Network
  availableNetworks: Network[]
  pendingTransactions: PendingSignTransaction[]
  pendingRequestAccounts: PendingRequestAccounts[]
  authorizedOrigins: string[]
  tokens: Token[]
}

export type WallActions =
  | "wallet_requestPermissions"
  | "wallet_signTransaction"
  | "wallet_requestAccounts"
  | "wallet_getCluster"
  | "wallet_getState"

export type PopupActions =
  | "popup_getState"
  | "popup_createWallet"
  | "popup_unlockWallet"
  | "popup_lockWallet"
  | "popup_authoriseTransaction"
  | "popup_declineTransaction"
  | "popup_authoriseRequestAccounts"
  | "popup_deleteAuthorizedWebsite"
  | "popup_declineRequestAccounts"
  | "popup_addWalletAccount"
  | "popup_sendToken"
  | "popup_changeNetwork"
  | "popup_changeAccount"
  | "popup_addToken"
  | "popup_removeToken"
  | "popup_updateToken"

export type PendingSignTransaction = {
  message: string
  signers: string[]
  details?: Markdown[]
  tabId: string
}

export type Ricardian = string;
export type Markdown = string;

export type DecodedInstruction = {
  instruction: TransactionInstruction
  instructionType: string
  properties: {[key: string]: any}
}

export type Token = {
  mintAddress: string
  name: string
  symbol: string
  decimals: number
}

export type PendingRequestAccounts = {
  tabId: string
  origin: string
}

export type SecretBox = {
  nonce: string
  kdf: string // pbkdf2
  encryptedBox: string
  salt: string
  iterations: number
  digest: string //sha256
}

export type Notification =
  | NotificationNetworkChanged
  | NotificationAccountsChanged
  | NotificationPopupStateChanged
  | NotificationStateChanged

export type NotificationNetworkChanged = {
  type: "clusterChanged"
  data: Network
}

export type NotificationAccountsChanged = {
  type: "accountsChanged"
  data: string[]
}

export type NotificationPopupStateChanged = {
  type: "popupStateChanged"
  data: PopupState
}

export type NotificationStateChanged = {
  type: "stateChanged"
  data: WalletState
}
