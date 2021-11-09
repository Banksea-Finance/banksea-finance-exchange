import React from 'react'
import styled from 'styled-components'
import BankseaTextLogo from '@/assets/images/homePageImg/banksea.png'
import BankseaIconLogo from '@/assets/images/homePageImg/logo-icon.png'

import { Button, Popover } from 'antd'
import Wallet from '@/components/Wallet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccount } from '@/store/wallet'
import { MenuFoldOutlined, QuestionCircleFilled } from '@ant-design/icons'
import avatar1 from '@/assets/images/headAvatar/avatar1.png'
import avatar2 from '@/assets/images/headAvatar/avatar2.png'
import avatar3 from '@/assets/images/headAvatar/avatar3.png'
import avatar4 from '@/assets/images/headAvatar/avatar4.png'
import avatar5 from '@/assets/images/headAvatar/avatar5.png'
import avatar6 from '@/assets/images/headAvatar/avatar6.png'
import avatar7 from '@/assets/images/headAvatar/avatar7.png'
import avatar8 from '@/assets/images/headAvatar/avatar8.png'
import avatar9 from '@/assets/images/headAvatar/avatar9.png'
import avatar10 from '@/assets/images/headAvatar/avatar10.png'
import { useMediaQuery } from 'react-responsive'


const AppHeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 6.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
  border-bottom: solid 0.2rem #4D4D4D;
  z-index: 9999;
`

const ConnectButton = styled(Button)`
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

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 1.2rem;
  cursor: pointer;
`

const AvatarNone = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  margin-left: 1.2rem;
  background: url(${require('@/assets/images/headAvatar/user-avatar.svg').default}) no-repeat;
`

const AppHeader: React.FC<{ onCollapseChanged: () => void }> = ({ onCollapseChanged }) => {
  const history = useHistory()
  const account = useSelector(getAccount)
  const headerAvatar = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10
  ]

  const random = parseInt(String(10 * Math.random()))

  const headerImg = headerAvatar[random]

  const toPersonalPage = () => {
    history.push('/personal/home',
      { headerImg: headerImg }
    )
  }

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  return (
    <AppHeaderContainer>
      <Row>
        <MenuFoldOutlined
          onClick={onCollapseChanged}
          style={{
            position: 'relative',
            fontSize: '1.5rem',
            color: '#B2B2B2',
            display: 'flex',
            justifyContent: 'center',
            marginRight: '1.5rem'
          }}
        />
        <img
          src={isMobile ? BankseaIconLogo : BankseaTextLogo}
          alt="banksea"
          style={{ ...isMobile ? { width: '3.5rem' } : { width: '15.6rem', cursor: 'pointer' }, userSelect: 'none' }}
          onClick={() => history.push('')}
        />
      </Row>

      <Row>
        <Popover
          placement="bottom"
          title="Rinkeby Authenticated Faucet"
          content={
            <a
              href={'https://faucet.rinkeby.io'}
              rel="noreferrer"
              target="_blank"
            >
              https://faucet.rinkeby.io/
            </a>
          }
          trigger="click"
        >
          <QuestionCircleFilled style={isMobile ? { color: '#3A31BD', fontSize: '1.6rem', marginRight: '1rem' } : {
            color: '#7c6deb',
            fontSize: '2rem',
            marginRight: '2.5rem'
          }}
          />
        </Popover>
        <ConnectButton>
          <Wallet />
        </ConnectButton>
        {account ?
          <Avatar onClick={toPersonalPage} src={`${headerImg}`} /> :
          <AvatarNone />}
      </Row>
    </AppHeaderContainer>
  )
}

export default AppHeader
