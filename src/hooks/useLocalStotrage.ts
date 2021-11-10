import { useCallback, useState } from 'react'

function useLocalStorage(key: string, defaultState = ''): [string, (arg: string) => void] {
  const [state, setState] = useState<string>(() => {
    // NOTE: Not sure if this is ok
    const storedState = localStorage.getItem(key)
    if (storedState) {
      return JSON.parse(storedState)
    }
    return defaultState
  })

  const setLocalStorageState = useCallback(
    (newState: string) => {
      const changed = state !== newState
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

export default useLocalStorage
