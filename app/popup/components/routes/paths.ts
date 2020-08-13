import { compile } from "path-to-regexp";

export const Paths = {
  test: "/test",
  accounts: "/accounts",
};

export const Links = {
  test: compile(Paths.test),
  accounts: compile(Paths.accounts),
};
