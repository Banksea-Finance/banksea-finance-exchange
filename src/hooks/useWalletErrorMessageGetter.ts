import { useCallback } from 'react'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

// TODO:
function useWalletErrorMessageGetter(): { getWalletErrorMessage: (_e: any) => any } {
  const { wallet } = useSolanaWeb3()

  const getWalletErrorMessage = useCallback((e: any) => {
    return e?.toString()
  }, [wallet])

  return {
    getWalletErrorMessage: getWalletErrorMessage
  }
}

export { useWalletErrorMessageGetter }
