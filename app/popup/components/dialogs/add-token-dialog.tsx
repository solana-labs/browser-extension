import React, { useState } from "react"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import { DialogForm } from "./dialog-form"
import { useAsyncData } from "../../utils/fetch-loop"
import { useSendTransaction } from "../../utils/notifications"
import { DialogProps } from "@material-ui/core"

const feeFormat = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
})

export type Props = Omit<DialogProps, "onClose"> & {
  onClose: () => void
}

export const AddTokenDialog: React.FC<Props> = ({ open, onClose, children, ...rest }) => {
  // @ts-ignore FIXME wallet can potentially be null, we need to deal with it!
  let [tokenAccountCost] = useAsyncData(wallet.tokenAccountCost, "tokenAccountCost")

  let [mintAddress, setMintAddress] = useState("")
  let [tokenName, setTokenName] = useState("")
  let [tokenSymbol, setTokenSymbol] = useState("")
  let [sendTransaction, sending] = useSendTransaction()

  function onSubmit() {
    // let mint = new PublicKey(mintAddress)
    // sendTransaction(wallet!.createTokenAccount(mint), {
    //   onSuccess: () => {
    //     updateTokenName(mint, tokenName, tokenSymbol)
    //     refreshWalletPublicKeys(wallet!)
    //     onClose()
    //   },
    // })
  }

  return (
    <DialogForm open={open} onClose={onClose} onSubmit={onSubmit} {...rest}>
      <DialogTitle>Add Token</DialogTitle>
      <DialogContent>
        {/*{tokenAccountCost ? (*/}
        {/*  <DialogContentText>*/}
        {/*    Add a token to your wallet. This will cost{" "}*/}
        {/*    {feeFormat.format(tokenAccountCost / LAMPORTS_PER_SOL)} Solana.*/}
        {/*  </DialogContentText>*/}
        {/*) : (*/}
        {/*  <LoadingIndicator />*/}
        {/*)}*/}
        <TextField
          label="Token Mint Address"
          fullWidth
          variant="outlined"
          margin="normal"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />
        <TextField
          label="Token Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <TextField
          label="Token Symbol"
          fullWidth
          variant="outlined"
          margin="normal"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" disabled={sending}>
          Add
        </Button>
      </DialogActions>
    </DialogForm>
  )
}
