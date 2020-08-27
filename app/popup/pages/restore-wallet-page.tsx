import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { mnemonicToSeed } from "../utils/wallet-seed"
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import { useCallAsync } from "../utils/notifications"
import { useBackground } from "../context/background"
import { withLayout } from "../components/layout"


const RestoreWalletPageBase: React.FC = () => {
  const history = useHistory()

  const handBackButton = () => {
    history.goBack()
  }
  return (
    <Container maxWidth="sm">
      <RestoreWalletForm goBack={handBackButton} />
    </Container>
  )
}

interface RestoreWalletFormProps {
  goBack: () => void
}

const RestoreWalletForm: React.FC<RestoreWalletFormProps> = ({ goBack }) => {
  const { request } = useBackground()
  const [mnemonic, setMnemonic] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const callAsync = useCallAsync()

  function submit() {
    callAsync(
      mnemonicToSeed(mnemonic).then((seed) => {
        return request("popup_createWallet", { mnemonic, seed, password })
      }),
      {}
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Restore Existing Wallet
        </Typography>
        <Typography>
          Restore your wallet using your twelve seed words. Note that this will delete any existing
          wallet on this device.
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Seed Words"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="New Password (Optional)"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button onClick={goBack}>Cancel</Button>
        <Button color="primary" disabled={password !== passwordConfirm} onClick={submit}>
          Restore
        </Button>
      </CardActions>
    </Card>
  )
}

export const RestoreWalletPage = withLayout(RestoreWalletPageBase)
