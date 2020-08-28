import React from "react"
import { NavigationFrame } from "../navigation-frame"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}))


export const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <NavigationFrame/>
      <main className={classes.content}>{children}</main>
    </>
  )
}
