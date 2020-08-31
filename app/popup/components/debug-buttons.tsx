import React from "react"
import Button from "@material-ui/core/Button"
import { useCallAsync } from "../utils/notifications"
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { sleep } from "../utils/utils"
import { refreshAccountInfo } from "../hooks"
import { useConnection } from "../context/connection"
import { useBackground } from "../context/background"

export const DebugButtons: React.FC = () => {
  // @ts-ignore FIXME wallet can potentially be null, we need to deal with it!
  const { popupState } = useBackground()
  const { connection } = useConnection()
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
      success: {
        message:
          "Success! Please wait up to 30 seconds for the SOL tokens to appear in your wallet."
      }
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <Button variant="contained" color="primary" onClick={requestAirdrop}>
        Request Airdrop
      </Button>
    </div>
  )
}
