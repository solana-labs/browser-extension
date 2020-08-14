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

  const displayAmount = (amount: number, decimal: number):string => {
    return `${amount / Math.pow(10, decimal)}`
  }

  const renderTransactionDetails = () => {
    if (!transaction.details) {
      return null
    }
    return transaction.details.map((detail, idx) => {
    	if (!detail) {
    		return (
    			<p>Unable to decode instruction at index {idx}</p>
				)
			}
			switch (detail.type) {
        case "sol_createAccount":
          return (
            <p>SOL Create new account {detail.params.newAccount} from: {detail.params.from}</p>
          )
				case "sol_transfer":
					return (
						<p>SOL Transfer {displayAmount(detail.params.amount,9)} SOL from {detail.params.from} to {detail.params.to}</p>
					)
				case "spl_transfer":
					return (
						<p>SPL Transfer {displayAmount(detail.params.amount,(detail.params.mint.decimals || 9))} {detail.params.mint.symbol} from {detail.params.from} to {detail.params.to}</p>
					)
        case "dex_cancelorder":
          return (
            <p>Dex Cancel Order: TBD</p>
          )
        case "dex_neworder":
          return (
            <p>Dex New Order: TBD</p>
          )
      }
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
        {renderTransactionDetails()}
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
