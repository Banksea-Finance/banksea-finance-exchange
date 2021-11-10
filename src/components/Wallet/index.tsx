import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedWallet } from '@/store/wallet'
import { getIconByWalletName } from '@/web3/wallets'
import styled from 'styled-components'
import MetamaskAvatar from '../MetamaskAvatar'
import { Button, Modal } from 'antd'
import { useWallet } from '@/contexts/wallet'

type CurrentAccountProps = {
  account: string
}

type WalletModalContentProps = {
  account: string
}

const SCCurrentAccount = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin-right: 1.2rem;
    img {
      width: 26px;
      height: 26px;
    }
  }

`

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

const Line = styled.div`
  position: absolute;
  right: 0rem;
  top: 5rem;
  width: 100%;
  height: 0.15rem;
  background: linear-gradient(to right, #00FFFF, #7702FF);
`

const WalletModalContent: React.FC<WalletModalContentProps> = ({ account }) => {
  const { disconnect } = useWallet()

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

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const selectedWallet = useSelector(getSelectedWallet)

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <SCCurrentAccount>
      <div className="icon">
        {
          selectedWallet === 'Metamask'
            ? <MetamaskAvatar address={account} />
            : <img src={getIconByWalletName(selectedWallet)} alt="" />
        }
      </div>
      <span onClick={() => setIsModalVisible(true)}>{`${account.substr(0, 5)}...${account.substr(-4, 4)}`}</span>
      <WalletModal
        style={{ top: 20 }}
        wrapClassName="wallet-modal-wrapper"
        closable={false}
        maskClosable={false}
        title="Your Wallet"
        visible={isModalVisible}
        footer={null}
      >
        <Line />
        <WalletModalContent account={account} />
        <Button className="walletModalClose" onClick={closeModal}>
          Close
        </Button>
      </WalletModal>
    </SCCurrentAccount>
  )
}

const ConnectToWallet = () => {
  // const { open } = useWalletSelectionModal()
  const { select } = useWallet()

  return (
    <div className="toAmount">
      <span onClick={select} className="toAmountText">
        Connect
      </span>
    </div>
  )
}

const Wallet: React.FC = () => {
  const { adapter, connected } = useWallet()

  const account = useMemo(() => {
    if (!connected) {
      return undefined
    }

    return adapter!.publicKey!.toBase58()
  }, [adapter, connected])

  return (
    <div className="wallet">
      {!account && <ConnectToWallet />}
      {!!account && <CurrentAccount account={account} />}
    </div>
  )
}

export default Wallet
