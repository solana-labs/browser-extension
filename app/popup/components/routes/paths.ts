import { compile } from "path-to-regexp"

export const Paths = {
  restore: "/restore",
  login: "/login",
  welcome: "/welcome",
  authorizedWebsites: "/authorized-websites",
  tokens: "/tokens",
  accountDetail: "/accounts/:accountAddress/:signerAddress",
  accounts: "/accounts",
  notifications: "/notifications",
  lockWallet: "/lock-wallet",
  transactionDetail: "/transaction/:transactionID/:accountAddress/:signerAddress",
}

export const Links = {
  restore: compile(Paths.restore),
  login: compile(Paths.login),
  welcome: compile(Paths.welcome),
  notifications: compile(Paths.notifications),
  authorizedWebsites: compile(Paths.authorizedWebsites),
  tokens: compile(Paths.tokens),
  accounts: compile(Paths.accounts),
  accountDetail: compile(Paths.accountDetail),
  transactionDetail: compile(Paths.transactionDetail),
}
