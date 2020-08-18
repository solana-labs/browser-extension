import { compile } from "path-to-regexp"

export const Paths = {
  authorizedWebsites: "/authorized-websites",
  account: "/account",
  lockWallet: "/lock-wallet",
}

export const Links = {
  authorizedWebsites: compile(Paths.authorizedWebsites),
  account: compile(Paths.account),
}
