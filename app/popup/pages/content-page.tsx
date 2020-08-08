import React, { useState } from "react"
import { LoginPage } from "./login-page"
import { WalletPage } from "./wallet-page"
import { useBackground } from "../context/background"
import { RestoreWalletPage } from "./restore-wallet-page"
import { CreateWalletPage } from "./create-wallet-page"
import { LoadingIndicator } from "../components/loading-indicator"
import { createLogger } from "../../core/utils"

const log = createLogger("sol:contentPage")

export const ContentPage: React.FC = () => {
  const [showRestore, setShowRestore] = useState(false)
  const { popupState } = useBackground()

  log(
    "rendering content page with wallet state: %s with displaying account %s",
    popupState?.walletState,
    popupState?.selectedAccount
  )

  if (!popupState) {
    return <LoadingIndicator />
  }

  switch (popupState.walletState) {
    case "locked":
      if (showRestore) {
        return <RestoreWalletPage goBack={() => setShowRestore(false)} />
      } else {
        return <LoginPage goToRestore={() => setShowRestore(true)} />
      }
    case "uninitialized":
      if (showRestore) {
        return <RestoreWalletPage goBack={() => setShowRestore(false)} />
      } else {
        return <CreateWalletPage goToRestore={() => setShowRestore(true)} />
      }
    case "unlocked":
      return <WalletPage account={popupState?.selectedAccount} />
  }
}
