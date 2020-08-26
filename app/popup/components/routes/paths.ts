import { compile } from "path-to-regexp"

export const Paths = {
  authorizedWebsites: "/authorized-websites",
  tokens: "/tokens",
  accounts: "/accounts",
  lockWallet: "/lock-wallet",
}

export const Links = {
  authorizedWebsites: compile(Paths.authorizedWebsites),
  tokens: compile(Paths.tokens),
  accounts: compile(Paths.accounts),
}
