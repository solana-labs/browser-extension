import { PublicKey } from "@solana/web3.js"

const balanceFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 10,
  useGrouping: true
})

export const formatSolAmount = (amount: number | bigint) => {
  return formatAmount(amount, 10)
}

export const formatAmount = (amount: number | bigint, decimals: number) => {
  let stringAmount = ""
  if (typeof amount == "number") {
    stringAmount = "" + amount / Math.pow(10, decimals)
  } else {
    stringAmount = "" + amount / BigInt(Math.pow(10, decimals))
  }
  return balanceFormat.format(parseFloat(stringAmount))
}

export function formatAddress(address: PublicKey) {
  let base58 = address.toBase58()
  return base58.slice(0, 4) + "…" + base58.slice(base58.length - 4)
}
