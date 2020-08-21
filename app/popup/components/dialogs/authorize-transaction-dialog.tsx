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
import { PendingSignTransaction, InstructionDetails } from "../../../core/types"
import ReactMarkdown from "react-markdown"

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
        {renderTransactionDetails(transaction)}
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
  if (!transaction.details) {
    return null
  }

  // ESLint is not smart enough to understand that TypeScript tells us that all case are covered
  // eslint-disable-next-line array-callback-return
  return transaction.details.map((detail, idx) => {
    const ricardianMarkdown = ricardianForInstruction(idx, detail)

    return <ReactMarkdown key={idx} source={ricardianMarkdown} />
  })
}

function ricardianForInstruction(atIndex: number, detail?: InstructionDetails): string {
  if (!detail) {
    return `Unable to decode instruction at index ${atIndex}`
  }

  switch (detail.type) {
    case "sol_createAccount":
      return `SOL Create new account ${detail.params.newAccount} from: ${detail.params.from}`
    case "sol_transfer":
      return `SOL Transfer ${displayAmount(detail.params.amount, 9)} SOL from ${
        detail.params.from
      } to ${detail.params.to}`
    case "spl_transfer":
      return `SPL Transfer ${displayAmount(
        detail.params.amount,
        detail.params.mint.decimals || 9
      )} ${detail.params.mint.symbol} from ${detail.params.from} to ${detail.params.to}`
    case "dex_cancelorder":
      return `Dex Cancel Order: TBD`
    case "dex_neworder":
      return `Dex New Order: TBD`
  }
}

function displayAmount(amount: number, decimal: number): string {
  return `${amount / Math.pow(10, decimal)}`
}
