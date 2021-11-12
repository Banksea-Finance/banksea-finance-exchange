import { useConnectionConfig } from '@/contexts/solana-connection-config'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import { Provider } from '@project-serum/anchor'
import { useMemo } from 'react'

const useAnchorProvider = () => {
  const { connection } = useConnectionConfig()
  const { adapter } = useSolanaWeb3()

  return useMemo(() => {
    if (!connection || !adapter) {
      return undefined
    }

    return new Provider(connection, adapter, {})
  }, [connection, adapter])
}

export default useAnchorProvider
