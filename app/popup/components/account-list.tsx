import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { useAllAccountsForPublicKey, useBalanceInfo } from "../hooks"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import RefreshIcon from "@material-ui/icons/Refresh"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { useBackground } from "../context/background"
import { createLogger } from "../../core/utils"
import { MoreVert } from "@material-ui/icons"
import { Links } from "./routes/paths"
import { useHistory } from "react-router-dom"
import { TokenBalance } from "./token-balance"

const log = createLogger("sol:balancelist")

const useStyles = makeStyles((theme) => ({
  address: {
    textOverflow: "ellipsis",
    overflowX: "hidden"
  },
  publicKey: {
    // marginLeft: theme.spacing(1),
  },
  network: {
    marginLeft: theme.spacing(2)
  },
  externalAccount: {
    backgroundColor: theme.palette.background.paper
  },
  derivedAccount: {
    backgroundColor: theme.palette.background.default
  },
  detailButton: {
    margin: theme.spacing(1)
  }
}))

interface AccountListProp {
  account: string
}

export const AccountList: React.FC<AccountListProp> = ({ account }) => {
  const classes = useStyles()
  const { popupState } = useBackground()

  const publicKey = new PublicKey(account)
  const ownedAccounts = useAllAccountsForPublicKey(publicKey)

  return (
    <Paper>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h2">
            Balances
          </Typography>
          <Typography style={{ flexGrow: 1 }} className={classes.network}>
            ({popupState?.selectedNetwork.title})
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
              <RefreshIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {ownedAccounts.map((ownedAccount) => (
          <AccountListItem
            key={ownedAccount.publicKey.toBase58()}
            publicKey={ownedAccount.publicKey}
            signer={ownedAccounts[0].publicKey}
            accountInfo={ownedAccount.accountInfo}
          />
        ))}
      </List>
    </Paper>
  )
}

interface BalanceListItemProps {
  signer: PublicKey
  publicKey: PublicKey
  accountInfo: AccountInfo<Buffer>
}

const AccountListItem: React.FC<BalanceListItemProps> = ({ signer, publicKey, accountInfo }) => {
  const history = useHistory()
  const classes = useStyles()
  const balanceInfo = useBalanceInfo(publicKey, accountInfo)

  const accountDetail = (account: PublicKey, signer: PublicKey) => {
    history.push(
      Links.accountDetail({ accountAddress: account.toBase58(), signerAddress: signer.toBase58() })
    )
  }

  return (
    <>
      <ListItem
        className={signer == publicKey ? classes.externalAccount : classes.derivedAccount}
        divider={signer == publicKey}
      >
        <ListItemText
          primary={<TokenBalance publicKey={publicKey} balanceInfo={balanceInfo}/>}
          secondary={
            <React.Fragment>
              <Typography
                className={classes.publicKey}
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {publicKey.toBase58()}
              </Typography>
            </React.Fragment>
          }
          secondaryTypographyProps={{ className: classes.address }}
        />
        <IconButton
          color="primary"
          size="small"
          className={classes.detailButton}
          onClick={() => accountDetail(publicKey, signer)}
        >
          <MoreVert/>
        </IconButton>
      </ListItem>
    </>
  )
}
