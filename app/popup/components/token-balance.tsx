import React from "react"
import { PublicKey } from "@solana/web3.js"
import { LoadingIndicator } from "./loading-indicator"
import { BalanceInfo } from "../types"
import { formatAddress, formatAmount } from "../utils/format"

interface TokenBalanceProp {
  publicKey: PublicKey
  balanceInfo: BalanceInfo | null
}

export const TokenBalance: React.FC<TokenBalanceProp> = ({ publicKey, balanceInfo }) => {
  if (!balanceInfo) {
    return <LoadingIndicator delay={0}/>
  }
  let { amount, decimals, mint, tokenName, tokenSymbol } = balanceInfo

  return (
    <div>
      {formatAmount(amount, decimals)} {tokenSymbol ?? (mint && formatAddress(mint))}
    </div>
  )
}
