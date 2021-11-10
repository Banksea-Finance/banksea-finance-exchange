import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { Button, Progress, Statistic } from 'antd'
import { useHistory } from 'react-router-dom'
import {
  dashboardMortgageAvailable,
  dashboardMortgageMortgaged,
  dashboardMortgagePreorder,
  dashboardUser
} from '@/apis/pool'
import PageLoading from '@/components/PageLoding'
import VariableAPY from '@/components/EchartsStatistics/VariableAPY'
import myDashboard1 from '@/assets/images/mockImg/myDashboard1.png'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

const MyDashboardContainer = styled.div`
  width: 135.6rem;
  margin-left: calc((100% - 135.6rem) / 2);
  display: none;
  padding-top: 8rem;

  &.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MyDashboardData = styled.div`
  display: flex;
  justify-content: space-between;
`

const Deposits = styled.div`
  width: 67.1rem;

  .depositArea {
    height: 28rem;
    background: #101D44;
    border-radius: 1.5rem;
    position: relative;
  }
`

const Borrow = styled.div`
  width: 67.1rem;

  .borrowArea {
    height: 28rem;
    background: #101D44;
    border-radius: 1.5rem;
    position: relative;
  }
`

const ProgressArea = styled(Progress)`
  position: absolute;
  right: 3rem;
`

const AreaTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00D4D7, #5D00B3);
`

const BorrowInformation = styled.div`
  height: 21.9rem;
  display: flex;
  align-items: center;
`

const BorrowInformationLeft = styled.div`
  padding: 1.5rem 3.5rem;

  .left-text-main {
    display: flex;
    align-items: center;

    .left-text-column {
      height: 20rem;

      .left-text-line-item {
        margin-right: 5rem;
        margin-top: 1.5rem;

        p {
          color: #fff;
        }

        p:nth-of-type(2) {
          font-size: 1.7rem;
          font-weight: bolder;
        }
      }

      .left-text-line-item-health {
        margin-top: 1.5rem;

        p {
          color: #88D12E;
        }

        p:nth-of-type(2) {
          font-size: 1.7rem;
          font-weight: bolder;
        }
      }
    }

    .ant-progress-circle .ant-progress-text {
      font-size: 1.4rem;
      color: #fff;
    }
  }
`

const MyAccessTable = styled.div`
  &:nth-of-type(2) {
    margin-top: 1rem;
  }
`

const MyAccessTableYop = styled.div`
  width: 100%;
  display: flex;

  div {
    color: #B3B3B3;
    font-size: 1.4rem;
    font-weight: bolder;
  }

  div:nth-of-type(1) {
    width: 30%;
    padding-left: 1rem;
  }

  div:nth-of-type(2), div:nth-of-type(3) {
    width: 22%;
    text-align: center;
  }
`

const MyAccessTableMain = styled.div`

  .allCoin-table-item {
    width: 100%;
    height: 4rem;
    background: #3658A7;
    border: none;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    cursor: pointer;

    div {
      color: #ffffff;
    }

    div:nth-of-type(1) {
      width: 30%;
    }

    div:nth-of-type(2), div:nth-of-type(3) {
      width: 22%;
    }

    div:nth-of-type(4) {
      width: 10%;
      cursor: pointer;
    }

    div:nth-of-type(5) {
      width: 10%;
      margin-left: 1rem;
      cursor: pointer;
    }

    .assets {
      font-size: 1.4rem;
      padding-left: 1rem;
      display: flex;
    }

    .universal-item-text {
      text-align: center;

      p {
        margin: 0;
      }

      p:nth-of-type(1) {
        font-size: 1.4rem;
      }

      p:nth-of-type(2) {
        font-size: 1.2rem;
      }
    }

    .collateral {

      .checked {
        margin-right: 0.5rem;
        color: #fff;
      }

      .ant-switch-checked {
        background-color: #88D12E;
      }
    }
  }
`

const DepositButton = styled.div`
  width: 5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  background: #234890;
  border-radius: 0.5rem;
  transition: all 0.5s;

  &:hover {
    background: rgba(35,72,144,0.8);
  }
`

const NFTMortgagesContainer = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
  margin-top: 2rem;
`

const NFTMortgagesMain = styled.div`
  width: 100%;
  display: flex;
  padding: 3rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  .mortgages-item {
    width: 16.2rem;
    border-radius: 1rem;
    background: #3658A7;
    margin-left: 3.3rem;

    .mortgages-item-image {
      height: 17rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      position: relative;

      @keyframes rotate {
        100% {
          transform: rotate(1turn);
        }
      }

      .conic {
        position: relative;
        z-index: 0;
        width: 8rem;
        height: 3rem;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 0.5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-color: #00FFFF;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(transparent, #5D00B3, transparent 30%);
          animation: rotate 4s linear infinite;
        }

        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 4px;
          top: 4px;
          width: calc(100% - 8px);
          height: calc(100% - 8px);
          background: #FFFFFF;
          border-radius: 0.4rem;
        }

        .ant-statistic-content-value {
          font-size: 1.4rem;
          font-weight: bolder;
          color: #5D00B3;
        }

        .ant-statistic-content {
          font-size: 0;
        }
      }

      @keyframes opacityChange {
        50% {
          opacity: .5;
        }
        100% {
          opacity: 1;
        }
      }

      img {
        object-fit: cover;
        width: 18.2rem;
        height: 100%;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }

    .mortgages-item-text {
      padding: 1rem 1rem;

      .mortgages-item-text-name {
        color: #fff;
      }
    }
  }
`


const MortgagesItemText = styled.div`
  margin-top: 0.5rem;

  .message-name {
    color: #85A9E7;
  }

  .message-number {
    font-size: 1.7rem;
    font-weight: bolder;
    color: #fff;
  }
`

const WithdrawButton = styled(Button)`
  width: 12.7rem;
  height: 3.7rem;
  margin-left: calc((100% - 12.7rem) / 2);
  background: #6C48FF;
  color: #fff;
  border-radius: 1rem;
  border: none;
  margin-top: 1rem;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const NFTMortgagesLiquidation = styled.div`
  width: 100%;
  height: 48rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
`

const DepositInformationArea: React.FC<{ userInfo: any, depositList: any }> = ({ userInfo, depositList }) => {
  const history = useHistory()
  return (
    <Deposits>
      <div className="depositArea">
        <AreaTitle>Deposit information</AreaTitle>
        <Line />
        <BorrowInformation>
          <BorrowInformationLeft>
            <div className="left-text-main">
              <div className="left-text-column">
                <div className="left-text-line-item">
                  <p>Approximate balance</p>
                  <p>$ {userInfo?.approximateBalance} USD</p>
                </div>
                <div className="left-text-line-item">
                  <p>Deposit Interest</p>
                  <p>10%</p>
                </div>
                <div className="left-text-line-item">
                  <p>Deposit rate</p>
                  <p>2.44%</p>
                </div>
              </div>
              <div style={{ width: '400px' }}>
                <VariableAPY />
              </div>
            </div>
          </BorrowInformationLeft>
        </BorrowInformation>
      </div>
      <MyAccessTable>
        <MyAccessTableYop>
          <div>My deposits</div>
          <div>Current balance</div>
          <div>APY</div>
        </MyAccessTableYop>
        <MyAccessTableMain>
          {
            depositList?.map((item: any, index: number) => (
              <div key={index} className="allCoin-table-item">
                <div className="assets">
                  <img
                    src={item?.assetsImage}
                    alt=""
                    style={{ width: '2.2rem', marginRight: '0.8rem' }}
                  />
                  {item?.poolName}
                </div>
                <div className="universal-item-text">
                  <p>{item?.deposited}</p>
                  <p>{item?.depositedUSD}</p>
                </div>
                <div className="universal-item-text">
                  <p>{item?.depositApy}</p>
                </div>
                <DepositButton onClick={() => history.push(`/pools/deposit/detail/${item?.id}`)}>Deposit</DepositButton>
                <DepositButton onClick={() => history.push(`/pools/withdraw/detail/${item?.id}`)}>Withdraw</DepositButton>
              </div>
            ))
          }
        </MyAccessTableMain>
      </MyAccessTable>
    </Deposits>
  )
}

const BorrowInformationArea: React.FC<{ userInfo: any, borrowList: any }> = ({ userInfo, borrowList }) => {

  const history = useHistory()

  return (
    <Borrow>
      <div className="borrowArea">
        <AreaTitle>Borrow information</AreaTitle>
        <Line />
        <BorrowInformation>
          <BorrowInformationLeft>
            <div className="left-text-main">
              <div className="left-text-column">
                <div className="left-text-line-item">
                  <p>My borrowed</p>
                  <p>$ {userInfo?.borrowed} ETH</p>
                </div>
                <div className="left-text-line-item">
                  <p>My collateral</p>
                  <p>$110.500 ETH</p>
                </div>
                <div className="left-text-line-item">
                  <p>Current LTV</p>
                  <p>{userInfo?.currentLtv ? userInfo?.currentLtv : '---'}</p>
                </div>
              </div>
              <div className="left-text-column">
                <div className="left-text-line-item-health">
                  <p>Health factor</p>
                  <p>{userInfo?.healthFactor ? userInfo?.healthFactor : '---'}</p>
                </div>
                <div className="left-text-line-item">
                  <p>Borrowing Power Used</p>
                  <p>{userInfo?.borrowUsed ? userInfo?.borrowUsed : '---'}</p>
                </div>
              </div>
              <ProgressArea type="circle"
                width={130}
                strokeColor={'#88D12E'}
                percent={30}
                format={() => 'Borrow Composition'}
              />
            </div>
          </BorrowInformationLeft>
        </BorrowInformation>
      </div>
      <MyAccessTable>
        <MyAccessTableYop>
          <div>My borrows</div>
          <div>Borrowed</div>
          <div>APY</div>
        </MyAccessTableYop>
        <MyAccessTableMain>
          {
            borrowList?.map((item: any, index: number) => (
              <div key={index} className="allCoin-table-item">
                <div className="assets">
                  <img
                    src={item?.assetsImage}
                    alt=""
                    style={{ width: '2.4rem', height: '2.4rem', marginRight: '0.8rem' }}
                  />
                  {item?.poolName}
                </div>
                <div className="universal-item-text">
                  <p>{item?.borrowed}</p>
                  <p>{item?.borrowedUSD}</p>
                </div>
                <div className="universal-item-text">
                  <p>{item?.variableBorrowApy * 100}%</p>
                </div>
                <DepositButton onClick={() => history.push(`/pools/borrow/detail/${item?.id}`)}>Borrow</DepositButton>
                <DepositButton onClick={() => history.push(`/pools/repay/detail/${item?.id}`)}>Repay</DepositButton>
              </div>
            ))
          }
        </MyAccessTableMain>
      </MyAccessTable>
    </Borrow>
  )
}

const NFTAvailableMortgages: React.FC<{ mortgageAvailable: any }> = ({ mortgageAvailable }) => {
  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <AreaTitle>My NFT</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        {
          mortgageAvailable?.map((item: any, index: number) => (
            <div key={index} className="mortgages-item">
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ {item?.price}</p>
                </MortgagesItemText>
                <WithdrawButton
                  onClick={() => history.push(`dashboard/available/detail/${item?.valueUri}`)}
                >Collateral
                </WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const NFTYourMortgage: React.FC<{ mortgageMortgaged: any }> = ({ mortgageMortgaged }) => {

  const history = useHistory()

  return (
    <NFTMortgagesContainer>
      <AreaTitle>My Collaterals</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        {
          mortgageMortgaged?.map((item: any, index: number) => (
            <div key={index} className="mortgages-item">
              <div className="mortgages-item-image">
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ {item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Collateral Rate:</p>
                  <p className="message-number">{item?.mortgageRate * 100}%</p>
                </MortgagesItemText>
                <WithdrawButton
                  onClick={() => history.push(`dashboard/redemption/detail/${item?.valueUri}`)}
                >redemption
                </WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const NFTLiquidation: React.FC = () => {

  const history = useHistory()

  const { Countdown } = Statistic
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

  return (
    <NFTMortgagesLiquidation>
      <AreaTitle>Liquidation prepayment</AreaTitle>
      <Line />
      <NFTMortgagesMain>
        {/*{*/}
        {/*  mortgagePreorder?.map((item: any, index: number) => (*/}
        {/*    <div key={index} className="mortgages-item">*/}
        {/*      <div className="mortgages-item-image">*/}
        {/*        <img src={item?.image} alt="" />*/}
        {/*      </div>*/}
        {/*      <div className="mortgages-item-text">*/}
        {/*        <p className="mortgages-item-text-name">{item?.name}</p>*/}
        {/*        <MortgagesItemText>*/}
        {/*          <p className="message-name">Values:</p>*/}
        {/*          <p className="message-number">$ {item?.price}</p>*/}
        {/*        </MortgagesItemText>*/}
        {/*        <MortgagesItemText>*/}
        {/*          <p className="message-name">Collateral Rate:</p>*/}
        {/*          <p className="message-number">{item?.mortgageRate}</p>*/}
        {/*        </MortgagesItemText>*/}
        {/*        <WithdrawButton>Cancel pre-purchase</WithdrawButton>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))*/}
        {/*}*/}
        {
          new Array(4).fill((
            <div className="mortgages-item">
              <div className="mortgages-item-image">
                <div className="conic">
                  <Countdown value={deadline} />
                </div>
                <img src={myDashboard1} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">CryptoPunk #8761</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ 0</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Collateral Rate:</p>
                  <p className="message-number">10%</p>
                </MortgagesItemText>
                <WithdrawButton
                  onClick={() => history.push('dashboard/liquidation/cancel/detail/11')}
                >Cancel
                </WithdrawButton>
              </div>
            </div>
          ))
        }
      </NFTMortgagesMain>
    </NFTMortgagesLiquidation>
  )
}

const MyDashboardPage: React.FC = () => {
  const { account } = useSolanaWeb3()
  const walletAddress = account?.toBase58()

  const [userInfo, setUserInfo] = useState()
  const [mortgageAvailable, setMortgageAvailable] = useState()
  const [mortgageMortgaged, setMortgageMortgaged] = useState()
  const [, setMortgagePreorder] = useState()
  const [depositList, setDepositList] = useState<any>()
  const [borrowList, setBorrowList] = useState<any>()
  const [isLoading, setLoading] = useState<boolean>(true)

  const init = useCallback(async () => {
    await Promise.all([
      dashboardUser({ walletAddress }).then(res => {
        setUserInfo(res.data.data.userInfo)
        setDepositList(res.data.data.userDepositList)
        setBorrowList(res.data.data.userBorrowList)
      }),

      dashboardMortgageAvailable({ walletAddress }).then(res => {
        setMortgageAvailable(res.data.data)
      }),

      dashboardMortgageMortgaged({ walletAddress }).then(res => {
        setMortgageMortgaged(res.data.data)
      }),

      dashboardMortgagePreorder({ walletAddress }).then(res => {
        setMortgagePreorder(res.data.data)
      })
    ])

    setLoading(false)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <MyDashboardContainer className={clsx('active')}>
      {
        !isLoading ?
          <div>
            <MyDashboardData>
              <DepositInformationArea userInfo={userInfo} depositList={depositList} />
              <BorrowInformationArea userInfo={userInfo} borrowList={borrowList} />
            </MyDashboardData>
            <NFTAvailableMortgages mortgageAvailable={mortgageAvailable} />
            <NFTYourMortgage mortgageMortgaged={mortgageMortgaged} />
            <NFTLiquidation />
          </div> :
          <PageLoading />
      }
    </MyDashboardContainer>
  )
}

export default MyDashboardPage
