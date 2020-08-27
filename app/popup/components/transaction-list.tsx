import { createLogger } from "../../core/utils"
import { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js"
import { useConnection } from "../context/connection"
import React, { useEffect, useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { Paper, Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { MoreVert } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import { Links } from "./routes/paths"
import { useHistory } from "react-router-dom"

const log = createLogger("sol:trxlist")

const useStyles = makeStyles((theme) => ({
  detailButton: {
    margin: theme.spacing(1),
  },
}))

interface TransactionListProp {
  accountKey: PublicKey
  signerKey: PublicKey
}

export const TransactionList: React.FC<TransactionListProp> = ({ accountKey, signerKey }) => {
  const { connection } = useConnection()
  const [confirmedSignatureInfos, setConfirmedSignatureInfos] = useState<ConfirmedSignatureInfo[]>(
    []
  )

  useEffect(() => {
    log("fetching transaction for account: ", accountKey.toBase58())
    connection
      .getConfirmedSignaturesForAddress2(accountKey, { limit: 10 })
      .then((confirmedSignatureInfos) => {
        log("got transaction: ", confirmedSignatureInfos)
        setConfirmedSignatureInfos(confirmedSignatureInfos)
      })
  }, [accountKey, connection])

  return (
    <Paper style={{ maxHeight: "100%", overflow: "auto" }}>
      <List disablePadding style={{ maxHeight: "100%", overflow: "auto" }}>
        {confirmedSignatureInfos.map((info) => (
          <TransactionListItem
            key={info.signature + info.slot}
            confirmedSignatureInfo={info}
            accountKey={accountKey}
            signerKey={signerKey}
          />
        ))}
      </List>
    </Paper>
  )
}

interface TransactionListItemProps {
  confirmedSignatureInfo: ConfirmedSignatureInfo
  accountKey: PublicKey
  signerKey: PublicKey
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  confirmedSignatureInfo,
  accountKey,
  signerKey,
}) => {
  const classes = useStyles()
  const history = useHistory()

  const transactionDetail = (
    transactionID: string,
    accountKey: PublicKey,
    signerKey: PublicKey
  ) => {
    history.push(
      Links.transactionDetail({
        transactionID,
        accountAddress: accountKey.toBase58(),
        signerAddress: signerKey.toBase58(),
      })
    )
  }

  return (
    <>
      <ListItem divider={true}>
        <ListItemText
          primary={
            <Typography variant="body2" noWrap={true}>
              {confirmedSignatureInfo.signature}
            </Typography>
          }
          secondary={confirmedSignatureInfo.slot}
        />
        <IconButton
          color="primary"
          size="small"
          className={classes.detailButton}
          onClick={() => transactionDetail(confirmedSignatureInfo.signature, accountKey, signerKey)}
        >
          <MoreVert />
        </IconButton>
      </ListItem>
    </>
  )
}
