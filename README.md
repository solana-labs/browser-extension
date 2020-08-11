# browser-extension

## Build extension

`yarn build`

## Add extension to Chrome

- Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked"
- Browse to this project `./build`, hit select

## Run test web app

```bash
cd ./test/wapp
python3 -m http.server
```

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
- Add a Local Storage entry: Key:debug, Value:*

## Disable JS minification

`config.optimization.minimize = false` in `rewire-webex.js`