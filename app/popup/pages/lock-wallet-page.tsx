import React from "react"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"
import { Link as RouterLink } from "react-router-dom"
import { Paths } from "../components/routes/paths"
import { withLayout } from "../components/layout"

interface LockWalletPageProps {
}

const LockWalletPageBase: React.FC<LockWalletPageProps> = ({}) => {

  return (
    <Container maxWidth="sm">
      <>
        <Link style={{ cursor: "pointer" }} component={RouterLink} to={Paths.account}>
          Unlock wallet
        </Link>
      </>
    </Container>
  )
}

export const LockWalletPage = withLayout(LockWalletPageBase)