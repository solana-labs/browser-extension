import { checkForError } from "../../core/utils"

export default class ExtensionPlatform {
  openWindow(options: chrome.windows.CreateData) {
    return new Promise((resolve, reject) => {
      chrome.windows.create(options, (newWindow) => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve(newWindow)
      })
    })
  }

  focusWindow(windowId: number) {
    return new Promise((resolve, reject) => {
      chrome.windows.update(windowId, { focused: true }, () => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })
  }

  getLastFocusedWindow() {
    return new Promise((resolve, reject) => {
      chrome.windows.getLastFocused((windowObject) => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve(windowObject)
      })
    })
  }

  getAllWindows() {
    return new Promise((resolve, reject) => {
      chrome.windows.getAll((windows) => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve(windows)
      })
    })
  }

  updateWindowPosition(windowId: number, left: any, top: any) {
    return new Promise((resolve, reject) => {
      chrome.windows.update(windowId, { left, top }, () => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve()
      })
    })
  }

  getActiveTabs(): Promise<chrome.tabs.Tab[]> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true }, (tabs) => {
        const error = checkForError()
        if (error) {
          return reject(error)
        }
        return resolve(tabs)
      })
    })
  }

  getVersion() {
    return chrome.runtime.getManifest().version
  }
}
