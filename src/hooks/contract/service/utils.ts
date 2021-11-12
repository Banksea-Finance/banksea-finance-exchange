import { Program, Provider, web3 as solanaWeb3 } from '@project-serum/anchor'
import { AccountInfo, PublicKey, TokenAmount } from '@solana/web3.js'
import BigNumber from 'bignumber.js'

export type SupportedSolanaTokenName =
  | 'USDC'

export type TokenAccount = {
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
}

export const MapSolanaTokenNameToMint: Record<SupportedSolanaTokenName, PublicKey> = {
  'USDC': new PublicKey('2tWC4JAdL4AxEFJySziYJfsAnW2MHKRo98vbAPiRDSk8')
}

export async function findUserAccount(program: Program, userPublicKey: PublicKey, nftAccount: PublicKey): Promise<PublicKey> {
  // create a user account
  const associatedToken = await program.account.userAccount.associatedAddress(userPublicKey, nftAccount)
  const accountInfo = await program.provider.connection.getAccountInfo(associatedToken)

  if (accountInfo == null) {
    await program.rpc.createUser({
      accounts: {
        nft: nftAccount,
        payer: program.provider.wallet.publicKey,
        user: associatedToken,
        authority: userPublicKey,
        systemProgram: solanaWeb3.SystemProgram.programId,
        rent: solanaWeb3.SYSVAR_RENT_PUBKEY
      }
    })
  }

  return associatedToken
}

export const getTokenAccounts = async (args: { name?: SupportedSolanaTokenName, mint?: PublicKey, provider: Provider }): Promise<Array<{
  pubkey: PublicKey;
  account: AccountInfo<Buffer>;
}> | undefined> => {
  const { name, provider } = args
  let { mint } = args

  if (!mint) {
    if (!name) {
      return Promise.reject('Name and mint must have one not null value!')
    }
    mint = MapSolanaTokenNameToMint[name]
  }

  return (await provider.connection!.getTokenAccountsByOwner(
    new PublicKey(provider.wallet.publicKey), {
      mint
    }
  ))?.value
}

export async function getTokenAccountWithMaximumBalance(args: { name: SupportedSolanaTokenName, provider: Provider }): Promise<{ tokenAmount?: TokenAmount, tokenAccount?: TokenAccount }> {
  const { name, provider } = args

  const accounts = await getTokenAccounts({ name, provider })

  if (!accounts?.length) {
    return {}
  }

  const tokenAmounts = await Promise.all(
    accounts.map(account => provider.connection.getTokenAccountBalance(account.pubkey))
  ).then(result => result.map(({ value }) => value))

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
