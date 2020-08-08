const HtmlWebpackPlugin = require("html-webpack-plugin")
const paths = require("react-scripts/config/paths")
const ManifestPlugin = require("webpack-manifest-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin")

const appPackageJson = require(paths.appPackageJson)

function capitalize(str) {
  return str ? str[0].toUpperCase() + str.substr(1, str.length) : ""
}

const defaultMinify = {
  removeComments: true,
  collapseWhitespace: false,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}

const replacePlugin = (plugins, nameMatcher, newPlugin) => {
  const pluginIndex = plugins.findIndex((plugin) => {
    return plugin.constructor && plugin.constructor.name && nameMatcher(plugin.constructor.name)
  })

  if (-1 === pluginIndex) {
    return plugins
  }

  const nextPlugins = plugins
    .slice(0, pluginIndex)
    .concat(newPlugin)
    .concat(plugins.slice(pluginIndex + 1))

  return nextPlugins
}

function createWebexRewire(params) {
  if (!params.manifest || !params.manifest.common || !params.entry || !params.entry.length) return // todo: checkme!

  const entries = [].concat(params.entry)

  const bundles = entries.map((entry) => {
    const ext = entry.split(".").pop()
    let cleanEntry = entry.replace("." + ext, "")
    cleanEntry = cleanEntry.split("/")[0]
    return cleanEntry
  })

  bundles.forEach((bundle, idx) => {
    paths[`app${capitalize(bundle)}Js`] = `${paths.appSrc}/${entries[idx]}`
  })

  function getHtmlPlugin(bundle, isProd) {
    const opts = Object.assign(
      {
        inject: true,
        template: paths.appHtml,
        chunks: [bundle],
      },
      isProd ? { minify: Object.assign(defaultMinify, params.minify) } : {}
    )

    return new HtmlWebpackPlugin(opts)
  }

  function getManifestPlugin(bundle, isProd) {
    const opts = {
      fileName: "asset-manifest.json",
      publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = {}
        Object.keys(entrypoints).forEach((entrypoint) => {
          entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(
            (fileName) => !fileName.endsWith(".map")
          )
        })
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }
    return new ManifestPlugin(opts)
  }

  function getMiniCssExtractPlugin() {
    const opts = {
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].css",
    }
    return new MiniCssExtractPlugin(opts)
  }

  function getWebpackExtensionManifestPlugin() {
    // loading common manifest
    const commonManifest = require(params.manifest.common)
    const opts = {
      config: {
        base: commonManifest,
        extend: { version: appPackageJson.version },
      },
    }
    return new WebpackExtensionManifestPlugin(opts)
  }

  return {
    webpack: (config, env) => {
      const isProd = env !== "development"

      // modify the entry points
      let i = 0
      config.entry = bundles.reduce((acc, bundle) => {
        acc[bundle] = [].concat(
          isProd ? [] : i == 0 ? "react-hot-loader/patch" : [],
          paths[`app${capitalize(bundle)}Js`]
        )
        i += 1
        return acc
      }, {})

      config.output.filename = "static/js/[name].js"
      // we do not want any chunking when it comes to web extensions
      delete config.optimization.runtimeChunk
      delete config.optimization.splitChunks

      // initial HtmlWebpackPlugin for `index.html`
      config.plugins = replacePlugin(
        config.plugins,
        (name) => /HtmlWebpackPlugin/i.test(name),
        getHtmlPlugin(bundles[0], isProd)
      )

      // if production lets override CSS files name chunking
      if (isProd) {
        config.plugins = replacePlugin(
          config.plugins,
          (name) => /MiniCssExtractPlugin/i.test(name),
          getMiniCssExtractPlugin()
        )
      }

      // override the default function in manifest plugin
      config.plugins = replacePlugin(
        config.plugins,
        (name) => /ManifestPlugin/i.test(name),
        getManifestPlugin(bundles[0], isProd)
      )

      // add web extention manifest plugin
      config.plugins = [...config.plugins, getWebpackExtensionManifestPlugin()]

      return config
    },
  }
}

module.exports = createWebexRewire
