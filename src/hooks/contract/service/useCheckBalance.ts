import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { toBigNumber } from '@/web3/utils'
import { getTokenAccountWithMaximumBalance, MapSolanaTokenNameToMint, SupportedSolanaTokenName } from './utils'
import useAnchorProvider from '@/hooks/useAnchorProvider'

const useCheckBalance = () => {
  const provider = useAnchorProvider()

  return useCallback(
    async (requiredPrice?: number | string) => {
      if (!requiredPrice) {
        return Promise.reject('Price must not be null')
      }

      if (!provider) {
        return Promise.reject('No Anchor provider found')
      }

      // fixme: hard code
      // const tokenName = nftDetail.makerPriceUnit
      const tokenName = 'USDC'

      if (!MapSolanaTokenNameToMint[tokenName as SupportedSolanaTokenName]) {
        return Promise.reject(`Invalid token name: ${tokenName}`)
      }

      const { tokenAmount } = await getTokenAccountWithMaximumBalance({ name: tokenName, provider })

      if (!tokenAmount) {
        return Promise.reject(`Could find any account of ${tokenName} about your wallet`)
      }

      const realBalance = new BigNumber(tokenAmount.amount).dividedBy(new BigNumber('10').pow(tokenAmount.decimals))

      if (realBalance.gte(toBigNumber(requiredPrice))) {
        return Promise.resolve()
      } else {
        return Promise.reject('Insufficient balance')
      }
    },
    [provider]
  )
}

export default useCheckBalance
