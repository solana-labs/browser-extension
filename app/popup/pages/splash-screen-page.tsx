import React, { useEffect, useRef } from "react"
import Container from "@material-ui/core/Container"
import { withLayout } from "../components/layout"
import { SolanaIcon } from "../components/solana-icon"
import { makeStyles } from "@material-ui/core/styles"

const SplashScreenPageBase: React.FC = ({ children}) => {
  console.log("rendered SplashScreenPageBase")
  return (
    <>
      {children}
    </>
    // <Container maxWidth="sm" style={{textAlign: "center"}}>
    //   <SolanaIcon  size={"50px"} />
    // </Container>
  )
}


export const SplashScreenPage = SplashScreenPageBase