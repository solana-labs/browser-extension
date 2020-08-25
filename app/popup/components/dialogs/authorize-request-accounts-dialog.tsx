import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import { DialogForm } from "./dialog-form"
import { useCallAsync } from "../../utils/notifications"
import { DialogProps } from "@material-ui/core"
import { useBackground } from "../../context/background"
import { PendingRequestAccounts } from "../../../core/types"

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
  pendingRequestAccounts: PendingRequestAccounts
}

export const AuthorizeRequestAccountsDialog: React.FC<Props> = ({
  open,
  onClose,
  pendingRequestAccounts,
}) => {
  const { request } = useBackground()
  const callAsync = useCallAsync()

  const handleAuthorize = () => {
    callAsync(
      request("popup_authoriseRequestAccounts", {
        tabId: pendingRequestAccounts.tabId,
        origin: pendingRequestAccounts.origin,
      }),
      {
        progress: { message: "Authorizing Request Account..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }
  const handleDecline = () => {
    callAsync(
      request("popup_declineRequestAccounts", {
        tabId: pendingRequestAccounts.tabId,
        origin: pendingRequestAccounts.origin,
      }),
      {
        progress: { message: "Declining Request Account..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={handleAuthorize}>
      <DialogTitle>Account Access</DialogTitle>
      <DialogContent>
        <p>The website:</p>
        <h2>{pendingRequestAccounts.origin}</h2>
        <p>
          Wants to{" "}
          <b>
            <i>list your accounts.</i>
          </b>
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDecline}>Deny</Button>
        <Button type="submit" color="primary">
          Allow
        </Button>
      </DialogActions>
    </DialogForm>
  )
}
