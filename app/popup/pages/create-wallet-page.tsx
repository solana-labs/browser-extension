import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { generateMnemonicAndSeed } from "../utils/wallet-seed"
import Container from "@material-ui/core/Container"
import { LoadingIndicator } from "../components/loading-indicator"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import { useCallAsync } from "../utils/notifications"
import Link from "@material-ui/core/Link"
import { MnemonicAndSeed } from "../types"
import { useBackground } from "../context/background"
import { withLayout } from "../components/layout"
import { Links } from "../components/routes/paths"

const CreateWalletPageBase: React.FC = () => {
  const history = useHistory()
  const handleRestoreClick = () => {
    history.push(Links.restore())
  }

  return (
    <Container maxWidth="sm">
      <>
        <CreateWalletForm />
        <br />
        <Link style={{ cursor: "pointer" }} onClick={handleRestoreClick}>
          Restore existing wallet
        </Link>
      </>
    </Container>
  )
}

const CreateWalletForm: React.FC = () => {
  const { request } = useBackground()
  const [mnemonicAndSeed, setMnemonicAndSeed] = useState<MnemonicAndSeed>()
  const [savedWords, setSavedWords] = useState(false)
  const callAsync = useCallAsync()

  // promise: Promise<T>

  useEffect(() => {
    generateMnemonicAndSeed().then(setMnemonicAndSeed)
  }, [])

  function submit(password: string) {
    if (!mnemonicAndSeed) {
      return null
    }

    const { mnemonic, seed } = mnemonicAndSeed
    callAsync(request("popup_createWallet", { mnemonic, seed, password }), {
      progress: { message: "Creating wallet..." },
      success: { message: "Wallet created" },
    })
  }

  if (!savedWords) {
    if (!mnemonicAndSeed) {
      return null
    }

    return <SeedWordsForm mnemonicAndSeed={mnemonicAndSeed} goForward={() => setSavedWords(true)} />
  }

  return <ChoosePasswordForm goBack={() => setSavedWords(false)} onSubmit={submit} />
}

interface SeedWordsFormProps {
  goForward: () => void
  mnemonicAndSeed: MnemonicAndSeed
}

const SeedWordsForm: React.FC<SeedWordsFormProps> = ({ mnemonicAndSeed, goForward }) => {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create New Wallet
        </Typography>
        <Typography paragraph>Create a new wallet to hold Solana and SPL tokens.</Typography>
        <Typography>
          Please write down the following twelve words and keep them in a safe place:
        </Typography>
        {mnemonicAndSeed ? (
          <TextField
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            value={mnemonicAndSeed.mnemonic}
            label="Seed Words"
            onFocus={(e) => e.currentTarget.select()}
          />
        ) : (
          <LoadingIndicator />
        )}
        <Typography paragraph>
          Your private keys are only stored on your current computer or device. You will need these
          words to restore your wallet if your device is damaged or lost.
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmed}
              disabled={!mnemonicAndSeed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
          }
          label="I have saved these words in a safe place."
        />
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button color="primary" disabled={!confirmed} onClick={goForward}>
          Continue
        </Button>
      </CardActions>
    </Card>
  )
}

interface ChoosePasswordFormProps {
  goBack: () => void
  onSubmit: (password: string) => void
}

const ChoosePasswordForm: React.FC<ChoosePasswordFormProps> = ({ goBack, onSubmit }) => {
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Choose a Password (Optional)
        </Typography>
        <Typography>Optionally pick a password to protect your wallet.</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          label="New Password"
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
        <Typography>
          If you forget your password you will need to restore your wallet using your seed words.
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button onClick={goBack}>Back</Button>
        <Button
          color="primary"
          disabled={password !== passwordConfirm}
          onClick={() => onSubmit(password)}
        >
          Create Wallet
        </Button>
      </CardActions>
    </Card>
  )
}

export const CreateWalletPage = withLayout(CreateWalletPageBase)
