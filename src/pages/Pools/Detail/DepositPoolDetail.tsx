import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'
import { useHistory, useParams } from 'react-router-dom'
import { Progress } from 'antd'
import VariableAPY from '@/components/EchartsStatistics/VariableAPY'
import { depositPoolsDetail, depositPoolUser } from '@/apis/pool'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

const StoragePoolMain = styled.div`
  width: 130rem;
  min-height: 100vh;
  margin-left: calc((100% - 130rem) / 2);
  padding-top: 8rem;

  p {
    margin: 0;
  }
`

const ConfigurationMain = styled.div`
  width: 80rem;
  height: 63rem;
  background: #101D44;
  border-radius: 1.5rem;
`

const AreaTitle = styled.div`
  padding: 2rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
  position: relative;

  .configuration-top-title {
    margin-left: 3rem;
  }
`

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const BackIconButton = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #284779;
  transition: all 0.7s;

  &:hover {
    background: #6C48FF;
  }
`

const ConfigurationData = styled.div`
  height: 15rem;
  display: flex;
  justify-content: center;
  margin-top: 0;
`

const TotalBorrowed = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 30rem;
  margin-right: 3rem;

  .totalBorrowed-title {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;

    div {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1.5rem;
      background: #FFBB00;
      margin-right: 2rem;
    }

    span {
      font-size: 2rem;
      color: #B5B6B7;
      font-weight: bolder;
    }
  }

  .totalBorrowed-number {
    font-size: 2.8rem;
    color: #fff;
    font-weight: bolder;
    position: absolute;
    top: 6rem;
    right: 0;
  }

  .totalBorrowed-dollar {
    font-size: 1.6rem;
    color: #B5B6B7;
    position: absolute;
    top: 10rem;
    right: 0;
  }
`

const IconImg = styled.img`
  width: 4.2rem;
  position: absolute;
  right: 1rem;
  top: calc((100% - 4.2rem) / 2);
`

const AvailableLiquidity = styled.div`
  position: relative;
  margin-top: 3rem;
  width: 30rem;
  margin-left: 3rem;

  .availableLiquidity-title {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;

    div {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 1.5rem;
      background: #6C48FF;
      margin-left: 2rem;
    }

    span {
      font-size: 2rem;
      color: #B5B6B7;
      font-weight: bolder;
    }
  }

  .availableLiquidity-number {
    font-size: 2.8rem;
    color: #fff;
    font-weight: bolder;
    position: absolute;
    top: 6rem;
    left: 0;
  }

  .availableLiquidity-dollar {
    font-size: 1.6rem;
    color: #B5B6B7;
    position: absolute;
    top: 10rem;
    left: 0;
  }
`

const ReserveUtilisation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;

  .reserveUtilisation-item {
    width: 25rem;
    padding: 0.5rem 1rem;
    border: 2px solid #8D9099;
    color: #8D9099;
    border-radius: 1rem;
    position: relative;
    display: flex;

    &:nth-of-type(2) {
      margin-left: 3rem;
    }

    .reserveUtilisation-item-numer {
      position: absolute;
      right: 1rem;
    }
  }
`

const DepositStableVariableMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`

const Deposit = styled.div`
  width: 25rem;
  height: 13rem;
  border-radius: 1rem;
  background: #182C58;

  .deposit-top {
    padding: 0.5rem 2rem;
    background: #6C48FF;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
  }
`

const DepositStableText = styled.div`
  padding: 1rem 2rem;
`

const DepositStableTextItem = styled.div`
  position: relative;

  &:nth-of-type(2) {
    margin-top: 1rem;
  }

  span:nth-of-type(1) {
    color: #BBBBBB;
  }

  span:nth-of-type(2) {
    color: #fff;
    position: absolute;
    right: 0;
  }
`

const Variable = styled.div`
  width: 25rem;
  height: 13rem;
  border-radius: 1rem;
  background: #182C58;
  margin-left: 1.4rem;

  .variable-top {
    padding: 0.5rem 2rem;
    background: #F172ED;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    color: #fff;
  }
`

const IndexValueMain = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const IndexValueItem = styled.div`
  text-align: center;

  &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5) {
    margin-left: 3rem;
  }

  .indexValue-item-name {
    color: #BBBBBB;
  }

  .indexValue-item-value {
    color: #fff;
    font-weight: bolder;
    font-size: 1.7rem;
  }

  .indexValue-item-state {
    font-weight: bolder;
    font-size: 1.7rem;
  }
`

const YourInformationMain = styled.div`
  width: 48.6rem;
  background: #101D44;
  border-radius: 1.5rem;
  margin-left: 1.4rem;
`

const YourInformationContainer = styled.div`
  padding: 3rem 3rem;
`

const InformationValues = styled.div`
  padding: 4rem 0;
`

const DepositsValuesItem = styled.div`
  margin-top: 1rem;
  position: relative;

  .depositValues-item-name {
    color: #9FC4FD;
    font-size: 1.7rem;
  }

  .depositValues-item-value {
    color: #fff;
    font-size: 1.7rem;
    font-weight: bolder;
    position: absolute;
    right: 0;
  }

  .depositValues-item-health {
    color: #88D12E;
    font-size: 1.7rem;
    font-weight: bolder;
    position: absolute;
    right: 0;
  }
`

const ColumnLine = styled.div`
  width: 100%;
  height: 0.1rem;
  background: #fff;
  margin-top: 3rem;
`

const BorrowsValues = styled.div`
  padding: 4rem 0;
`

const IndexValueStatisticsMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 4rem;

  .indexValueStatistics-item {
    width: 42rem;
    background: #101D44;
    border-radius: 1.5rem;

    .statistics-container {
      padding: 0 2rem;
      margin-top: -3rem;
    }
  }
`

const StatisticsTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  font-weight: bolder;
  display: flex;
  align-items: center;
`

const BackIcon:React.FC = () => {
  const history = useHistory()
  return (
    <BackIconButton onClick={() => history.goBack()}>
      <LeftOutlined style={{ fontSize: '1.6rem', color: '#fff' }} />
    </BackIconButton>
  )
}

const IndexValue:React.FC<{ poolDetailData: any }> = ({ poolDetailData }) => {
  return (
    <IndexValueMain>
      <IndexValueItem>
        <div className="indexValue-item-name">Maximum LTV</div>
        <div className="indexValue-item-value">{poolDetailData?.maximumLtv}</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Liquidation threshold</div>
        <div className="indexValue-item-value">{poolDetailData?.liquidationThreshold}</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Liquidation penalty</div>
        <div className="indexValue-item-value">{poolDetailData?.liquidationPenalty}</div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Used as collateral</div>
        <div className="indexValue-item-state"
          style={{ color: poolDetailData?.mortgage ? 'green' : '#F172ED' }}
        >
          {String(poolDetailData?.mortgage)}
        </div>
      </IndexValueItem>
      <IndexValueItem>
        <div className="indexValue-item-name">Stable borrowing</div>
        <div className="indexValue-item-state"
          style={{ color: poolDetailData?.stableBorrow ? 'green' : '#F172ED' }}
        >
          {String(poolDetailData?.stableBorrow)}
        </div>
      </IndexValueItem>
    </IndexValueMain>
  )
}

const DepositStableVariable:React.FC<{ poolDetailData: any }> = ({ poolDetailData }) => {
  return (
    <DepositStableVariableMain>
      <Deposit>
        <div className="deposit-top">Deposit</div>
        <DepositStableText>
          <DepositStableTextItem>
            <span>Deposit APY</span>
            <span>{poolDetailData?.depositApy}</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Past 30D Avg</span>
            <span>--</span>
          </DepositStableTextItem>
        </DepositStableText>
      </Deposit>
      <Variable>
        <div className="variable-top">Borrowing</div>
        <DepositStableText>
          <DepositStableTextItem>
            <span>Borrow APY</span>
            <span>2.8%</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>Past 30D Avg.</span>
            <span>--</span>
          </DepositStableTextItem>
          <DepositStableTextItem>
            <span>% over total</span>
            <span>--</span>
          </DepositStableTextItem>
        </DepositStableText>
      </Variable>
    </DepositStableVariableMain>
  )
}

const YourInformation:React.FC<{ poolUserData: any }> = ({ poolUserData }) => {

  return (
    <YourInformationMain>
      <AreaTitle>Your information</AreaTitle>
      <Line />
      <YourInformationContainer>
        <InformationValues>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Deposit</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Your wallet balance</span>
            <span className="depositValues-item-value">{poolUserData?.walletBalance}</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">You already deposited</span>
            <span className="depositValues-item-value">{poolUserData?.deposited}{poolUserData?.unit}</span>
          </DepositsValuesItem>
        </InformationValues>
        <ColumnLine />
        <BorrowsValues>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Borrows</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Borrowed</span>
            <span className="depositValues-item-value">{poolUserData?.borrowed}{poolUserData?.unit}</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Health factor</span>
            <span className="depositValues-item-health">{poolUserData?.healthFactor ? poolUserData?.healthFactor : '- - -'}</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">loan to value</span>
            <span className="depositValues-item-health">{poolUserData?.loanValue ? poolUserData?.loanValue : '- - -'}</span>
          </DepositsValuesItem>
          <DepositsValuesItem>
            <span className="depositValues-item-name">Available to you</span>
            <span className="depositValues-item-health">{poolUserData?.available}{poolUserData?.unit}</span>
          </DepositsValuesItem>
        </BorrowsValues>
      </YourInformationContainer>
    </YourInformationMain>
  )
}

const IndexValueStatistics:React.FC = () => {
  return (
    <IndexValueStatisticsMain>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Variable APY</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Deposit APY</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Utilisation Rate</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
    </IndexValueStatisticsMain>
  )
}

const DepositPoolDetailPage:React.FC = () => {
  const { id } = useParams<any>()

  const { account } = useSolanaWeb3()

  const [poolDetailData, setPoolDetailData] = useState<any>()
  const [poolUserData, setPoolUserData] = useState<any>()

  const init = useCallback(async () => {
    const t = setInterval(async () => {
      await depositPoolsDetail({ id: id }).then(res => {
        setPoolDetailData(res.data.data)
      })
    }, 1000)

    await depositPoolUser({
      walletAddress: account?.toBase58(),
      poolId: id
    }).then(res => {
      setPoolUserData(res.data.data)
    })

    return () => {
      clearTimeout(t)
    }
  },[])

  useEffect(() => {
    init()
  },[init])

  return (
    <StoragePoolMain>
      <div style={{ display: 'flex' }}>
        <ConfigurationMain>
          <div className="configuration-top">
            <AreaTitle>
              <BackIcon />
              <span className="configuration-top-title">Availble to deposit</span>
              <IconImg
                src={poolDetailData?.assetsImage}
                alt="ETH"
              />
            </AreaTitle>
          </div>
          <Line />
          <Progress
            strokeColor={'#FFBB00'}
            trailColor={'#6C48FF'}
            percent={50}
            format={() => ''}
            style={{ marginLeft: '2rem' }}
          />
          <ConfigurationData>
            <TotalBorrowed>
              <div className="totalBorrowed-title">
                <div />
                <span>Total Borrowed</span>
              </div>
              <p className="totalBorrowed-number">{Number(poolDetailData?.totalBorrowed).toLocaleString()}</p>
              <p className="totalBorrowed-dollar">$874,993</p>
            </TotalBorrowed>
            <AvailableLiquidity>
              <div className="availableLiquidity-title">
                <span>Available Liquidity</span>
                <div />
              </div>
              <p className="availableLiquidity-number">{Number(poolDetailData?.availableLiquidity).toLocaleString()}</p>
              <p className="availableLiquidity-dollar">$874,993</p>
            </AvailableLiquidity>
          </ConfigurationData>
          <ReserveUtilisation>
            <div className="reserveUtilisation-item">
              <div className="reserveUtilisation-item-name">Reserve size</div>
              <div className="reserveUtilisation-item-numer">$994.445.656.24</div>
            </div>
            <div className="reserveUtilisation-item">
              <div className="reserveUtilisation-item-name">Utilisation rate</div>
              <div className="reserveUtilisation-item-numer">{poolDetailData?.utilizationRate}</div>
            </div>
          </ReserveUtilisation>
          <DepositStableVariable poolDetailData={poolDetailData} />
          <IndexValue poolDetailData={poolDetailData} />
        </ConfigurationMain>
        <YourInformation poolUserData={poolUserData} />
      </div>
      <IndexValueStatistics />
    </StoragePoolMain>
  )
}

export default DepositPoolDetailPage
