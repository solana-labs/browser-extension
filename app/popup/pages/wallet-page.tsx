import React from "react"
import Container from "@material-ui/core/Container"
import { BalancesList } from "../components/balances-list"
import Grid from "@material-ui/core/Grid"
import { DebugButtons } from "../components/debug-buttons"
import { clusterApiUrl } from "@solana/web3.js"
import { LoadingIndicator } from "../components/loading-indicator"
import { useBackground } from "../context/background"

interface WalletPageProps {
  account: string
}

export const WalletPage: React.FC<WalletPageProps> = ({ account }) => {
  const { popupState } = useBackground()
  const isProdNetwork = popupState?.selectedNetwork.cluster === "mainnet-beta"

  if (account == "") {
    return <LoadingIndicator />
  }

  return (
    <Container fixed maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BalancesList account={account} />
        </Grid>
        {isProdNetwork ? null : (
          <Grid item xs={12}>
            <DebugButtons />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
