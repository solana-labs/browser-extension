import { createLogger } from "../../core/utils"
import { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js"
import { useConnection } from "../context/connection"
import React, { useEffect, useState } from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import { Typography } from "@material-ui/core"

const log = createLogger("sol:trxlist")

interface TransctionListProp {
  account: PublicKey
}

export const TransactionList: React.FC<TransctionListProp> = ({ account }) => {
  const { connection } = useConnection()
  const [confirmedSignatureInfos, setConfirmedSignatureInfos] = useState<ConfirmedSignatureInfo[]>(
    []
  )

  useEffect(() => {
    log("fetching transaction for account: ", account.toBase58())
    connection
      .getConfirmedSignaturesForAddress2(account, { limit: 10 })
      .then((confirmedSignatureInfos) => {
        log("got transaction: ", confirmedSignatureInfos)
        setConfirmedSignatureInfos(confirmedSignatureInfos)
      })
  }, [account, connection])

  return (
    <>
      <h3>Transaction list</h3>
      <List disablePadding>
        {confirmedSignatureInfos.map((info) => (
          <TransactionListItem key={info.signature + info.slot} confirmedSignatureInfo={info} />
        ))}
      </List>
    </>
  )
}

interface TransactionListItemProps {
  confirmedSignatureInfo: ConfirmedSignatureInfo
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({ confirmedSignatureInfo }) => {
  return (
    <>
      <ListItem>
        <ListItemText>
          <Typography variant="body2" noWrap={true}>
            {confirmedSignatureInfo.signature}
          </Typography>
          {confirmedSignatureInfo.slot}{" "}
        </ListItemText>
      </ListItem>
    </>
  )
}
