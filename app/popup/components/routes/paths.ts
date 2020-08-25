import { compile } from "path-to-regexp"

export const Paths = {
  authorizedWebsites: "/authorized-websites",
  tokens: "/tokens",
  account: "/account",
  lockWallet: "/lock-wallet",
}

export const Links = {
  authorizedWebsites: compile(Paths.authorizedWebsites),
  tokens: compile(Paths.tokens),
  account: compile(Paths.account),
}
