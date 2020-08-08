import { clusterApiUrl } from "@solana/web3.js"

export const ENVIRONMENT_TYPE_POPUP = "popup"
export const ENVIRONMENT_TYPE_BACKGROUND = "background"
export const ENVIRONMENT_TYPE_NOTIFICATION = "notification" // will be supported soon

export const DEFAULT_NETWORK: Network = { title: "Devnet", endpoint: clusterApiUrl("devnet") }
export const AVAILABLE_NETWORKS: Network[] = [
  { title: "Mainnet Beta", endpoint: clusterApiUrl("mainnet-beta") },
  { title: "Devnet", endpoint: clusterApiUrl("devnet") },
  { title: "Testnet", endpoint: clusterApiUrl("testnet") },
]
export type RequestAccountsResp = {
  accounts: string[]
}

export type SignTransactionResp = {
  signature: string
}

export type Network = {
  title: string
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
}

export type PopupState = {
  walletState: "locked" | "unlocked" | "uninitialized"
  accounts: string[]
  selectedAccount: string
  selectedNetwork: Network
  availableNetworks: Network[]
  pendingTransactions: PendingSignTransaction[]
  pendingRequestAccounts: PendingRequestAccounts[]
}

export type WallActions =
  | "wallet_requestPermissions"
  | "wallet_signTransaction"
  | "wallet_requestAccounts"
  | "wallet_getCluster"

export type PopupActions =
  | "popup_getState"
  | "popup_createWallet"
  | "popup_unlockWallet"
  | "popup_authoriseTransaction"
  | "popup_declineTransaction"
  | "popup_authoriseRequestAccounts"
  | "popup_declineRequestAccounts"
  | "popup_addWalletAccount"
  | "popup_sendToken"
  | "popup_changeNetwork"
  | "popup_changeAccount"

export type PendingSignTransaction = {
  message: string
  tabId: string
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
