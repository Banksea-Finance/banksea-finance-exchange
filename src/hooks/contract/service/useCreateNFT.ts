import { useCallback, useState } from 'react'
import { NFTCreateForm } from '@/pages/NftCreate'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import { generateNftMetadata } from '@/utils'
import { pinJsonToIPFS } from '@/utils/ipfs'
import { createNFT } from '@/apis/nft'
import { FormInstance, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useWalletErrorMessageGetter } from '@/hooks/useWalletErrorMessageGetter'
import { BN, Program, web3 as solanaWeb3 } from '@project-serum/anchor'
import useBankseaProgram from '@/hooks/contract/programs/useBankseaProgram'

type Hint = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}

type CreateNftAccountResult = {
  nftPubKey: string
  userAccountPubKey: string
  transactionStatus: Promise<string>
}

/**
 * return the public key of created NFT
 */
async function createNftAccount(ipfsHash: string, program: Program): Promise<CreateNftAccountResult> {
  const uri = `ipfs://ipfs/${ipfsHash}`
  const supply = new BN(1)

  const nftKeypair = solanaWeb3.Keypair.generate()

  const userKeypair = program.provider.wallet.publicKey
  const userAccount = await program.account.userAccount.associatedAddress(
    userKeypair, nftKeypair.publicKey
  )

  const transactionStatus = program.rpc.createNft(uri, supply, {
    accounts: {
      nft: nftKeypair.publicKey,
      authority: userKeypair,
      user: userAccount,
      payer: userKeypair,
      systemProgram: solanaWeb3.SystemProgram.programId,
      rent: solanaWeb3.SYSVAR_RENT_PUBKEY
    },
    signers: [nftKeypair],
    instructions: [await program.account.nftAccount.createInstruction(nftKeypair, 256)]
  })

  return {
    nftPubKey: nftKeypair.publicKey.toBase58(),
    userAccountPubKey: userAccount.toBase58(),
    transactionStatus
  }
}

const useCreateNFT = () => {
  const history = useHistory()

  const bankseaProgram = useBankseaProgram()
  const { account } = useSolanaWeb3()
  const { getWalletErrorMessage } = useWalletErrorMessageGetter()

  const [hint, setHintMessage] = useState<Hint>({})

  const create = useCallback(
    async (formInstance: FormInstance<NFTCreateForm>, promised: boolean) => {
      if (!promised) {
        setHintMessage({
          message: 'Please check the checkbox',
          type: 'error'
        })
        return
      }

      if (!formInstance.getFieldsValue().assetIpfsHash) {
        setHintMessage({
          message: 'Please upload artwork image',
          type: 'error'
        })
        return
      }

      if (!account) {
        setHintMessage({
          message: 'Please connect to a wallet',
          type: 'error'
        })
        return
      }

      const form = await formInstance.validateFields().catch(() => undefined)
      if (!form) {
        setHintMessage({
          message: 'Please complete the form',
          type: 'error'
        })
        return
      }

      if (!bankseaProgram) {
        setHintMessage({
          message: 'Banksea Program loaded failed',
          type: 'error'
        })
        return
      }

      const nftMetadata = generateNftMetadata(form)
      setHintMessage({
        message: 'Pinning asset JSON to IPFS...',
        type: 'hint'
      })

      const pinResult = await pinJsonToIPFS(nftMetadata).catch(e => {
        const error = e.response?.data?.error ?? e?.toString() ?? 'unknown error'

        setHintMessage({
          message: `Error occurred when pinning JSON to IPFS, retry again. (${error.toString()})`,
          type: 'error'
        })
        return undefined
      })

      if (!pinResult) {
        return
      }

      setHintMessage({
        message: 'Pinned successful! Please confirm in your wallet...',
        type: 'hint'
      })

      const { IpfsHash } = pinResult

      createNftAccount(IpfsHash, bankseaProgram)
        .then(async ({ userAccountPubKey, nftPubKey, transactionStatus }) => {

          await transactionStatus

          setHintMessage({
            message: 'Your creation request has been submitted! Waiting the transaction on chain confirmed. Please DO NOT close this page now!',
            type: 'hint'
          })
          return { userAccountPubKey, nftPubKey }
        })
        .then(async ({ userAccountPubKey, nftPubKey }) => {
          await createNFT({
            uri: IpfsHash,
            addressCreate: account?.toBase58(),
            tokenId: '',
            group: '',
            nameArtist: form.artistName,
            fee: '',
            feeRecipient: '',
            typeChain: 'Solana',
            supply: 1,
            nftPubKey,
            accountOwner: userAccountPubKey
          })

          message.success('Create successfully!')
          history.push(`/nft/create/success?img=${form.assetIpfsHash}&name=${form.artworkName}`)
        })
        .catch(e => {
          setHintMessage({
            message: getWalletErrorMessage(e),
            type: 'error'
          })
        })
    },
    [account]
  )

  return {
    hint, create
  }
}

export default useCreateNFT
