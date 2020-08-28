const balanceFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 10,
  useGrouping: true,
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