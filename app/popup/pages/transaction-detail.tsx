import React, { useEffect, useState } from "react"
import { useSolanaExplorerUrlSuffix } from "../hooks"
import Paper from "@material-ui/core/Paper"
import { ConfirmedTransaction } from "@solana/web3.js"
import { Typography } from "@material-ui/core"
import { withLayout } from "../components/layout"
import { useParams } from "react-router"
import { ArrowBackIos } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import { Links } from "../components/routes/paths"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { useConnection } from "../context/connection"
import { createLogger } from "../../core/utils"
import { amountToSolDecimalString } from "../components/token-balance"

const log = createLogger("sol:trxDetail")

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

  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const TransactionDetailBase: React.FC = () => {
  const classes = useStyles()
  let { transactionID, accountAddress, signerAddress } = useParams()
  const { connection } = useConnection()
  const [confirmedTransaction, setConfirmedTransaction] = useState<ConfirmedTransaction>()

  const urlSuffix = useSolanaExplorerUrlSuffix()
  const history = useHistory()

  useEffect(() => {
    log("fetching confirmed transaction:", transactionID)
    connection.getConfirmedTransaction(transactionID).then((ct) => {
      log("confirmed transaction response: %O", ct)
      if (ct) {
        setConfirmedTransaction(ct)
      }
    })
  }, [])

  const goBack = () => {
    history.push(
      Links.accountDetail({ accountAddress: accountAddress, signerAddress: signerAddress })
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
                  <ArrowBackIos />
                </IconButton>
                <Typography variant="h6" component="h2" style={{ flexGrow: 1 }}>
                  Transaction Detail
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.itemDetails}>
              <Typography align="center" className={classes.accountAddress} noWrap={true}>
                {transactionID}
              </Typography>
            </div>
            {confirmedTransaction && (
              <div className={classes.itemDetails}>
                <Typography align="center">
                  Fee:{" "}
                  {confirmedTransaction.meta
                    ? amountToSolDecimalString(confirmedTransaction.meta.fee)
                    : ""}
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export const TransactionDetail = withLayout(TransactionDetailBase)
