import React from "react"
import { withLayout } from "./layout"
import { Link as RouterLink } from "react-router-dom"
import Link from "@material-ui/core/Link"
import { Paths } from "./routes/paths"

const TestBase: React.FC = () => {
  return (
    <div>
      <Link component={RouterLink} to={Paths.test}>
        Test component
      </Link>
    </div>
  )
}

export const Test = withLayout(TestBase)
