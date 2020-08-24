import React from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { DialogForm } from "../dialog-form"
import { useCallAsync } from "../../utils/notifications"
import { DialogProps, Card, CardContent, Typography, makeStyles } from "@material-ui/core"
import { useBackground } from "../../context/background"
import { PendingSignTransaction, InstructionDetails } from "../../../core/types"
import ReactMarkdown from "react-markdown"
import { createLogger } from "../../../core/utils"

const log = createLogger("sol:authDialog")

const useStyles = makeStyles({
  content: {
    // Required for big addresses to break otherwise it overflows, works great for addresses but might not be the case for other words...
    wordBreak: "break-all",
  },
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
      },
    })
  }

  const handleDecline = () => {
    callAsync(request("popup_declineTransaction", { tabId: transaction.tabId }), {
      progress: { message: "Declining Transaction..." },
      success: { message: "Declined", variant: "error" },
      onFinish: () => {
        onClose()
      },
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
    return <ReactMarkdown key={0} source={undecodedTransactionMessage()} />
  }
  return transaction.details.map((detail, idx) => {
    const ricardianMarkdown = ricardianForInstruction(idx, detail)
    log("Transformed instruction at index %s to markdown %s", ricardianMarkdown)

    return <ReactMarkdown key={idx} source={ricardianMarkdown} />
  })
}

function ricardianForInstruction(atIndex: number, detail: InstructionDetails): string {
  switch (detail.type) {
    case "sol_createAccount":
      return `Create new account **${detail.params.newAccount}** (creator **${detail.params.from}**)`

    case "sol_transfer":
      return `Transfer of '${displayAmount(detail.params.amount, 9)} SOL' from **${
        detail.params.from
      }** to **${detail.params.to}**`

    case "spl_transfer":
      return `SPL Transfer ${displayAmount(
        detail.params.amount,
        detail.params.mint.decimals || 9
      )} ${detail.params.mint.symbol} from ${detail.params.from} to ${detail.params.to}`

    case "dex_cancelorder":
      return `Dex Cancel Order: TBD`

    case "dex_neworder":
      return `Dex New Order: TBD`

    case "undecodable_instruction":
      return `Unknown instruction #${atIndex + 1} for program ${
        detail.params.instruction.programId
      }`
  }
}

function displayAmount(amount: number, decimal: number): string {
  return `${amount / Math.pow(10, decimal)}`
}

function undecodedTransactionMessage(): string {
  return `You are about to sign transaction that we were not able to decode`
}
