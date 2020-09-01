import React, { useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { DialogForm } from "./dialog-form"
import InputAdornment from "@material-ui/core/InputAdornment"
import { useCallAsync, useSendTransaction } from "../../utils/notifications"
import { DialogProps } from "@material-ui/core"
import { BalanceInfo } from "../../types"
import { useBackground } from "../../context/background"
import { PublicKey } from "@solana/web3.js"
import { formatAddress } from "../../utils/format"

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
  fromPublicKey: PublicKey
  balanceInfo: BalanceInfo
}

export const SendSolDialog: React.FC<Props> = ({ open, onClose, fromPublicKey, balanceInfo }) => {
  const { request } = useBackground()
  const callAsync = useCallAsync()
  const [destinationAddress, setDestinationAddress] = useState("")
  const [transferAmountString, setTransferAmountString] = useState("")
  const [, sending] = useSendTransaction()

  let { amount, token } = balanceInfo

  function onSubmit() {
    let lamports = Math.round(parseFloat(transferAmountString) * Math.pow(10, token.decimals))
    if (!lamports || lamports <= 0) {
      throw new Error("Invalid amount")
    }

    callAsync(
      request("popup_sendSolToken", {
        transfer: {
          fromPubkey: fromPublicKey.toBase58(),
          toPubkey: destinationAddress,
          lamports: lamports,
        },
      }),
      {
        progress: { message: "Transferring..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        },
      }
    )
  }

  // FIXME: Was using `balanceFormat` before, need to convert it so its support BigInt!
  let formattedTokenName = "Unkown"
  if (token.name) {
    formattedTokenName = token.name
  } else if (token.mintAddress !== "") {
    formattedTokenName = formatAddress(token.mintAddress)
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={onSubmit}>
      <DialogTitle>
        Send {formattedTokenName}
        {token.symbol ? ` (${token.symbol})` : null}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Recipient Address"
          fullWidth
          variant="outlined"
          margin="normal"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value.trim())}
        />
        <TextField
          label="Amount"
          fullWidth
          variant="outlined"
          margin="normal"
          type="number"
          InputProps={{
            endAdornment: token.symbol ? (
              <InputAdornment position="end">{token.symbol}</InputAdornment>
            ) : null,
            inputProps: {
              step: Math.pow(10, -token.decimals),
            },
          }}
          value={transferAmountString}
          onChange={(e) => setTransferAmountString(e.target.value.trim())}
          helperText={`Max: ${amount / BigInt(Math.pow(10, token.decimals))}`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={sending}>
          Send
        </Button>
      </DialogActions>
    </DialogForm>
  )
}
