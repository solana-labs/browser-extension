import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { DialogForm } from "./dialog-form"
import { useCallAsync } from "../../utils/notifications"
import { Card, CardContent, DialogProps, makeStyles, Typography } from "@material-ui/core"
import { useBackground } from "../../context/background"
import { PendingSignTransaction } from "../../../core/types"
import ReactMarkdown from "react-markdown"
import { createLogger } from "../../../core/utils"

const log = createLogger("sol:authDialog")

const useStyles = makeStyles({
  content: {
    // Required for big addresses to break otherwise it overflows, works great for addresses but might not be the case for other words...
    wordBreak: "break-all"
  }
})

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
  transaction: PendingSignTransaction
}

export const AuthorizeTransactionDialog: React.FC<Props> = ({ open, onClose, transaction }) => {
  const classes = useStyles()
  const { request } = useBackground()
  const callAsync = useCallAsync()

  const handleAuthorize = () => {
    callAsync(request("popup_authoriseTransaction", { tabId: transaction.tabId }), {
      progress: { message: "Authorizing Transaction..." },
      success: { message: "Success!" },
      onFinish: () => {
        onClose()
      }
    })
  }

  const handleDecline = () => {
    callAsync(request("popup_declineTransaction", { tabId: transaction.tabId }), {
      progress: { message: "Declining Transaction..." },
      success: { message: "Declined", variant: "error" },
      onFinish: () => {
        onClose()
      }
    })
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={handleAuthorize}>
      <DialogTitle>Authorize Transaction</DialogTitle>
      <DialogContent>
        <Card variant="outlined">
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h6" component="h5">
              Instructions
            </Typography>
            <div>{renderTransactionDetails(transaction)}</div>
          </CardContent>
        </Card>
        <TextField
          label="Message"
          fullWidth
          variant="outlined"
          margin="normal"
          value={transaction.message}
          disabled={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDecline}>Cancel</Button>
        <Button type="submit" color="primary">
          Send
        </Button>
      </DialogActions>
    </DialogForm>
  )
}

function renderTransactionDetails(transaction: PendingSignTransaction) {
  if (!transaction.details?.length) {
    log("Authorization dialog has no transaction details")
    return <ReactMarkdown key={0} source={undecodedTransactionMessage()}/>
  }
  return transaction.details.map((detail, idx) => {
    return <ReactMarkdown key={idx} source={detail}/>
  })
}

function undecodedTransactionMessage(): string {
  return `You are about to sign transaction that we were not able to decode`
}
