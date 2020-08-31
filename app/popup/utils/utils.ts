import { useCallback, useEffect, useState } from "react"

type EventEmitter = NodeJS.EventEmitter

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const useLocalStorageState = <T>(
  key: string,
  defaultState: T
): [T, (newState: T) => void] => {
  const [state, setState] = useState<T>(() => {
    let storedState = localStorage.getItem(key)
    if (storedState) {
      return JSON.parse(storedState)
    }
    return defaultState
  })

  const setLocalStorageState = useCallback(
    (newState: T) => {
      let changed = state !== newState
      if (!changed) {
        return
      }
      setState(newState)
      if (newState === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newState))
      }
    },
    [state, key]
  )

  return [state, setLocalStorageState]
}

export function useEffectAfterTimeout(effect: (...args: any[]) => void, timeout: number) {
  useEffect(() => {
    let handle = setTimeout(effect, timeout)
    return () => clearTimeout(handle)
  })
}

export function useListener(emitter: EventEmitter, eventName: string) {
  let [, forceUpdate] = useState(0)

  useEffect(() => {
    const listener = () => forceUpdate((i) => i + 1)
    emitter.on(eventName, listener)

    return () => {
      emitter.removeListener(eventName, listener)
    }
  }, [emitter, eventName])
}
