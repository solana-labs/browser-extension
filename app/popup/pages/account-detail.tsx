import React, { useEffect, useState } from "react"
import { useAccountInfo, useSolanaExplorerUrlSuffix } from "../hooks"
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
import { Buffer } from "buffer"
import { getBalanceInfo } from "../utils/account-data"
import { useConnection } from "../context/connection"
import { useBackground } from "../context/background"
import { BalanceInfo, OwnedAccount } from "../types"

const useStyles = makeStyles((theme) => ({
  itemDetails: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  accountAddress: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  buttonItem: {
    textAlign: "center",
  },
}))

const AccountDetailBaseWrapper: React.FC = () => {
  const { accountAddress, signerAddress } = useParams()
  const publicKey = new PublicKey(accountAddress)
  const signerKey = new PublicKey(signerAddress)

  const { connection } = useConnection()
  const { getToken } = useBackground()
  const [accountInfo, accountInfoLoaded] = useAccountInfo(publicKey)
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>()

  useEffect(() => {
    const ownedAccount = { publicKey: publicKey, accountInfo: accountInfo } as OwnedAccount<Buffer>
    getBalanceInfo(connection, getToken, ownedAccount)
      .then((balanceInfo) => {
        setBalanceInfo(balanceInfo)
      })
      .catch((e) => {
        console.log("error getting a balance information")
      })
  }, [accountInfo])

  if (!accountInfoLoaded || !accountInfo || !balanceInfo) {
    return (
      <Container fixed maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LoadingIndicator />
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <AccountDetailBase
      signerKey={signerKey}
      balanceInfo={balanceInfo}
      ownedAccount={{ publicKey: publicKey, accountInfo: accountInfo } as OwnedAccount<Buffer>}
    />
  )
}

interface AccountDetailBaseProp {
  signerKey: PublicKey
  ownedAccount: OwnedAccount<Buffer>
  balanceInfo: BalanceInfo
}

const AccountDetailBase: React.FC<AccountDetailBaseProp> = ({
  signerKey,
  ownedAccount,
  balanceInfo,
}) => {
  const classes = useStyles()
  const [sendDialogOpen, setSendDialogOpen] = useState(false)

  const urlSuffix = useSolanaExplorerUrlSuffix()
  const history = useHistory()

  const goBack = () => {
    history.push(Paths.accounts)
  }

  const refresh = () => {
    // refreshWalletPublicKeys(wallet)
    // publicKeys.map((publicKey) =>
    //   refreshAccountInfo(wallet.connection, publicKey, true)
    // )
  }

  return (
    <Container fixed maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <AppBar position="static" color="default" elevation={1}>
              <Toolbar>
                <IconButton onClick={goBack}>
                  <ArrowBackIos />
                </IconButton>

                <Typography variant="h6" component="h2" style={{ flexGrow: 1 }}>
                  Account Detail
                </Typography>
                <Tooltip title="Refresh" arrow>
                  <IconButton onClick={refresh}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            <div className={classes.itemDetails}>
              <Typography align="center" className={classes.accountAddress} noWrap={true}>
                {ownedAccount.publicKey.toBase58()}
              </Typography>

              {ownedAccount.accountInfo && (
                <Typography variant="h4" align="center" className={classes.accountAddress}>
                  <TokenBalance publicKey={ownedAccount.publicKey} balanceInfo={balanceInfo} />
                </Typography>
              )}

              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={0}
              >
                <Grid key={`btn-copy`} item xs={4} className={classes.buttonItem}>
                  <CopyToClipboard text={ownedAccount.publicKey.toBase58()}>
                    <Button variant="outlined" color="primary" startIcon={<Attachment />}>
                      Copy
                    </Button>
                  </CopyToClipboard>
                </Grid>
                <Grid key={`btn-explorer`} item xs={4} className={classes.buttonItem}>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={
                      `https://explorer.solana.com/account/${ownedAccount.publicKey.toBase58()}` +
                      urlSuffix
                    }
                    target="_blank"
                    rel="noopener"
                    startIcon={<SolanaIcon />}
                  >
                    Explorer
                  </Button>
                </Grid>
                <Grid key={`btn-send`} item xs={4} className={classes.buttonItem}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Send />}
                    onClick={() => setSendDialogOpen(true)}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Typography variant="h6" align="center">
              Transaction list
            </Typography>
            <TransactionList accountKey={ownedAccount.publicKey} signerKey={signerKey} />

            {signerKey.toBase58() === ownedAccount.publicKey.toBase58() && (
              <SendSolDialog
                open={sendDialogOpen}
                onClose={() => setSendDialogOpen(false)}
                balanceInfo={balanceInfo}
                fromPublicKey={ownedAccount.publicKey}
              />
            )}
            {signerKey.toBase58() !== ownedAccount.publicKey.toBase58() && (
              <SendSplDialog
                open={sendDialogOpen}
                onClose={() => setSendDialogOpen(false)}
                balanceInfo={balanceInfo}
                fromPublicKey={ownedAccount.publicKey}
                signer={signerKey}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export const AccountDetail = withLayout(AccountDetailBaseWrapper)
