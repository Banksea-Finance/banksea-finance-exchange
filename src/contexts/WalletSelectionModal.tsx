import React, { useContext, useEffect, useState } from 'react'
import { SUPPORT_WALLETS, useConnectToWallet, Wallet } from '@/web3/wallets'
import { Modal } from 'antd'
import { useWeb3EnvContext } from './Web3EnvProvider'
import styled from 'styled-components'


type WalletCardProps = {
  wallet: Wallet
}

const WalletItemContainer = styled.div`
  display: flex;
  margin-left: 7%;
  margin-bottom: 1.5rem;
  width: 86%;
  justify-content: space-between;
  align-items: center;

  border: 0.2rem solid #372fbd;
  border-radius: 1rem;
  padding: 1rem 2.2rem;
  background: #554BFF;
  color: white;
  font-size: 1.8rem;
  font-weight: 500;

  img {
    width: 5rem;
    height: 5rem;
  }
`

const CustomModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 1rem;
  }

  .ant-modal-body,
  .ant-modal-header {
    background-color: #111C3A;
  !important;
  }

  .ant-modal-header {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom: none;
  }

  .ant-modal-title {
    color: white;
    font-weight: 550;
    font-size: 1.6rem;
  }

  .ant-modal-close-icon {
    color: white;
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

const WalletSelectionModalContext = React.createContext({
  open: () => {
    return
  }
})

const WalletItem: React.FC<WalletCardProps> = ({ wallet }) => {
  const { name, icon } = wallet

  const { connect } = useConnectToWallet()

  return (
    <WalletItemContainer onClick={() => connect(wallet)}>
      <span className="wallet-name">{name}</span>
      <img className="SelectImg" src={icon} alt="" />
    </WalletItemContainer>
  )
}

const WalletSelectionModalProvider: React.FC = ({ children }) => {
  const { providerInitialized } = useWeb3EnvContext()

  const [visible, setVisible] = useState(false)

  const open = () => setVisible(true)

  const close = () => setVisible(false)

  useEffect(() => {
    if (providerInitialized) {
      close()
    }
  }, [providerInitialized])

  return (
    <WalletSelectionModalContext.Provider value={{ open }}>
      {children}
      <CustomModal title="Connect To Wallet" visible={visible} footer="" onCancel={close}>
        <Line />
        {SUPPORT_WALLETS.filter(o => !o.disable).map(wallet => (
          <WalletItem wallet={wallet} key={wallet.name} />
        ))}
      </CustomModal>
    </WalletSelectionModalContext.Provider>
  )
}

const useWalletSelectionModal = () => {
  return useContext(WalletSelectionModalContext)
}

export { WalletSelectionModalProvider, useWalletSelectionModal }
