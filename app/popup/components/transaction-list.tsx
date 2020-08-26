import { createLogger } from "../../core/utils"
import { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js"
import { useConnection } from "../context/connection"
import React, { useEffect, useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { Paper, Typography } from "@material-ui/core"

const log = createLogger("sol:trxlist")

interface TransctionListProp {
  accountKey: PublicKey
}

export const TransactionList: React.FC<TransctionListProp> = ({ accountKey }) => {
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
          <TransactionListItem key={info.signature + info.slot} confirmedSignatureInfo={info} />
        ))}
      </List>
    </Paper>
  )
}

interface TransactionListItemProps {
  confirmedSignatureInfo: ConfirmedSignatureInfo
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ confirmedSignatureInfo }) => {
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
      </ListItem>
    </>
  )
}
