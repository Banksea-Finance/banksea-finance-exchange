import React, { useCallback } from 'react'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import { Button, Modal } from 'antd'
import styled from 'styled-components'
import { useModal } from '@/hooks/useModal'

type WalletModalContentProps = {
  account: string
}

const WalletModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
  }

  .ant-modal-body,

  .ant-modal-header{
    background-color: #111C3A;
    border: none;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
    color: white;
  }

  .walletModal-Title {
    text-align: center;
    color: white;
    font-weight: bolder;
    font-size: 1.8rem;
  }

  .text-label {
    font-size: 1.7rem;
  }

  .walletModalClose {
    width: 12.6rem;
    height: 4rem;
    background: #554BFF;
    border: none;
    border-radius: 1rem;
    color: #ffffff;
    font-weight: bolder;
    margin-left: calc((100% - 12.6rem) / 2);
    margin-top: 20px;
  }

  .disconnect {
    width: 12.6rem;
    height: 4rem;
    background: #305099;
    font-weight: bolder;
    border: none;
    border-radius: 1rem;
    color: #ffffff;
    margin-left: calc((100% - 12.6rem) / 2);
    margin-top: 20px;
  }
`

const WalletModalContent: React.FC<WalletModalContentProps> = ({ account }) => {
  const { disconnect } = useSolanaWeb3()

  return (
    <div className="wallet-modal-content">
      <div className="walletModal-Title">{account}</div>
      <div className="bscScan">
        <div>
          {/*<span className="text-label">View on Explorer</span>*/}
        </div>
        <Button type="text" onClick={disconnect} className="disconnect">
          Disconnect
        </Button>
      </div>
    </div>
  )
}

const Divider = styled.div`
  position: absolute;
  right: 0rem;
  top: 5rem;
  width: 100%;
  height: 0.15rem;
  background: linear-gradient(to right, #00FFFF, #7702FF);
`

const useMyWalletModal = () => {
  const { account } = useSolanaWeb3()

  const buildMyWalletModelContent = useCallback(
    (open, close, visible) => (
      <WalletModal
        visible={visible}
        onCancel={close}
        footer={null}
        title={'My Wallet'}
      >
        <Divider />
        <WalletModalContent account={account!.toBase58()} />
      </WalletModal>
    ),
    [account]
  )

  return useModal(buildMyWalletModelContent)
}

export default useMyWalletModal
