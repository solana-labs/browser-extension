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

export const TOKEN_PROGRAM_ID = new PublicKey("TokenSVp5gheXUvJ6jGWGeCsgPKgnE3YgdGKRVCMY9o")
export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
  signer: PublicKey
  fromPublicKey: PublicKey
  balanceInfo: BalanceInfo
}

export const SendSplDialog: React.FC<Props> = ({
                                                 open,
                                                 onClose,
                                                 signer,
                                                 fromPublicKey,
                                                 balanceInfo
                                               }) => {
  const { request } = useBackground()
  const callAsync = useCallAsync()
  const [destinationAddress, setDestinationAddress] = useState("")
  const [transferAmountString, setTransferAmountString] = useState("")
  const [, sending] = useSendTransaction()

  let { amount: balanceAmount, decimals, mint, tokenName, tokenSymbol } = balanceInfo

  function onSubmit() {
    // let amount = Math.round(parseFloat(transferAmountString) * Math.pow(10, decimals))
    let amount = parseFloat(transferAmountString) * Math.pow(10, 9) //todo: need to get decimal from mint ...
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount")
    }
    callAsync(
      request("popup_sendSplToken", {
        transfer: {
          fromPubkey: fromPublicKey.toBase58(),
          toPubkey: destinationAddress,
          amount: amount,
          signer: signer.toBase58()
        }
      }),
      {
        progress: { message: "Transferring..." },
        success: { message: "Success!" },
        onFinish: () => {
          onClose()
        }
      }
    )
  }

  // FIXME: Was using `balanceFormat` before, need to convert it so its support BigInt!
  let formattedTokenName = "Unkown"
  if (tokenName) {
    formattedTokenName = tokenName
  } else if (mint != null) {
    formattedTokenName = formatAddress(mint)
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={onSubmit}>
      <DialogTitle>
        Send {formattedTokenName}
        {tokenSymbol ? ` (${tokenSymbol})` : null}
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
            endAdornment: tokenSymbol ? (
              <InputAdornment position="end">{tokenSymbol}</InputAdornment>
            ) : null,
            inputProps: {
              step: Math.pow(10, -decimals)
            }
          }}
          value={transferAmountString}
          onChange={(e) => setTransferAmountString(e.target.value.trim())}
          helperText={`Max: ${balanceAmount / BigInt(Math.pow(10, decimals))}`}
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
