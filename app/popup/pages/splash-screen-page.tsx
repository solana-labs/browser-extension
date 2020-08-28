import React from "react"
import Container from "@material-ui/core/Container"
import { SolanaIcon } from "../components/solana-icon"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: "black",
    color: theme.palette.primary.main
  },
  title: {
    flexGrow: 1
  }
}))

const SplashScreenPageBase: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} component="h1">
            Solana Wallet
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ textAlign: "center" }}>
        <SolanaIcon size={"50px"}/>
      </Container>
    </>
  )
}


export const SplashScreenPage = SplashScreenPageBase