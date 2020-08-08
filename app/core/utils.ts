import {
  ENVIRONMENT_TYPE_BACKGROUND,
  ENVIRONMENT_TYPE_NOTIFICATION,
  ENVIRONMENT_TYPE_POPUP,
} from "./types"
import { memoize } from "lodash"
const debug = require("debug")
const ObjectMultiplex = require("obj-multiplex")

export const createLogger = (module: string): any => {
  return debug(module)
}

export const createObjectMultiplex = (name: string): any => {
  return new ObjectMultiplex(name)
  // return (new ObjectMultiplex())
}

export const isInternalProcess = (processName: string): boolean => {
  return processName == ENVIRONMENT_TYPE_POPUP || processName == ENVIRONMENT_TYPE_POPUP
}
// `popup` refers to the extension opened through the browser app icon (in top right corner in chrome)
// `notification` refers to the popup that appears in its own window when taking action outside of solana
export const getEnvironmentType = (url = window.location.href) => getEnvironmentTypeMemo(url)

const getEnvironmentTypeMemo = memoize((url) => {
  const parsedUrl = new URL(url)
  if (parsedUrl.pathname === "/popup.html") {
    return ENVIRONMENT_TYPE_POPUP
  } else if (parsedUrl.pathname === "/notification.html") {
    return ENVIRONMENT_TYPE_NOTIFICATION
  } else {
    return ENVIRONMENT_TYPE_BACKGROUND
  }
})

export const checkForError = () => {
  const lastError = chrome.runtime.lastError
  if (!lastError) {
    return
  }
  // if it quacks like an Error, its an Error
  if (lastError.message) {
    return lastError
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message)
}
