import { createLogger } from "../../core/utils"
import React from "react"
import { useConnection } from "../context/connection"

const log = createLogger("sol:trxlist")

interface TransctionListProp {
  account: string
}

export const TransactionList: React.FC<TransctionListProp> = ({ account }) => {
  // const { connection } = useConnection()
  // connection.
  return (<></>)
}