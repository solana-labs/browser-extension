import assert from "assert"
import { useEffect, useReducer } from "react"

const pageLoadTime: Date = new Date()

const globalCache = new Map()

class FetchLoopListener {
  public cacheKey: any
  public fn: () => void
  public refreshInterval: number
  public callback: () => void

  constructor(cacheKey: any, fn: () => void, refreshInterval: number, callback: () => void) {
    this.cacheKey = cacheKey
    this.fn = fn
    this.refreshInterval = refreshInterval
    this.callback = callback
  }
}

class FetchLoopInternal {
  public cacheKey: any
  private fn: () => void
  private timeoutId: NodeJS.Timeout | null
  private listeners: Set<FetchLoopListener>
  private errors: number

  constructor(cacheKey: any, fn: () => void) {
    this.cacheKey = cacheKey
    this.fn = fn
    this.timeoutId = null
    this.listeners = new Set<FetchLoopListener>()
    this.errors = 0
  }

  get refreshInterval() {
    return Math.min(...[...this.listeners].map((listener) => listener.refreshInterval))
  }

  get stopped() {
    return this.listeners.size === 0
  }

  addListener(listener: FetchLoopListener) {
    let previousRefreshInterval = this.refreshInterval
    this.listeners.add(listener)
    if (this.refreshInterval < previousRefreshInterval) {
      this.refresh()
    }
  }

  removeListener(listener: FetchLoopListener) {
    assert(this.listeners.delete(listener))
    if (this.stopped) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
    }
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener.callback())
  }

  refresh = async () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    if (this.stopped) {
      return
    }

    try {
      let data = await this.fn()
      globalCache.set(this.cacheKey, data)
      this.errors = 0
      this.notifyListeners()
      return data
    } catch (error) {
      ++this.errors
      console.warn(error)
    } finally {
      if (!this.timeoutId && !this.stopped) {
        let waitTime = this.refreshInterval

        // Back off on errors.
        if (this.errors > 0) {
          waitTime = Math.min(1000 * Math.pow(2, this.errors - 1), 60000)
        }

        // Don't do any refreshing for the first five seconds, to make way for other things to load.
        // @ts-ignore
        let timeSincePageLoad: number = new Date() - pageLoadTime
        if (timeSincePageLoad < 5000) {
          waitTime += 5000 - timeSincePageLoad / 2
        }

        // Refresh background pages slowly.
        if (document.visibilityState === "hidden") {
          waitTime = 60000
        } else if (!document.hasFocus()) {
          waitTime *= 1.5
        }

        // Add jitter so we don't send all requests at the same time.
        waitTime *= 0.8 + 0.4 * Math.random()

        this.timeoutId = setTimeout(this.refresh, waitTime)
      }
    }
  }
}

class FetchLoops {
  loops = new Map<string, FetchLoopInternal>()

  addListener(listener: FetchLoopListener) {
    if (!this.loops.has(listener.cacheKey)) {
      this.loops.set(listener.cacheKey, new FetchLoopInternal(listener.cacheKey, listener.fn))
    }
    this.loops.get(listener.cacheKey)?.addListener(listener)
  }

  removeListener(listener: FetchLoopListener) {
    let loop = this.loops.get(listener.cacheKey)
    if (!loop) {
      return
    }

    loop.removeListener(listener)
    if (loop.stopped) {
      this.loops.delete(listener.cacheKey)
    }
  }

  refresh(cacheKey: string) {
    if (this.loops.has(cacheKey)) {
      this.loops.get(cacheKey)?.refresh()
    }
  }

  refreshAll() {
    const keys = this.loops.keys()
    for (let key in keys) {
      this.loops.get(key)?.refresh()
    }
    // return Promise.all([...intervals.return()].map((loop) => loop.refresh()));
  }
}

const globalLoops = new FetchLoops()

export const useAsyncData = <T>(
  asyncFn: () => Promise<T>,
  cacheKey: any,
  { refreshInterval = 60000 } = {}
): [T, boolean] => {
  const [, rerender] = useReducer((i: number) => i + 1, 0)

  useEffect(() => {
    if (!cacheKey) {
      return () => {}
    }
    const listener = new FetchLoopListener(cacheKey, asyncFn, refreshInterval, rerender)
    globalLoops.addListener(listener)
    return () => globalLoops.removeListener(listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, refreshInterval])

  if (!cacheKey) {
    return [null!, false]
  }

  const loaded = globalCache.has(cacheKey)
  const data = loaded ? globalCache.get(cacheKey) : undefined
  return [data, loaded]
}

export const refreshCache = (cacheKey: any, clearCache = false) => {
  if (clearCache) {
    globalCache.delete(cacheKey)
  }
  const loop = globalLoops.loops.get(cacheKey)
  if (loop) {
    loop.refresh()
    if (clearCache) {
      loop.notifyListeners()
    }
  }
}

// TODO: figure out type for valueKey: any
export const setCache = (cacheKey: any, value: any, { initializeOnly = false } = {}) => {
  if (!initializeOnly && globalCache.has(cacheKey)) {
    return
  }
  globalCache.set(cacheKey, value)
  const loop = globalLoops.loops.get(cacheKey)
  if (loop) {
    loop.notifyListeners()
  }
}
