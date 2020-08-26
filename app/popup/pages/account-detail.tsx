import React, { useEffect, useState } from "react"
import { useAccountInfo, useBalanceInfo, useSolanaExplorerUrlSuffix } from "../hooks"
import Paper from "@material-ui/core/Paper"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { Buffer } from "buffer"
import { Button, Typography } from "@material-ui/core"
import { withLayout } from "../components/layout"
import { useParams } from "react-router"
import { Attachment, Send, ArrowBackIos } from "@material-ui/icons"
import CopyToClipboard from "react-copy-to-clipboard"
import { SendSolDialog } from "../components/dialogs/send-sol-dialog"
import { SendSplDialog } from "../components/dialogs/send-spl-dialog"
import { useHistory } from "react-router-dom"
import { Paths } from "../components/routes/paths"
import { TokenBalance } from "../components/token-balance"
import Link from "@material-ui/core/Link"
import { BalanceInfo } from "../types"

export const AccountDetailBase: React.FC = () => {
  let { accountAddress, signerAddress } = useParams()
  const [balanceInfo, setBalanceInfo] = useState<BalanceInfo | null>(null)
  const publicKey = new PublicKey(accountAddress)
  const signerKey = new PublicKey(signerAddress)

  const [accountInfo, externalAccountInfoLoaded] = useAccountInfo(publicKey)
  const urlSuffix = useSolanaExplorerUrlSuffix()
  const history = useHistory()

  const bi = useBalanceInfo(publicKey, accountInfo)
  if (!balanceInfo && bi) {
    setBalanceInfo(bi)
  }

  return (
    <Paper>
      <Typography>address: {accountAddress}</Typography>
      {accountInfo && <TokenBalance publicKey={publicKey} balanceInfo={balanceInfo} />}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIos />}
        onClick={() => {
          history.push(Paths.accounts)
        }}
      >
        Go Back
      </Button>

      <div>
        <CopyToClipboard text={accountAddress}>
          <Button variant="outlined" color="primary" startIcon={<Attachment />}>
            Copy Addr
          </Button>
        </CopyToClipboard>
        <Link
          component="button"
          href={`https://explorer.solana.com/account/${publicKey.toBase58()}` + urlSuffix}
          target="_blank"
          rel="noopener"
        >
          Solana Explorer
        </Link>
      </div>
    </Paper>
  )
}

interface AccountInfoCompProp {
  publicKey: PublicKey
  signerKey: PublicKey
  accountInfo: AccountInfo<Buffer>
}

const BalanceInfoComp: React.FC<AccountInfoCompProp> = ({ publicKey, signerKey, accountInfo }) => {
  const balanceInfo = useBalanceInfo(publicKey, accountInfo)
  const [sendDialogOpen, setSendDialogOpen] = useState(false)

  return (
    <Paper>
      <Typography>balance: {balanceInfo?.amount.toString()}</Typography>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Send />}
        onClick={() => setSendDialogOpen(true)}
      >
        Send
      </Button>

      {balanceInfo && signerKey == publicKey && (
        <SendSolDialog
          open={sendDialogOpen}
          onClose={() => setSendDialogOpen(false)}
          balanceInfo={balanceInfo}
          fromPublicKey={publicKey}
        />
      )}
      {balanceInfo && signerKey != publicKey && (
        <SendSplDialog
          open={sendDialogOpen}
          onClose={() => setSendDialogOpen(false)}
          balanceInfo={balanceInfo}
          fromPublicKey={publicKey}
          signer={signerKey}
        />
      )}
    </Paper>
  )
}

export const AccountDetail = withLayout(AccountDetailBase)
