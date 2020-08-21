const helper = require("./config/helper")
const createRewireWebex = require("./config/rewire-webex")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
  // The Webpack config to use whena compiling your react app for development or production.
  webpack: function (config, env) {
    const rewireWebEx = createRewireWebex({
      manifest: {
        common: helper.resolveApp("manifest/common.json"),
      },
      entry: [
        // the order here is important  the first on is the react app, it will be built with an index.html
        "popup/index.tsx",
        "background/background.ts",
        "content/content.ts",
        "inpage/inpage.ts",
      ],
    })
    config = rewireWebEx.webpack(config, env)
    return config
  },

  devServer: function (craGenerateDevServerConfig) {
    return function (proxy, allowedHost) {
      // Generate the base dev server config via CRA
      const config = craGenerateDevServerConfig(proxy, allowedHost)

      // Enable writing files to the destination so we can easily reload the extension once build is done
      config.writeToDisk = true

      return config
    }
  },

  // The paths config to use when compiling your react app for development or production.
  paths: function (paths, env) {
    paths["appSrc"] = helper.resolveApp("app")
    paths["testsSetup"] = helper.resolveApp("app/popup/setupTests.js")
    paths["proxySetup"] = helper.resolveApp("app/popup/setupProxy.js")
    paths["appPath"] = helper.resolveApp("")
    paths["appPublic"] = helper.resolveApp("app/popup/public")
    paths["appHtml"] = helper.resolveApp("app/popup/public/index.html")
    paths["appIndexJs"] = helper.resolveApp("app/popup/index.tsx")
    paths["appTypeDeclarations"] = helper.resolveApp("app/popup/react-app-env.d.ts")
    return paths
  },
}
