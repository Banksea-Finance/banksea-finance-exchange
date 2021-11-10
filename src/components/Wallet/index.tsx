import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import useMyWalletModal from '@/components/Wallet/MyWalletModal'

type CurrentAccountProps = {
  account: string
}

const WalletButton = styled(Button)`
  &,
  &:hover,
  &:active {
    width: fit-content;
    height: 3.5rem;
    background: #554BFF;
    border-radius: 1rem;
    border-color: #3a31bd;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
  }

  &:hover,
  &:active {
    background: #3a31bd;
  }

  @media screen and (max-width: 1000px) {
    &,
    &:hover,
    &:active {
      width: fit-content;
      height: 2.5rem;
      background: #554BFF;
      border-radius: 2rem;
      border-color: #3a31bd;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      text-align: center;
    }

  }
`

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

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account }) => {
  const { wallet } = useSolanaWeb3()
  const { modal, open } = useMyWalletModal()

  return (
    <WalletButton>
      <SCCurrentAccount>
        <div className="icon">
          <img src={wallet?.icon} alt="" />
        </div>
        <span onClick={open}>{`${account.substr(0, 5)}...${account.substr(-4, 4)}`}</span>
      </SCCurrentAccount>

      {modal}
    </WalletButton>
  )
}

const ConnectButton = () => {
  const { select } = useSolanaWeb3()

  return (
    <WalletButton onClick={select}>
      Connect
    </WalletButton>
  )
}

const Wallet: React.FC = () => {
  const { account } = useSolanaWeb3()

  return (
    <>
      {!account && <ConnectButton />}
      {!!account && <CurrentAccount account={account.toBase58()} />}
    </>
  )
}

export default Wallet
