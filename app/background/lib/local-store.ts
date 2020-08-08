import { checkForError } from "../../core/utils"
import { createLogger } from "../../core/utils"
import { VersionedData } from "../../core/types"
const log = createLogger("sol:store")

export default class LocalStore {
  public isSupported: boolean

  constructor() {
    this.isSupported = !!chrome.storage.local
    if (!this.isSupported) {
      log("Storage local API not available.")
    }
  }

  async get(): Promise<VersionedData | undefined> {
    if (!this.isSupported) {
      return undefined
    }
    const result = await this._get()
    if (!result) {
      return undefined
    }
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined
    } else {
      return result
    }
  }

  async set(state: VersionedData): Promise<void> {
    return this._set(state)
  }

  _get(): Promise<VersionedData | undefined> {
    const local = chrome.storage.local
    return new Promise((resolve, reject) => {
      local.get(null, (/** @type {any} */ result) => {
        const err = checkForError()
        if (err) {
          reject(err)
        } else {
          resolve(result as VersionedData)
        }
      })
    })
  }

  _set(obj: VersionedData): Promise<void> {
    const local = chrome.storage.local
    return new Promise((resolve, reject) => {
      local.set(obj, () => {
        const err = checkForError()
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

function isEmpty(obj: VersionedData) {
  return Object.keys(obj).length === 0
}
