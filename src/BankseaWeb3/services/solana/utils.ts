import { AccountInfo, PublicKey, TokenAmount } from '@solana/web3.js'
import { bankseaWeb3 } from '../../index'
import BigNumber from 'bignumber.js'

export type SupportedSolanaTokenName =
  | 'USDC'

export type TokenAccount = {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
}

export const MapSolanaTokenNameToMint: {
  // eslint-disable-next-line no-unused-vars
  [key in SupportedSolanaTokenName]: PublicKey
} = {
  'USDC': new PublicKey('2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8')
}

const getTokenAccounts = async (params: { name?: SupportedSolanaTokenName, mint?: PublicKey }): Promise<Array<{
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
}> | undefined> => {
  const { name } = params
  let { mint } = params

  if (!mint) {
    if (!name) {
      return Promise.reject('Name and mint must have one not null value!')
    }
    mint = MapSolanaTokenNameToMint[name]
  }

  return (await bankseaWeb3.sol.provider?.connection!.getTokenAccountsByOwner(
    new PublicKey(bankseaWeb3.sol.provider?.wallet.publicKey), {
      mint
    }
  ))?.value
}

export const getTokenAccountWithMaximumBalance = async (name: SupportedSolanaTokenName): Promise<{ tokenAmount?: TokenAmount, tokenAccount?: TokenAccount }> => {
  const accounts = await getTokenAccounts({ name })

  if (!accounts?.length) {
    return {}
  }

  const tokenAmounts = await Promise.all(
    accounts.map(account => bankseaWeb3.sol.provider!.connection.getTokenAccountBalance(account.pubkey))
  ).then(result => {
    return result.map(({ value }) => value)
  })

  const amountByAccount = accounts
    .map((account, index) => ({
      account,
      amount: tokenAmounts[index]
    }))
    .sort((t1, t2) => new BigNumber(t2.amount.amount).minus(new BigNumber(t1.amount.amount)).toNumber())

  const max = amountByAccount[0]

  return {
    tokenAmount: max.amount,
    tokenAccount: max.account
  }
}

export const getTokenSupply = async (params: { name?: SupportedSolanaTokenName, mint?: PublicKey }) => {
  const { name } = params
  let { mint } = params

  if (!mint) {
    if (!name) {
      return Promise.reject('Name and mint must have one not null value!')
    }
    mint = MapSolanaTokenNameToMint[name]
  }

  return (await bankseaWeb3.sol.provider!.connection.getTokenSupply(mint)).value
}
