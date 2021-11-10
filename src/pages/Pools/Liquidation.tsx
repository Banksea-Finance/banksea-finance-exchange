import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import { Button, Statistic } from 'antd'
import { useHistory } from 'react-router-dom'
import { liquidationList } from '@/apis/pool'
import PageLoading from '@/components/PageLoding'
import { SearchOutlined } from '@ant-design/icons'
import { ThemeInput } from '@/styles/ThemeInput'
import { LiquidationSelector } from '@/components/NFTListSelectors'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

const MortgageMain = styled.div`
  display: none;
  width: 126rem;
  min-height: 100vh;
  margin-left: calc((100% - 126rem) / 2);
  padding-top: 8rem;

  &.active {
    display: block;
  }

  p {
    margin: 0;
  }
`

const MortgageMainLeft = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  margin-top: 1rem;
  float: left;
  margin-bottom: 14rem;
`

const AreaTitle = styled.div`
  padding: 1rem 2rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const SerialsTop = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding-right: 3rem;
  margin-top: 3rem;
  position: relative;

  .search {
    width: 38rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 3rem;
  }
`

const NFTMortgagesContainer = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  padding-bottom: 3rem;
`

const NFTMortgagesMain = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0 3rem;

  .mortgages-item {
    width: 20.2rem;
    border-radius: 1rem;
    background: #3658A7;
    margin-top: 3rem;

    .mortgages-item-image {
      height: 20.2rem;
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
        width: 10rem;
        height: 3.5rem;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 0.5rem;
        overflow: hidden;
        padding: 2rem;
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
        height: 100%;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }

    .mortgages-item-text {
      padding: 1rem 1rem;

      .mortgages-item-text-name {
        font-weight: bolder;
        color: #fff;
      }
    }
  }
`

const MortgagesItemText = styled.div`
  margin-top: 0.5rem;

  .message-name {
    font-weight: bolder;
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
  margin-bottom: 2rem;
  transition: all 0.7s;
  font-size: 1.7rem;
  font-weight: bolder;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const NFTMortgages: React.FC<{ data: any }> = ({ data }) => {

  const history = useHistory()

  const { Countdown } = Statistic
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

  return (
    <NFTMortgagesContainer>
      <NFTMortgagesMain>
        {
          data?.map((item: any, index: number) => (
            <div key={index}
              className="mortgages-item"
            >
              <div className="mortgages-item-image">
                <div className="conic">
                  <Countdown value={deadline} />
                </div>
                <img src={item?.image} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">{item?.name}</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">{item?.price}</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Collateral Rate:</p>
                  <p className="message-number">{item?.mortgageRate * 100}%</p>
                </MortgagesItemText>
              </div>
              <WithdrawButton
                onClick={() => history.push(`/pools/liquidation/detail/${item.id}`)}
              >Prepay
              </WithdrawButton>
            </div>
          ))
        }
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
      </NFTMortgagesMain>
    </NFTMortgagesContainer>
  )
}

const LiquidationListPage: React.FC = () => {
  const { account } = useSolanaWeb3()

  const [data, setData] = useState<any>()

  const [isLoading, setLoading] = useState<boolean>(true)

  const init = useCallback(async () => {
    await liquidationList({ walletAddress: account?.toBase58() }).then(res => {
      setData(res.data.data)
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <MortgageMain className={clsx('active')}>
      {
        !isLoading ?
          <MortgageMainLeft>
            <AreaTitle>Liquidation list</AreaTitle>
            <Line />
            <SerialsTop>
              <div className="search">
                <ThemeInput
                  prefix={<SearchOutlined style={{ color: 'white', width: '1.5rem' }} />}
                  style={{ marginRight: '10px' }}
                />
                <LiquidationSelector />
              </div>
            </SerialsTop>
            <NFTMortgages data={data} />
          </MortgageMainLeft> :
          <PageLoading />
      }
    </MortgageMain>
  )
}

export default LiquidationListPage
