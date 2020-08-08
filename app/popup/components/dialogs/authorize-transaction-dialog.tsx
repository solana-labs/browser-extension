import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { DialogForm } from "../dialog-form"
import { useCallAsync } from "../../utils/notifications"
import { DialogProps } from "@material-ui/core"
import { useBackground } from "../../context/background"
import { PendingSignTransaction } from "../../../core/types"

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
  transaction: PendingSignTransaction
}

export const AuthorizeTransactionDialog: React.FC<Props> = ({ open, onClose, transaction }) => {
  const { request } = useBackground()
  const callAsync = useCallAsync()

  const handleAuthorize = () => {
    callAsync(request("popup_authoriseTransaction", { tabId: transaction.tabId }), {
      progressMessage: "Authorizing Transaction...",
      successMessage: "Success!",
      callback: () => {
        onClose()
      },
    })
  }
  const handleDecline = () => {
    callAsync(request("popup_declineTransaction", { tabId: transaction.tabId }), {
      progressMessage: "Declining Transaction...",
      successMessage: "Success!",
      callback: () => {
        onClose()
      },
    })
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={handleAuthorize}>
      <DialogTitle>Authorize Transaction</DialogTitle>
      <DialogContent>
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
