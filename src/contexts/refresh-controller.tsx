import React, { useContext, useEffect, useState } from 'react'

export const FAST_INTERVAL = 3000
export const SLOW_INTERVAL = 30000

const RefreshControllerContext = React.createContext({
  fast: 0,
  slow: 0,
  quiet: 0,
  refresh: () => {}
})

const RefreshControllerProvider: React.FC = ({ children }) => {
  const [slow, setSlow] = useState(0)
  const [fast, setFast] = useState(0)
  const [quiet, setQuiet] = useState(0)

  const refresh = () => {
    setFast(prev => prev + 1)
    setSlow(prev => prev + 1)
    setQuiet(prev => prev + 1)
  }

  useEffect(() => {
    const fastInterval = setInterval(async () => {
      setFast(prev => prev + 1)
    }, FAST_INTERVAL)

    const slowInterval = setInterval(async () => {
      setSlow(prev => prev + 1)
    }, SLOW_INTERVAL)

    return () => {
      clearInterval(fastInterval)
      clearInterval(slowInterval)
    }
  }, [])

  return (
    <RefreshControllerContext.Provider
      value={{ slow, fast, quiet, refresh }}
    >
      {children}
    </RefreshControllerContext.Provider>
  )
}

const useRefreshController = () => {
  const { slow, fast, quiet, refresh } = useContext(RefreshControllerContext)
  return {
    slowRefreshFlag: slow,
    fastRefreshFlag: fast,
    quietRefreshFlag: quiet,
    forceRefresh: refresh
  }
}

export {
  RefreshControllerProvider, useRefreshController
}

