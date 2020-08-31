import ExtensionPlatform from "./extension"
import { createLogger } from "../../core/utils"

const log = createLogger("sol:ext")

const NOTIFICATION_HEIGHT = 600
const NOTIFICATION_WIDTH = 470

export class ExtensionManager {
  private platform: any
  private _notificationId: any

  constructor() {
    this.platform = new ExtensionPlatform()
  }

  // async closePopup() {
  //   const popup = await this._()
  //   log("closing popup: %O", popup)
  //
  //   if (popup) {
  //     await this.platform.closeWindow(popup.id)
  //     log("popup closed")
  //   }
  // }

  async showNotification(notifyWindow: () => void) {
    const notification = await this._getNotification()
    if (notification) {
      // bring focus to existing chrome notification window
      await this.platform.focusWindow(notification.id)
      notifyWindow()
    } else {
      let left = 0
      let top = 0
      try {
        const lastFocused = await this.platform.getLastFocusedWindow()
        // Position window in top right corner of lastFocused window.
        top = lastFocused.top
        left = lastFocused.left + (lastFocused.width - NOTIFICATION_WIDTH)
      } catch (_) {
        // The following properties are more than likely 0, due to being
        // opened from the background chrome process for the extension that
        // has no physical dimensions
        const { screenX, screenY, outerWidth } = window
        top = Math.max(screenY, 0)
        left = Math.max(screenX + (outerWidth - NOTIFICATION_WIDTH), 0)
      }
      // create new notification window
      const notificationWindow = await this.platform.openWindow({
        url: "index.html#notification",
        type: "popup",
        width: NOTIFICATION_WIDTH,
        height: NOTIFICATION_HEIGHT,
        left,
        top,
      })

      log("Shown notification, storing notification window  id %s", notificationWindow.id)
      this._notificationId = notificationWindow.id
    }
  }

  async _getNotification() {
    const windows = await this.platform.getAllWindows()
    return this._getNotificationIn(windows)
  }

  _getNotificationIn(windows: chrome.windows.Window[]) {
    if (!this._notificationId) {
      return null
    }
    return windows
      ? windows.find((win) => {
          return win && win.type === "popup" && win.id === this._notificationId
        })
      : null
  }
}
