import { useCallback } from 'react'
import { PublicKey } from '@solana/web3.js'
import { web3 as solanaWeb3 } from '@project-serum/anchor'
import { cancelExchange, getExchangeInfo } from '@/apis/exchange/solana'
import useAnchorProvider from '@/hooks/useAnchorProvider'
import useBankseaProgram from '@/hooks/contract/programs/useBankseaProgram'
import useExchangeProgram from '@/hooks/contract/programs/useExchangeProgram'
import { findUserAccount } from './utils'
import { NFTDetail } from '@/types/NFTDetail'

const useSoldOutNFT = () => {
  const provider = useAnchorProvider()
  const bankseaProgram = useBankseaProgram()
  const exchangeProgram = useExchangeProgram()

  const soldOut = useCallback(
    async (detail?: NFTDetail) => {
      if (!bankseaProgram || !exchangeProgram || !detail) {
        return
      }

      const { nftPubKey } = detail

      const exchangePubKeyStr = (await (getExchangeInfo(nftPubKey))).data.data.exchangePubKey

      const exchange = new PublicKey(exchangePubKeyStr)

      const exchangeAccount: any = await exchangeProgram.account.exchange.fetch(exchange) // get exchange data

      const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress([exchangeAccount.item.toBuffer(), exchangeAccount.seller.toBuffer()], exchangeProgram.programId)

      const sellerItemAccount = await findUserAccount(bankseaProgram, exchangeAccount.seller, exchangeAccount.item)

      await exchangeProgram.rpc.closeExchange({
        accounts: {
          exchange: exchange,
          seller: exchangeAccount.seller,
          itemHolder: exchangeAccount.itemHolder,
          itemHolderAuth: sellerPda,
          itemReceiver: sellerItemAccount,
          nftProgram: bankseaProgram.programId,
        },
      })

      await cancelExchange(nftPubKey)
    },
    [bankseaProgram, exchangeProgram, provider]
  )

  return {
    soldOut
  }
}

export default useSoldOutNFT
