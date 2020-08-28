import React from "react"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { useBalanceInfo } from "../hooks"
import { abbreviateAddress } from "../utils/utils"
import { makeStyles } from "@material-ui/core/styles"
import { LoadingIndicator } from "./loading-indicator"
import { BalanceInfo } from "../types"
import { formatAmount } from "../utils/format"

interface TokenBalanceProp {
  publicKey: PublicKey
  balanceInfo: BalanceInfo | null
}

const balanceFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 10,
  useGrouping: true,
})

export const TokenBalance: React.FC<TokenBalanceProp> = ({ publicKey, balanceInfo }) => {
  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />
  }
  let { amount, decimals, mint, tokenName, tokenSymbol } = balanceInfo

  return (
    <div>
      {formatAmount(amount, decimals)} {tokenSymbol ?? (mint && abbreviateAddress(mint))}
    </div>
  )
}
