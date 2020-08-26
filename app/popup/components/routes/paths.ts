import { compile } from "path-to-regexp"

export const Paths = {
  restore: "/restore",
  login: "/login",
  welcome: "/welcome",
  authorizedWebsites: "/authorized-websites",
  tokens: "/tokens",
  accounts: "/accounts",
  lockWallet: "/lock-wallet",
}

export const Links = {
  restore: compile(Paths.restore),
  login: compile(Paths.login),
  welcome: compile(Paths.welcome),
  authorizedWebsites: compile(Paths.authorizedWebsites),
  tokens: compile(Paths.tokens),
  accounts: compile(Paths.accounts),
}
