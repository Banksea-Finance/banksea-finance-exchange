import { useCallback, useState } from 'react'
import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { createExchangeInfo } from '@/apis/exchange/solana'
import { NFTDetail } from '@/types/NFTDetail'
import useBankseaProgram from '@/hooks/contract/programs/useBankseaProgram'
import useExchangeProgram from '@/hooks/contract/programs/useExchangeProgram'
import useAnchorProvider from '@/hooks/useAnchorProvider'
import { BN, Program, Provider, web3 as solanaWeb3 } from '@project-serum/anchor'
import { Wallet } from '@project-serum/anchor/dist/provider'
import { TokenInstructions } from '@project-serum/serum'
import {
  findUserAccount,
  getTokenAccountWithMaximumBalance,
  MapSolanaTokenNameToMint,
  SupportedSolanaTokenName
} from './utils'


const getTokenSupply = async (args: { name?: SupportedSolanaTokenName, mint?: PublicKey, provider: Provider }) => {
  const { name, provider } = args
  let { mint } = args

  if (!mint) {
    if (!name) {
      return Promise.reject('Name and mint must have one not null value!')
    }
    mint = MapSolanaTokenNameToMint[name]
  }

  return (await provider.connection.getTokenSupply(mint)).value
}

async function transferNft(program: Program, nftAccount: PublicKey, user1Wallet: Keypair | Wallet, user2PublicKey: PublicKey, amount: BN) {
  const user1Account = await findUserAccount(program, user1Wallet.publicKey, nftAccount)

  const user2Account = await findUserAccount(program, user2PublicKey, nftAccount)

  await program.rpc.transfer(amount, {
    accounts: {
      from: user1Account,
      to: user2Account,
      authority: user1Wallet.publicKey
    }
    /*signers: [user1Wallet]*/
  })
}

async function createTokenAccountInstructions(args: { newAccountPubkey: PublicKey, mint: any, owner: any, lamports?: number, provider: Provider }): Promise<TransactionInstruction[]> {
  const { newAccountPubkey, provider, mint, owner } = args

  let { lamports } = args

  if (lamports === undefined) {
    lamports = await provider.connection.getMinimumBalanceForRentExemption(165)
  }

  return [
    solanaWeb3.SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey,
      space: 165,
      lamports,
      programId: TokenInstructions.TOKEN_PROGRAM_ID
    }),
    TokenInstructions.initializeAccount({
      account: newAccountPubkey,
      mint,
      owner
    })
  ]
}

async function createTokenAccount(args: { mint: PublicKey, owner: PublicKey, provider: Provider }): Promise<PublicKey> {
  const { mint, owner, provider } = args

  const vault = solanaWeb3.Keypair.generate()
  const tx = new solanaWeb3.Transaction()
  tx.add(...(await createTokenAccountInstructions({
    newAccountPubkey: vault.publicKey, mint, owner, provider
  })))
  await provider.send(tx, [vault])
  return vault.publicKey
}

async function createExchange(
  exchangeProgram: Program,
  nftProgram: Program,
  nftPubKey: PublicKey,
  itemAmount: number,
  token: PublicKey,
  amount: string,
  provider: Provider,
  tokenReceiverAccount?: PublicKey
): Promise<PublicKey> {
  const seller = provider.wallet

  const exchange = solanaWeb3.Keypair.generate()

  // prepare pda to save the item before the exchange finished
  const [sellerPda] = await solanaWeb3.PublicKey.findProgramAddress([nftPubKey.toBuffer(), seller.publicKey.toBuffer()], exchangeProgram.programId)
  console.log('sellerPda: ', sellerPda.toBase58())

  const itemHolder = await findUserAccount(nftProgram, sellerPda, nftPubKey)
  console.log('itemHolder: ', itemHolder.toBase58())

  await transferNft(nftProgram, nftPubKey, seller, sellerPda, new BN(itemAmount))
  console.log('transfer NFT success')

  let currencyReceiver = tokenReceiverAccount
  if (!currencyReceiver) {
    currencyReceiver = await createTokenAccount({
      mint: token,
      owner: seller.publicKey,
      provider
    })
    console.log('currencyReceiver: ', currencyReceiver.toBase58())
  }

  const instruction = await exchangeProgram.account.exchange.createInstruction(exchange)
  console.log('instruction: ', instruction)

  await exchangeProgram.rpc.createExchange(new BN(amount), {
    accounts: {
      exchange: exchange.publicKey,
      seller: seller.publicKey,
      item: nftPubKey,
      currency: token,
      itemHolder: itemHolder,
      currencyReceiver,
      rent: solanaWeb3.SYSVAR_RENT_PUBKEY
    },
    signers: [exchange],
    instructions: [instruction]
  })

  return exchange.publicKey
}

const useSellNFT = () => {
  const provider = useAnchorProvider()
  const bankseaProgram = useBankseaProgram()
  const exchangeProgram = useExchangeProgram()

  const [error, setError] = useState<string>()

  const listByFixedPrice = useCallback(
    async (detail: NFTDetail, price: string) => {
      if (!bankseaProgram || !exchangeProgram) {
        setError('Unable to load program')
        return
      }

      if (!provider) {
        setError('Unable to load Anchor provider')
        return
      }

      const mint = MapSolanaTokenNameToMint['USDC']

      const tokenSupply = await getTokenSupply({ mint, provider })

      const { tokenAccount } = await getTokenAccountWithMaximumBalance({ name: 'USDC', provider })

      const exchange = await createExchange(
        exchangeProgram,
        bankseaProgram,
        new PublicKey(detail.nftPubKey!),
        1,
        mint,
        new BigNumber(price).multipliedBy(new BigNumber(10).pow(tokenSupply.decimals)).toString(),
        provider,
        tokenAccount?.pubkey
      )

      await createExchangeInfo({
        exchangePubKey: exchange.toBase58(),
        nftPrice: price,
        nftPubKey: detail.nftPubKey
      })
    },
    [bankseaProgram, exchangeProgram, provider]
  )

  return {
    listByFixedPrice,
    error
  }
}

export default useSellNFT
