import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import MarketPage from './Market'
import MyDashboardPage from './MyDashboard'
import DepositPage from './Deposit'
import BorrowPage from './Borrow'
import coding from '@/assets/images/mockImg/coding.png'
import LiquidationListPage from './Liquidation'
import { Route, Switch, useHistory } from 'react-router-dom'
import DepositItemDetailPage from './Detail/DepositItemDetail'
import MortgagePoolDetailPage from './Detail/MortgagePoolDetail'
import DepositPoolDetailPage from './Detail/DepositPoolDetail'
import { poolsConnect } from '@/apis/pool'
import NFTMortgageDetailPage from './Detail/NFTPrepayDetail'
import AvailablePurchasePage from './Detail/AvailablePurchase'
import BorrowItemDetailPage from './Detail/BorrowItemDetail'
import WithdrawDetailPage from './Detail/WithdrawDetail'
import RepayDetailPage from './Detail/RepayDetail'
import RedemptionDetailPage from './Detail/RedemptionDetail'
import LiquidationCancelDetailPage from './Detail/LiquidationCancelDetail'
import { RouteComponentProps } from 'react-router'
import { Property } from 'csstype'
import { useMediaQuery } from 'react-responsive'
import { useSideBarCollapsed } from '@/store/app'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

export type PoolPageKeys =
  | 'market'
  | 'dashboard'
  | 'deposit'
  | 'borrow'
  | 'liquidation'
  | 'deposit/detail/:id'
  | 'market/mortgage/detail'
  | 'market/deposit/pool/:id'
  | 'liquidation/detail/:id'
  | 'borrow/detail/:id'
  | 'dashboard/available/detail/:uri'
  | 'withdraw/detail/:id'
  | 'repay/detail/:id'
  | 'dashboard/redemption/detail/:id'
  | 'dashboard/liquidation/cancel/detail/:id'


// eslint-disable-next-line no-unused-vars
const PAGE_BY_PAGE_KEYS: { [key in PoolPageKeys]?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> } = {
  'market': MarketPage,
  'dashboard': MyDashboardPage,
  'deposit': DepositPage,
  'borrow': BorrowPage,
  'liquidation': LiquidationListPage,
  'deposit/detail/:id': DepositItemDetailPage,
  'market/mortgage/detail': MortgagePoolDetailPage,
  'market/deposit/pool/:id': DepositPoolDetailPage,
  'liquidation/detail/:id': NFTMortgageDetailPage,
  'borrow/detail/:id': BorrowItemDetailPage,
  'dashboard/available/detail/:uri': AvailablePurchasePage,
  'withdraw/detail/:id': WithdrawDetailPage,
  'repay/detail/:id': RepayDetailPage,
  'dashboard/redemption/detail/:id': RedemptionDetailPage,
  'dashboard/liquidation/cancel/detail/:id': LiquidationCancelDetailPage
}

// eslint-disable-next-line no-unused-vars
const MENU_BY_PAGE_KEYS: { [key in PoolPageKeys]?: string } = {
  'market': 'MARKET',
  'dashboard': 'MY DASHBOARD',
  'deposit': 'DEPOSIT',
  'borrow': 'BORROW',
  'liquidation': 'LIQUIDATION',
}

const DEFAULT_ACTIVE_PAGE_KEY = 'market'

const PoolsContainer = styled.div`
  min-height: calc(100vh - 6.2rem);
  width: 100%;
  position: relative;

  .coding {
    width: 15rem;
    position: absolute;
    top: 6rem;
    right: 0;
    z-index: 1;
  }
`

const PoolsContainerMenu = styled.div<{ width: Property.Width, left: Property.Left }>`
  width: ${props => props.width};
  height: 6rem;
  background: #0D1B34;
  border-bottom: 1px solid #4D4E52;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: ${props => props.left};
  z-index: 9;

  .container-menu-main {
    width: 70rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bolder;

    .container-menu-item {
      height: 6rem;
      line-height: 6rem;
      color: #9EA0A3;
      cursor: pointer;
    }

    .tabs__link {
      color: #554BFF;
    }
  }
`

const PoolsPage: React.FC = () => {
  const history = useHistory()

  const moduleName = history.location.pathname.replace('/pools/', '').replace(/\/.+/, '')

  const { select, connected, account } = useSolanaWeb3()

  const init = useCallback(() => {
    if (!connected) {
      select()
    } else {
      poolsConnect({ walletAddress: account?.toBase58() })
    }
  }, [connected])

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (history.location.pathname === '/pools/*') {
      history.push(`/pools/${DEFAULT_ACTIVE_PAGE_KEY}`)
    }
  }, [history.location.pathname])

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  const sideBarCollapsed = useSideBarCollapsed()

  return (
    <PoolsContainer>
      <img className="coding" src={coding} alt="" />
      <PoolsContainerMenu
        width={isMobile ? '100vw': (sideBarCollapsed ? 'calc(100vw - 80px)': 'calc(100vw - 200px)')}
        left={isMobile ? '0': (sideBarCollapsed ? '80px': '200px')}
      >
        <div className="container-menu-main">
          {
            Object.entries(MENU_BY_PAGE_KEYS).map(([key, value]) => (
              <div
                className={clsx('container-menu-item', moduleName === key && 'tabs__link')}
                onClick={() => {
                  history.push(`/pools/${key}`)
                }}
                key={key}
              >
                {value}
              </div>
            ))
          }
        </div>
      </PoolsContainerMenu>

      <Switch>
        {
          Object.entries(PAGE_BY_PAGE_KEYS).map(([key, page]) => (
            <Route path={`/pools/${key}`} exact key={key} component={page} />
          ))
        }
      </Switch>
    </PoolsContainer>
  )
}

export default PoolsPage
