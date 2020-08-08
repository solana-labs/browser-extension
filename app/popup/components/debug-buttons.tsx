import React from "react"
import Button from "@material-ui/core/Button"
import { useCallAsync, useSendTransaction } from "../utils/notifications"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { sleep } from "../utils/utils"
import { refreshAccountInfo } from "../hooks"
import { useConnection } from "../context/connection"
import { useBackground } from "../context/background"

export const DebugButtons: React.FC = () => {
  // @ts-ignore FIXME wallet can potentially be null, we need to deal with it!
  const { popupState } = useBackground()
  const { connection } = useConnection()
  const [sendTransaction, sending] = useSendTransaction()
  const callAsync = useCallAsync()
  const publicKey = new PublicKey(popupState?.selectedAccount || "")

  function requestAirdrop() {
    callAsync(connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL), {
      onSuccess: async () => {
        await sleep(5000)
        refreshAccountInfo(connection, publicKey)
      },
      onError: () => {
        window.alert("HANDLE ME, THIS IS UGLY SO IT GOES NOTICED!")
      },
      successMessage:
        "Success! Please wait up to 30 seconds for the SOL tokens to appear in your wallet.",
    })
  }

  function mintTestToken() {
    // let mint = new Account()
    // updateTokenName(
    //   mint.publicKey,
    //   `Test Token ${abbreviateAddress(mint.publicKey)}`,
    //   `TEST${mint.publicKey.toBase58().slice(0, 2)}`
    // )
    // sendTransaction(
    //   createAndInitializeMint(
    //     connection,
    //     publicKey,
    //     mint,
    //     1000,
    //     2,
    //     new Account(),
    //     connection
    //   )
    // )
  }

  return (
    <div style={{ display: "flex" }}>
      <Button variant="contained" color="primary" onClick={requestAirdrop}>
        Request Airdrop
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={mintTestToken}
        disabled={sending}
        style={{ marginLeft: 24 }}
      >
        Mint Test Token
      </Button>
    </div>
  )
}
