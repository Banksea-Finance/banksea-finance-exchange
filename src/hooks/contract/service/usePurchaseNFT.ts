import { useCallback } from 'react'
import { completeExchange, getExchangeInfo } from '@/apis/exchange/solana'
import { PublicKey } from '@solana/web3.js'
import useExchangeProgram from '@/hooks/contract/programs/useExchangeProgram'
import useBankseaProgram from '@/hooks/contract/programs/useBankseaProgram'
import useAnchorProvider from '@/hooks/useAnchorProvider'
import useCheckBalance from '@/hooks/contract/service/useCheckBalance'
import { NFTDetail } from '@/types/NFTDetail'
import { findUserAccount, getTokenAccountWithMaximumBalance } from './utils'
import { Program, web3 as solanaWeb3 } from '@project-serum/anchor'
import { TokenInstructions } from '@project-serum/serum'

export type PurchaseByFixedPriceParams = {
  nftDetail?: NFTDetail
  account: string
  onAuthorized: () => void
}

async function processExchange(args: {
  exchangeProgram: Program
  nftProgram: Program
  buyer: PublicKey
  exchange: PublicKey
  itemReceiver: PublicKey
  currencyHolder: PublicKey
  exchangeAccount: any
}) {
  const { exchange, exchangeAccount, itemReceiver, currencyHolder, buyer, nftProgram, exchangeProgram } = args

  const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress(
    [exchangeAccount.item.toBuffer(), exchangeAccount.seller.toBuffer()],
    exchangeProgram.programId
  )

  await exchangeProgram.rpc.processExchange({
    accounts: {
      exchange,
      seller: exchangeAccount.seller,
      buyer,
      currencyHolder,
      currencyHolderAuth: buyer,
      itemHolder: exchangeAccount.itemHolder,
      itemHolderAuth: sellerPda,
      itemReceiver: itemReceiver,
      currencyReceiver: exchangeAccount.currencyReceiver,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      nftProgram: nftProgram.programId
    }
  })
}

const usePurchaseNFT = () => {
  const exchangeProgram = useExchangeProgram()
  const bankseaProgram = useBankseaProgram()
  const provider = useAnchorProvider()
  const checkBalance = useCheckBalance()

  const purchaseByFixedPrice = useCallback(
    async ({ nftDetail, account }: PurchaseByFixedPriceParams) => {
      if (!nftDetail) {
        return Promise.reject('Parameter nftDetail must NOT be null')
      }

      if (!exchangeProgram || !bankseaProgram) {
        return Promise.reject('Failed to load program')
      }

      if (!provider) {
        return Promise.reject('Failed to load Anchor provider')
      }

      await checkBalance(nftDetail.price)

      const exchangePubKey = (await getExchangeInfo(nftDetail.nftPubKey)).data.data.exchangePubKey

      const exchangeAccount: any = await exchangeProgram.account.exchange.fetch(exchangePubKey) // get exchange data

      const { tokenAccount } = await getTokenAccountWithMaximumBalance({ name: 'USDC', provider })
      const currencyHolder = tokenAccount!.pubkey

      const itemReceiver = await findUserAccount(bankseaProgram, new PublicKey(account), exchangeAccount.item)

      await processExchange({
        exchange: exchangePubKey,
        exchangeAccount,
        itemReceiver,
        currencyHolder,
        nftProgram: bankseaProgram,
        exchangeProgram,
        buyer: provider.wallet.publicKey
      })

      await completeExchange({
        accountTo: itemReceiver.toBase58(),
        addressTo: provider.wallet.publicKey.toBase58(),
        nftPubKey: nftDetail.nftPubKey
      })
    },
    [exchangeProgram, bankseaProgram, provider]
  )

  return {
    purchaseByFixedPrice
  }
}

export default usePurchaseNFT
