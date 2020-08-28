import React from "react"
import { Typography } from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import { makeStyles } from "@material-ui/core/styles"
// @ts-ignore FIXME We need to add a mock definition of this library to the overall project
import bs58 from "bs58"
import { useBackground } from "../context/background"

interface PopupPageProps {
  opener: any
}

export const PopupPage: React.FC<PopupPageProps> = (opts: PopupPageProps) => {
  return <Typography>Please keep this window open in the background.</Typography>
}

/**
 * Switch focus to the parent window. This requires that the parent runs
 * `window.name = 'parent'` before opening the popup.
 */
function focusParent() {
  window.open("", "parent")
}

const useStyles = makeStyles((theme) => ({
  connection: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center"
  },
  transaction: {
    wordBreak: "break-all"
  },
  actions: {
    justifyContent: "space-between"
  }
}))

interface ApproveConnectionFormProps {
  origin: string | null
  onApprove: () => void
}

const ApproveConnectionForm: React.FC<ApproveConnectionFormProps> = ({ origin, onApprove }) => {
  const { popupState } = useBackground()
  const account = popupState?.accounts || ""
  const classes = useStyles()
  if (!account) {
    return null
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom>
          Allow this site to access your Solana account?
        </Typography>
        <div className={classes.connection}>
          <Typography>{origin}</Typography>
          <ImportExportIcon fontSize="large"/>
          <Typography>{account}</Typography>
        </div>
        <Typography>Only connect with sites you trust.</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={window.close}>Cancel</Button>
        <Button color="primary" onClick={onApprove}>
          Connect
        </Button>
      </CardActions>
    </Card>
  )
}

interface ApproveSignatureFormProp {
  origin: string | null
  message: string
  onApprove: () => void
  onReject: () => void
}

const ApproveSignatureForm: React.FC<ApproveSignatureFormProp> = ({
                                                                    origin,
                                                                    message,
                                                                    onApprove,
                                                                    onReject
                                                                  }) => {
  const classes = useStyles()

  // TODO: decode message

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h1" gutterBottom>
          {origin} would like to send the following transaction:
        </Typography>
        <Typography className={classes.transaction}>{bs58.encode(Buffer.from(message))}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={onReject}>Cancel</Button>
        <Button color="primary" onClick={onApprove}>
          Approve
        </Button>
      </CardActions>
    </Card>
  )
}
