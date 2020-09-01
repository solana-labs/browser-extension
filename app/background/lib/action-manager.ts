import {
  Action,
  ActionKey,
  EVENT_UPDATE_ACTIONS,
  EVENT_UPDATE_BADGE,
  OrderedAction,
} from "../../core/types"
import { createLogger } from "../../core/utils"
import { v4 as uuidv4 } from "uuid"
import * as events from "events"

const log = createLogger("sol:bg:actMng")

export class ActionManager extends events.EventEmitter {
  private actions: Map<string, Action>

  constructor() {
    super()
    this.actions = new Map<string, Action>()
  }

  getAction = <T extends Action>(key: ActionKey): T | undefined => {
    log("Getting action for key %O", key)
    return this.actions.get(JSON.stringify(key)) as T
  }

  addAction = (origin: string, tabId: string, action: Action) => {
    const key = {
      tabId: tabId,
      origin: origin,
      uuid: uuidv4(),
    }
    log("Adding action '%s' with key %o", action.type, origin, tabId, action.type, key)
    this.actions.set(JSON.stringify(key), action)
    this.emit(EVENT_UPDATE_BADGE)
    this.emit(EVENT_UPDATE_ACTIONS)
  }

  getCount = (): number => {
    return this.actions.size
  }

  getOrderedActions = (): OrderedAction[] => {
    const out: OrderedAction[] = []
    this.actions.forEach((action, key) => {
      out.push({ key: JSON.parse(key) as ActionKey, action })
    })
    return out
  }

  deleteAction = (key: ActionKey) => {
    log("Deleting action for key %O, current count: %s", key, this.actions.size)
    this.actions.delete(JSON.stringify(key))
    this.emit(EVENT_UPDATE_BADGE)
    this.emit(EVENT_UPDATE_ACTIONS)
  }

  getActionsWithOriginAndType = <T extends Action>(
    origin: string,
    type: string
  ): Map<ActionKey, T> => {
    log("Getting actions with origin %s and type %s", origin, type)
    const out = new Map<ActionKey, T>()
    this.actions.forEach((action, keyStr) => {
      const key = JSON.parse(keyStr) as ActionKey
      if (action.type === type && key.origin === origin) {
        out.set(key, action as T)
      }
    })
    return out
  }

  deleteActionWithOriginAndTabId = (origin: string, tabId: string) => {
    log("Deleting actions with origin %s and tabId %s", origin, tabId)
    Array.from(this.actions.keys()).forEach((keyStr) => {
      const key = JSON.parse(keyStr) as ActionKey
      if (key.origin === origin && key.tabId === tabId) {
        this.actions.delete(keyStr)
      }
    })
  }
}
