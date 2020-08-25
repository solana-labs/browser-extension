import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from "@material-ui/core"
export interface EmptyProps {
  title: string
  description: string
}

const useStyles = makeStyles((theme) => ({
  empty: {
    textAlign: 'center',
  },
  icon: {
    fontSize: "50px",
  },
  title: {

  },
  description: {

  }
}))



export const Empty: React.FC<EmptyProps> = ({ title, description }) => {
  const classes = useStyles()

  return (
    <div className={classes.empty}>
      <MenuIcon className={classes.icon} />
      <Typography variant="h6" className={classes.title}>{title}</Typography>
      <Typography variant="body1" className={classes.description}>{description}</Typography>
    </div>
  )
}
