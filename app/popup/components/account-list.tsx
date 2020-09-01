import React, { useEffect, useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Paper from "@material-ui/core/Paper"
import { useAllAccountsForPublicKey, useTokenAccountsByOwner } from "../hooks"
import { Button, Chip, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import RefreshIcon from "@material-ui/icons/Refresh"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { useBackground } from "../context/background"
import { Attachment, MoreVert } from "@material-ui/icons"
import { Links } from "./routes/paths"
import { useHistory } from "react-router-dom"
import { TokenBalance } from "./token-balance"
import { LoadingIndicator } from "./loading-indicator"
import { BalanceInfo, OwnedAccount } from "../types"
import { getBalanceInfo } from "../utils/account-data"
import { useConnection } from "../context/connection"
import CopyToClipboard from "react-copy-to-clipboard"

const useStyles = makeStyles((theme) => ({
  address: {
    textOverflow: "ellipsis",
    overflowX: "hidden",
  },
  publicKey: {
    // marginLeft: theme.spacing(1),
  },
  network: {
    marginLeft: theme.spacing(2),
  },
  externalAccount: {
    backgroundColor: theme.palette.background.paper,
  },
  derivedAccount: {
    backgroundColor: theme.palette.background.default,
  },
  detailButton: {
    margin: theme.spacing(1),
  },
}))

interface AccountListProp {
  account: string
}

export const AccountList: React.FC<AccountListProp> = ({ account }) => {
  const classes = useStyles()
  const { popupState } = useBackground()
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])

  const publicKey = new PublicKey(account)

  const [externallyOwnedAccount, initialized] = useAllAccountsForPublicKey(publicKey)
  const [otherAccounts, otherAccountLoaded] = useTokenAccountsByOwner(publicKey)

  const renderExternOwnedAccount = (eoa: OwnedAccount<Buffer>, initialized: boolean) => {
    return (
      <List disablePadding>
        {
          <AccountListItem
            initializeAccount={initialized}
            key={eoa.publicKey.toBase58()}
            ownedAccount={eoa}
            signer={eoa.publicKey}
          />
        }
      </List>
    )
  }

  const renderSPLAccounts = (eoa: OwnedAccount<Buffer>, otherAccounts: OwnedAccount<Buffer>[]) => {
    return otherAccounts.map((account) => (
      <AccountListItem
        initializeAccount={true}
        key={account.publicKey.toBase58()}
        ownedAccount={account}
        signer={eoa.publicKey}
      />
    ))
  }
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
                forceUpdate()
              }}
              style={{ marginRight: -12 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {!externallyOwnedAccount && <LoadingIndicator />}
      {externallyOwnedAccount && renderExternOwnedAccount(externallyOwnedAccount, initialized)}
      {!otherAccountLoaded && otherAccounts.length === 0 && <LoadingIndicator />}
      {externallyOwnedAccount && otherAccounts.length > 0 && (
        <List disablePadding>{renderSPLAccounts(externallyOwnedAccount, otherAccounts)}</List>
      )}
    </Paper>
  )
}

interface AccountListItemProps {
  initializeAccount: boolean
  signer: PublicKey // this should be the external owned account for SPL accounts
  ownedAccount: OwnedAccount<Buffer>
}

const AccountListItem: React.FC<AccountListItemProps> = ({
  initializeAccount,
  signer,
  ownedAccount,
}) => {
  const history = useHistory()
  const classes = useStyles()
  const { connection } = useConnection()
  const { getToken } = useBackground()
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo>()

  useEffect(() => {
    getBalanceInfo(connection, getToken, ownedAccount)
      .then((balanceInfo) => {
        setBalanceInfo(balanceInfo)
      })
      .catch((e) => {
        console.log("Error getting balance information: ", e)
      })
  }, [ownedAccount])

  const accountDetail = (account: PublicKey, signer: PublicKey) => {
    history.push(
      Links.accountDetail({ accountAddress: account.toBase58(), signerAddress: signer.toBase58() })
    )
  }

  if (!balanceInfo) {
    return <LoadingIndicator />
  }

  return (
    <>
      <ListItem
        className={
          signer === ownedAccount.publicKey ? classes.externalAccount : classes.derivedAccount
        }
        divider={signer === ownedAccount.publicKey}
      >
        <ListItemText
          primary={<TokenBalance publicKey={ownedAccount.publicKey} balanceInfo={balanceInfo} />}
          secondary={
            <React.Fragment>
              <Typography
                className={classes.publicKey}
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {ownedAccount.publicKey.toBase58()}
              </Typography>
            </React.Fragment>
          }
          secondaryTypographyProps={{ className: classes.address }}
        />
        {!initializeAccount && (
          <Chip variant="outlined" size="small" label="Uninitialized account" color="secondary" />
        )}
        {initializeAccount && (
          <IconButton
            color="primary"
            size="small"
            className={classes.detailButton}
            onClick={() => accountDetail(ownedAccount.publicKey, signer)}
          >
            <MoreVert />
          </IconButton>
        )}
      </ListItem>
    </>
  )
}
