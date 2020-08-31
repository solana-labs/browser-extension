import React, { useState } from "react"
import { useAccountInfo, useBalanceInfo, useSolanaExplorerUrlSuffix } from "../hooks"
import Paper from "@material-ui/core/Paper"
import { PublicKey } from "@solana/web3.js"
import { Button, Typography } from "@material-ui/core"
import { withLayout } from "../components/layout"
import { useParams } from "react-router"
import { ArrowBackIos, Attachment, Send } from "@material-ui/icons"
import CopyToClipboard from "react-copy-to-clipboard"
import { SendSolDialog } from "../components/dialogs/send-sol-dialog"
import { SendSplDialog } from "../components/dialogs/send-spl-dialog"
import { useHistory } from "react-router-dom"
import { Paths } from "../components/routes/paths"
import { TokenBalance } from "../components/token-balance"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import RefreshIcon from "@material-ui/icons/Refresh"
import { SolanaIcon } from "../components/solana-icon"
import { TransactionList } from "../components/transaction-list"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { LoadingIndicator } from "../components/loading-indicator"

const useStyles = makeStyles((theme) => ({
  itemDetails: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  accountAddress: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const AccountDetailBase: React.FC = () => {
  const classes = useStyles()
  let { accountAddress, signerAddress } = useParams()
  const [sendDialogOpen, setSendDialogOpen] = useState(false)

  const publicKey = new PublicKey(accountAddress)
  const signerKey = new PublicKey(signerAddress)

  const [accountInfo, accountInfoLoaded] = useAccountInfo(publicKey)
  const urlSuffix = useSolanaExplorerUrlSuffix()
  const history = useHistory()

  const balanceInfo = useBalanceInfo(publicKey, accountInfo)

  const goBack = () => {
    history.push(Paths.accounts)
  }

  const refresh = () => {
    // refreshWalletPublicKeys(wallet)
    // publicKeys.map((publicKey) =>
    //   refreshAccountInfo(wallet.connection, publicKey, true)
    // )
  }

  if (!accountInfoLoaded || !accountInfo) {
    return (
      <Container fixed maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LoadingIndicator/>
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <Container fixed maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <AppBar position="static" color="default" elevation={1}>
              <Toolbar>
                <IconButton onClick={goBack}>
                  <ArrowBackIos/>
                </IconButton>

                <Typography variant="h6" component="h2" style={{ flexGrow: 1 }}>
                  Account Detail
                </Typography>
                <Tooltip title="Refresh" arrow>
                  <IconButton onClick={refresh}>
                    <RefreshIcon/>
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <div className={classes.itemDetails}>
              <Typography align="center" className={classes.accountAddress} noWrap={true}>
                {accountAddress}
              </Typography>

              {accountInfo && (
                <Typography variant="h4" align="center" className={classes.accountAddress}>
                  <TokenBalance publicKey={publicKey} balanceInfo={balanceInfo}/>
                </Typography>
              )}
              <div className={classes.buttonContainer}>
                <div>
                  <CopyToClipboard text={accountAddress}>
                    <Button variant="outlined" color="primary" startIcon={<Attachment/>}>
                      Copy Addr
                    </Button>
                  </CopyToClipboard>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`https://explorer.solana.com/account/${publicKey.toBase58()}` + urlSuffix}
                    target="_blank"
                    rel="noopener"
                    startIcon={<SolanaIcon/>}
                  >
                    Explorer
                  </Button>
                </div>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Send/>}
                  onClick={() => setSendDialogOpen(true)}
                >
                  Send
                </Button>
              </div>
            </div>

            <Typography variant="h6" align="center">
              Transaction list
            </Typography>
            <TransactionList accountKey={publicKey} signerKey={signerKey}/>

            {balanceInfo && signerKey === publicKey && (
              <SendSolDialog
                open={sendDialogOpen}
                onClose={() => setSendDialogOpen(false)}
                balanceInfo={balanceInfo}
                fromPublicKey={publicKey}
              />
            )}
            {balanceInfo && signerKey !== publicKey && (
              <SendSplDialog
                open={sendDialogOpen}
                onClose={() => setSendDialogOpen(false)}
                balanceInfo={balanceInfo}
                fromPublicKey={publicKey}
                signer={signerKey}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export const AccountDetail = withLayout(AccountDetailBase)
