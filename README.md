# Solana Wallet - Browser Extension

## Development

```
yarn install
yarn start
```

**Note** You can safely discard the browser page opening on `localhost:3000` (we tried to disable it but did not succeed yet)

In this mode, each time you save a file, development server will re-compile the files and you can
simply reload to see the changes (no need to unload).

For background page, from the `Inspect` view, simply hit reload shortcut (`⌘-R` on Apple, or `Ctrl-R`). For the popup,
either close it and re-open or from `Inspect` view, hit reload shortcut (same as above).

### Add extension to Chrome

**Important** Unload any previously loaded Solana Wallet extension, only one extension can be loaded at one time.

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./dist`, hit select

### Open Extensions Pages (Chrome only)

You can open background and popup page (in full view) using simply:

```
./bin/open_ext.sh <extension_id>
```

Where `<extension_id>` is the value reported by Chrome Extension manager for you loaded unpacked extension.
To ease your life, you can also define `SOLANA_EXTENSION_ID` as an enviornment variable and it will be use as
the default value for `<extension_id>` parameter, so you can do `./bin/open_ext.sh`.

## Production

```
yarn install
yarn build
```

### Add extension to Chrome

**Important** Unload any previously loaded Solana Wallet extension, only one extension can be loaded at one time.

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./build`, hit select

## Configuring IDE

### Prettier

This project expects all contributors to have a suitable format on save that uses Prettier
config to run.

Follow the links IDE to fromat on save using Prettier:

- [VSCode](https://prettier.io/docs/en/editors.html#visual-studio-code)
- [WebStorm](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher)
- [Emacs](https://prettier.io/docs/en/editors.html#emacs)
- [Vim](https://prettier.io/docs/en/editors.html#vim)
- [Others](https://prettier.io/docs/en/editors.html)

## Enable debug

- Open chrome dev tools (background, popup or content-script)
- Go to Application
- Add a Local Storage entry: Key:debug, Value:\*

## Disable JS minification

`config.optimization.minimize = false` in `rewire-webex.js`

## Usage

```ts
// @ts-ignore
import bs58 from "bs58"
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js"

type WalletState = {
  state: "locked" | "unlocked" | "uninitialized"
}

type Cluster = {
  title: string
  endpoint: string
  cluster: string
}

window.addEventListener("solana#initialized", function (event) {
  // @ts-ignore
  solana = window.solana
  solana.on("stateChanged", async (state: WalletState) => {
    if (state.state === "unlocked") {
      const { cluster } = await solana.request({ method: "wallet_getCluster", params: {} })
      const connection = new Connection(cluster.endpoint)

      await sendTransaction(connection)
    }
  })
})

async function sendTransaction(connection: Connection) {
  let { accountResult } = await solana.request({ method: "wallet_requestAccounts", params: {} })
  const accounts = accountResult.accounts as string[]

  const transaction = SystemProgram.transfer({
    fromPubkey: new PublicKey(accounts[0]),
    toPubkey: new PublicKey(accounts[0]),
    lamports: 2 * LAMPORTS_PER_SOL,
  })

  const { blockhash } = await connection.getRecentBlockhash()
  transaction.recentBlockhash = blockhash

  const message = bs58.encode(transaction.serializeMessage())
  const { result } = await solana.request({
    method: "wallet_signTransaction",
    params: { message: message, signer: accounts },
  })

  result.signatureResults.forEach((signatureResult: any) => {
    transaction.addSignature(
      new PublicKey(signatureResult.publicKey),
      bs58.decode(signatureResult.signature)
    )
  })

  let transactionID = await connection.sendRawTransaction(transaction.serialize())
  await connection.confirmTransaction(transactionID)
}
```

First you need to add a window event listener for the event `solana#initialized`. That event will be triggered when the solana extension is done injecting the `solana` client into the `window` object.

```ts
window.addEventListener("solana#initialized", function (event) {
  solana = window.solana
})
```

Once you got access to the solana client, you should fetch the extension state using `wallet_getState` request.

```ts
const { result } = await solana.request({ method: "wallet_getState", params: {} })
if (result.state === "unlocked") {
  // you are now granted to access user accounts
}
```

When your web application granted with the permission to access users account you can retrieve them using the `wallet_requestAccounts` request.

```ts
let { accountResult } = await solana.request({ method: "wallet_requestAccounts", params: {} })
const accounts = accountResult.accounts as string[]
```

Use the `wallet_getCluster` request to get the cluster selected by users and set your solana web3 connection accordenly

```ts
const { cluster } = await solana.request({ method: "wallet_getCluster", params: {} })
```

`wallet_signTransaction` request is used to sign transaction messages by a list of signer account keys. Signatures need to be added to the transaction from which the message was serialized before being sent as raw using solana web3 connection.

```ts
const message = bs58.encode(transaction.serializeMessage())
const { result } = await solana.request({
  method: "wallet_signTransaction",
  params: { message: message, signer: accounts },
})

result.signatureResults.forEach((signatureResult: any) => {
  transaction.addSignature(
    new PublicKey(signatureResult.publicKey),
    bs58.decode(signatureResult.signature)
  )
})
```

**_Handling events from extension_**

`stateChanged` event is triggered when extension state change (`uninitialized` | `locked` | `unlocked`). Only when state is `unlocked` then your web application will be able to access the accounts of the user and sign transactions. The state will change to `unlocked` once the user unlocks is wallet and grant your web application access to is accounts.

```ts
solana.on("stateChanged", async (state: WalletState) => {
  if (state.state === "unlocked") {
    // you are now granted to access user accounts
  }
})
```

The `clusterChanged` event will happen when cluster configuration is changed by the user in the extension. That’s when you should reset your solana web3 connection.

```ts
solana.on("clusterChanged", (cluster: Cluster) => {
  connection = new Connection(cluster.endpoint)
})
```

The `accountsChanged` event is triggered when users add or remove accounts from their wallets from the extension. You will then receive an up-to-date list of account public keys encoded in base58

```ts
solana.on("accountsChanged", (updatedAccounts: string[]) => {
  accounts = updatedAccounts
})
```
