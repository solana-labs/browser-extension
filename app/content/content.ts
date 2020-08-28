import pump from "pump"
import { createLogger, createObjectMultiplex } from "../core/utils"
import { CHROME_CONN_CS, CONTENT_MESSAGE_STREAM, INPAGE_MESSAGE_STREAM, MUX_PROVIDER_SUBSTREAM } from "../core/types"

const log = createLogger("sol:cntPage")
const LocalMessageDuplexStream = require("post-message-stream")
const PortStream = require("extension-port-stream")

if (shouldInjectProvider()) {
  injectScript(chrome.runtime.getURL("static/js/inpage.js")) //"inpage.js")
  start()
}

function injectScript(url: string) {
  try {
    const container = document.head || document.documentElement
    const scriptTag = document.createElement("script")
    scriptTag.setAttribute("src", url)
    scriptTag.setAttribute("async", "false")
    container.insertBefore(scriptTag, container.children[0])
    //container.removeChild(scriptTag)
    log("inject page data")
  } catch (e) {
    log("solana provider injection failed: %s", e)
  }
}

async function start() {
  await setupStreams()
}

/**
 * Sets up two-way communication streams between the
 * browser extension and local per-page browser context.
 *
 */
async function setupStreams() {
  // the transport-specific streams for communication between inpage and background
  const pageStream = new LocalMessageDuplexStream({
    name: CONTENT_MESSAGE_STREAM,
    target: INPAGE_MESSAGE_STREAM
  })
  const extensionPort = chrome.runtime.connect({ name: CHROME_CONN_CS })
  const extensionStream = new PortStream(extensionPort)

  // create and connect channel muxers
  // so we can handle the channels individually
  const pageMux = createObjectMultiplex("cs-inpage-mux")
  pageMux.setMaxListeners(25)
  const extensionMux = createObjectMultiplex("cs-ext-mux")
  extensionMux.setMaxListeners(25)

  pump(pageMux, pageStream, pageMux, (err) =>
    logStreamDisconnectWarning("Solana Inpage Multiplex", err)
  )
  pump(extensionMux, extensionStream, extensionMux, (err) =>
    logStreamDisconnectWarning("Solana Background Multiplex", err)
  )

  // forward communication across inpage-background for these channels only
  forwardTrafficBetweenMuxers(MUX_PROVIDER_SUBSTREAM, pageMux, extensionMux)
}

// /**
//  * Checks the documentElement of the current document
//  *
//  * @returns {boolean} {@code true} - if the documentElement is an html node or if none exists
//  */
// function documentElementCheck() {
//   const documentElement = document.documentElement.nodeName
//   if (documentElement) {
//     return documentElement.toLowerCase() === "html"
//   }
//   return true
// }

function forwardTrafficBetweenMuxers(channelName: any, muxA: any, muxB: any) {
  const channelA = muxA.createStream(channelName)
  const channelB = muxB.createStream(channelName)
  pump(channelA, channelB, channelA, (err: any) => {
    log("solana muxed traffic for channel %s failed: %O", channelName, err)
  })
}

/**
 * Determines if the provider should be injected
 *
 * @returns {boolean} {@code true} - if the provider should be injected
 */
function shouldInjectProvider() {
  return true
  // return doctypeCheck() &&
  //   suffixCheck() &&
  //   documentElementCheck()
}

// /**
//  * Checks the doctype of the current document if it exists
//  *
//  * @returns {boolean} {@code true} - if the doctype is html or if none exists
//  */
// function doctypeCheck() {
//   const doctype = window.document.doctype
//   if (doctype) {
//     return doctype.name === "html"
//   } else {
//     return true
//   }
// }

/**
 * Error handler for page to extension stream disconnections
 *
 * @param {string} remoteLabel - Remote stream name
 * @param {Error} err - Stream connection error
 */
function logStreamDisconnectWarning(remoteLabel: string, err: Error) {
  let warningMsg = `SolanaContentscript - lost connection to ${remoteLabel}`
  if (err) {
    warningMsg += "\n" + err.stack
  }
  console.warn(warningMsg)
}

// /**
//  * Returns whether or not the extension (suffix) of the current document is prohibited
//  *
//  * This checks {@code window.location.pathname} against a set of file extensions
//  * that we should not inject the provider into. This check is indifferent of
//  * query parameters in the location.
//  *
//  * @returns {boolean} - whether or not the extension of the current document is prohibited
//  */
// function suffixCheck() {
//   const prohibitedTypes = [/\.xml$/, /\.pdf$/]
//   const currentUrl = window.location.pathname
//   for (let i = 0; i < prohibitedTypes.length; i++) {
//     if (prohibitedTypes[i].test(currentUrl)) {
//       return false
//     }
//   }
//   return true
// }
