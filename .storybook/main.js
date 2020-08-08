const { addDecorator } = require("@storybook/react")
const { withThemesProvider } = require("storybook-addon-emotion-theme")
const path = require("path")
const { theme } = require("../app/popup/theme")

addDecorator(withThemesProvider([theme]))

module.exports = {
  stories: ["../app/popup/stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links", "@storybook/addon-storysource"],
  webpackFinal: async (config) => {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [typescriptLoader(), reactDocgenFromTypescriptLoader()],
    })
    config.resolve.extensions.push(".ts", ".tsx")

    return config
  },
}

function typescriptLoader() {
  return {
    loader: require.resolve("ts-loader"),
    options: {
      configFile: tsconfigPath(),
    },
  }
}

function reactDocgenFromTypescriptLoader() {
  return { loader: require.resolve("react-docgen-typescript-loader") }
}

function tsconfigPath() {
  return path.join(__dirname, "tsconfig.json")
}
