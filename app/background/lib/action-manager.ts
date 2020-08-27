import { Action, ActionKey, OrderedAction } from "../../core/types"
import { createLogger } from "../../core/utils"
import { v4 as uuidv4 } from "uuid"

const log = createLogger("sol:bg:actMng")

export class ActionManager {
  private actions: Map<ActionKey, Action>

  constructor() {
    this.actions = new Map<ActionKey, Action>()
  }

  addAction = (origin: string, tabId: string, action: Action) => {
    log("Adding action for origin [%s] and tab [%s] of type %s", origin, tabId, action.type)
    const key = {
      tabId: tabId,
      origin: origin,
      uuid: uuidv4()
    }
    log("Created action key: %O - %s", key, action.type)
    this.actions.set(key, action)
  }

  getAction = <T extends (Action)>(key: ActionKey): T | undefined => {
    log("Getting action for key %O", key)
    return this.actions.get(key) as T
  }

  getOrderedActions = (): OrderedAction[] => {
    const out : OrderedAction[] = []
    this.actions.forEach((action, key) => {
      out.push({ key, action })
    })
    return out
  }

  deleteAction = (key: ActionKey) => {
    log("Deleting action for key %O", key)
    this.actions.delete(key)
  }

  getActionsWithOriginAndType = <T extends (Action)>(origin: string, type: string): Map<ActionKey, T> => {
    log("Getting actions with origin %s and type %s", origin, type)
    const out = new Map<ActionKey, T>()
    this.actions.forEach((action, key) => {
      if ((action.type === type) && (key.origin === origin)) {
        out.set(key, action as T)
      }
    })
    return out
  }

  deleteActionWithOriginAndTabId = (origin: string, tabId: string) => {
    log("Deleting actions with origin %s and tabId %s", origin, tabId)
    Array.from(this.actions.keys()).forEach(key => {
      if ((key.origin == origin) && (key.tabId == tabId)) {
        this.actions.delete(key)
      }
    })
  }

}