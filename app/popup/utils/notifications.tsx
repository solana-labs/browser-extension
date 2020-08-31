import React, { useState } from "react"
import { useConnection } from "../context/connection"
import { useSolanaExplorerUrlSuffix } from "../hooks"
import Button from "@material-ui/core/Button"
import { TransactionSignature } from "@solana/web3.js"
import { OptionsObject, useSnackbar } from "notistack"

interface SendTransactionOpts {
  onSuccess?: (signature: TransactionSignature) => void
  onError?: (err: Error) => void
}

export type SendTransaction = (
  signaturePromise: Promise<TransactionSignature>,
  callbacks?: SendTransactionOpts
) => Promise<void>

export const useSendTransaction = (): [SendTransaction, boolean] => {
  const { connection } = useConnection()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [sending, setSending] = useState(false)

  async function sendTransaction(
    signaturePromise: Promise<TransactionSignature>,
    opts: SendTransactionOpts = {}
  ) {
    const { onSuccess, onError } = opts
    let id = enqueueSnackbar("Sending transaction...", {
      variant: "info",
      persist: true,
    })
    setSending(true)
    try {
      const signature = await signaturePromise
      closeSnackbar(id)
      id = enqueueSnackbar("Confirming transaction...", {
        variant: "info",
        persist: true,
        action: <ViewTransactionOnExplorerButton signature={signature} />,
      })

      await connection.confirmTransaction(signature, 1)
      closeSnackbar(id)
      setSending(false)
      enqueueSnackbar("Transaction confirmed", {
        variant: "success",
        autoHideDuration: 15000,
        action: <ViewTransactionOnExplorerButton signature={signature} />,
      })
      if (onSuccess) {
        onSuccess(signature)
      }
    } catch (e) {
      closeSnackbar(id)
      setSending(false)
      console.warn(e.message)
      enqueueSnackbar(e.message, { variant: "error" })
      if (onError) {
        onError(e)
      }
    }
  }

  return [sendTransaction, sending]
}

const ViewTransactionOnExplorerButton = (opts: { signature: TransactionSignature }) => {
  const { signature } = opts
  const urlSuffix = useSolanaExplorerUrlSuffix()
  return (
    <Button
      color="inherit"
      component="a"
      target="_blank"
      rel="noopener"
      href={`https://explorer.solana.com/tx/${signature}` + urlSuffix}
    >
      View on Solana Explorer
    </Button>
  )
}

interface notifOptions {
  message?: string
  variant?: OptionsObject["variant"]
}

interface errorNotifOptions extends notifOptions {
  errorMapper?: (error: unknown) => string
}

interface callAsyncOpts<T> {
  progress?: notifOptions
  success?: notifOptions
  error?: errorNotifOptions
  onSuccess?: (result: T) => void
  onError?: (err: any) => void
  onFinish?: () => void
}

export function useCallAsync<T>() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  return async function callAsync<T>(promise: Promise<T>, opts: callAsyncOpts<T>) {
    const { progress, success, error, onSuccess, onError, onFinish } = opts
    const id = enqueueSnackbar(progress?.message || "Submitting...", {
      variant: progress?.variant ?? "info",
      persist: true,
    })
    try {
      let result = await promise
      closeSnackbar(id)
      if (success?.message) {
        enqueueSnackbar(success.message, { variant: success.variant ?? "success" })
      }

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (e) {
      closeSnackbar(id)

      let message: string = e.message || (e != null ? e.toString() : "Unknown error")
      if (error?.message) {
        message = error.message
      } else if (error?.errorMapper) {
        message = error?.errorMapper(e)
      }

      enqueueSnackbar(message, { variant: error?.variant ?? "error" })
      if (onError) {
        onError(e)
      }
    }
    if (onFinish) {
      onFinish()
    }
  }
}
