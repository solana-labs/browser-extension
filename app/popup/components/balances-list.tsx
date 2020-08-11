import React, { useEffect, useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import {
  useAllAccountsForPublicKey,
  useBalanceInfo,
  useSolanaExplorerUrlSuffix
} from "../hooks"
import { LoadingIndicator } from "./loading-indicator"
import Collapse from "@material-ui/core/Collapse"
import { Typography } from "@material-ui/core"
import Link from "@material-ui/core/Link"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { makeStyles } from "@material-ui/core/styles"
import { abbreviateAddress } from "../utils/utils"
import Button from "@material-ui/core/Button"
import SendIcon from "@material-ui/icons/Send"
import ReceiveIcon from "@material-ui/icons/CallReceived"
import AttachmentIcon from "@material-ui/icons/Attachment"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import RefreshIcon from "@material-ui/icons/Refresh"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { AuthorizeTransactionDialog } from "./dialogs/authorize-transaction-dialog"
import { useBackground } from "../context/background"
import { BalanceInfo } from "../types"
import { PendingRequestAccounts, PendingSignTransaction } from "../../core/types"
import { AuthorizeRequestAccountsDialog } from "./dialogs/authorize-request-accounts-dialog"
import { createLogger } from "../../core/utils"
import CopyToClipboard from "react-copy-to-clipboard"
import { SendDialog } from "./send-dialog"

const log = createLogger("sol:balancelist")

const balanceFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
  useGrouping: true,
})

interface BalancesListProp {
  account: string
}

export const BalancesList: React.FC<BalancesListProp> = ({ account }) => {
  const { popupState } = useBackground()

  const publicKey = new PublicKey(account)
  const ownedAccounts = useAllAccountsForPublicKey(publicKey)

  log("rendering balance list: %o", ownedAccounts)

  const [pendingSignTransaction, setPendingSignTransaction] = useState<PendingSignTransaction>()
  const [pendingRequestAccounts, setPendingRequestAccount] = useState<PendingRequestAccounts>()

  useEffect(() => {
    if (!popupState) {
      setPendingSignTransaction(undefined)
      return
    }
    if (popupState.pendingTransactions.length > 0) {
      setPendingSignTransaction(popupState?.pendingTransactions[0])
    }
  }, [popupState?.pendingTransactions])

  useEffect(() => {
    if (!popupState) {
      setPendingRequestAccount(undefined)
      return
    }
    if (popupState.pendingRequestAccounts.length > 0) {
      setPendingRequestAccount(popupState?.pendingRequestAccounts[0])
    }
  }, [popupState?.pendingRequestAccounts])

  return (
    <Paper>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} component="h2">
            Balances
          </Typography>
          <Tooltip title="Refresh" arrow>
            <IconButton
              onClick={() => {
                // refreshWalletPublicKeys(wallet)
                // publicKeys.map((publicKey) =>
                //   refreshAccountInfo(wallet.connection, publicKey, true)
                // )
              }}
              style={{ marginRight: -12 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {ownedAccounts.map((ownedAccount) => (
          <BalanceListItem key={ownedAccount.publicKey.toBase58()} publicKey={ownedAccount.publicKey} accountInfo={ownedAccount.accountInfo} />
        ))}
      </List>
      {pendingSignTransaction && (
        <AuthorizeTransactionDialog
          open={true}
          onClose={() => setPendingSignTransaction(undefined)}
          transaction={pendingSignTransaction}
        />
      )}
      {pendingRequestAccounts && (
        <AuthorizeRequestAccountsDialog
          open={true}
          onClose={() => setPendingRequestAccount(undefined)}
          pendingRequestAccounts={pendingRequestAccounts}
        />
      )}
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  address: {
    textOverflow: "ellipsis",
    overflowX: "hidden",
  },
  itemDetails: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

interface BalanceListItemProps {
  publicKey: PublicKey
  accountInfo: AccountInfo<Buffer>
}

const BalanceListItem: React.FC<BalanceListItemProps> = ({ publicKey, accountInfo }) => {
  const balanceInfo = useBalanceInfo(publicKey, accountInfo)
  const urlSuffix = useSolanaExplorerUrlSuffix()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)

  if (!balanceInfo) {
    return <LoadingIndicator delay={0} />
  }

  let { amount, decimals, mint, tokenName, tokenSymbol } = balanceInfo

  let balance = "" + amount / BigInt(Math.pow(10, decimals))
  if (decimals !== 0) {
    balance = balance + "." + (amount % BigInt(Math.pow(10, decimals)))
  }

  return (
    <>
      <ListItem button onClick={() => setOpen((open) => !open)}>
        <ListItemText
          primary={
            <>
              {balanceFormat.format(parseFloat(balance))}{" "}
              {tokenSymbol ?? (mint && abbreviateAddress(mint))}
            </>
          }
          secondary={publicKey.toBase58()}
          secondaryTypographyProps={{ className: classes.address }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.itemDetails}>
          <div className={classes.buttonContainer}>
            <CopyToClipboard text={publicKey.toBase58()}>
              <Button variant="outlined" color="primary" startIcon={<AttachmentIcon />}>
                Copy Addr
              </Button>
            </CopyToClipboard>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SendIcon />}
              onClick={() => setSendDialogOpen(true)}
            >
              Send
            </Button>
          </div>
          <Typography variant="body2" className={classes.address}>
            Deposit Address: {publicKey.toBase58()}
          </Typography>
          <Typography variant="body2">Token Name: {tokenName ?? "Unknown"}</Typography>
          <Typography variant="body2">Token Symbol: {tokenSymbol ?? "Unknown"}</Typography>
          {mint ? (
            <Typography variant="body2" className={classes.address}>
              Token Address: {mint.toBase58()}
            </Typography>
          ) : null}
          <Typography variant="body2">
            <Link
              href={
                `https://explorer.solana.com/account/${publicKey.toBase58()}` +
                urlSuffix
              }
              target="_blank"
              rel="noopener"
            >
              View on Solana Explorer
            </Link>
          </Typography>
        </div>
      </Collapse>
      {balanceInfo && (
        <SendDialog
          open={sendDialogOpen}
          onClose={() => setSendDialogOpen(false)}
          balanceInfo={balanceInfo}
          publicKey={publicKey}
        />
      )}
    </>
  )
}
