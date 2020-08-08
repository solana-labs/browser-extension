# solana-chrome-extension

## Start dev env

`yarn watch`

## Add extension to Chrome

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./dist`, hit select
- Keep this tab open!
- Pin the extension

## Start Wapp

```bash
cd ./test/wapp
python3 -m http.server
```

```json
{
 entities:

}
```

user needs to submit

- logged into his wallet
- create sub accounts for each table

```
{
  entities: {
    accounts: {
      byProgramId: {
        "
      }
    },
  },
}
```

### Configuring IDE

#### Prettier

This project expects all contributors to have a suitable format on save that uses Prettier
config to run.

Follow the links IDE to fromat on save using Prettier:

- [VSCode](https://prettier.io/docs/en/editors.html#visual-studio-code)
- [WebStorm](https://prettier.io/docs/en/webstorm.html#running-prettier-on-save-using-file-watcher)
- [Emacs](https://prettier.io/docs/en/editors.html#emacs)
- [Vim](https://prettier.io/docs/en/editors.html#vim)
- [Others](https://prettier.io/docs/en/editors.html)

# to help debug

yarn link obj-multiplex
