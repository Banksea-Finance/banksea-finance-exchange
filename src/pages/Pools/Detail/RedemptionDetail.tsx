import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocationQuery } from '@/hooks/useLocationQuery'
import { CopyOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import myDashboard1 from '@/assets/images/mockImg/myDashboard1.png'
import { getNftFavoriteCount } from '@/apis/nft'
import DepositAPY from '@/components/EchartsStatistics/DepositAPY'
import { useRequestingModal } from '@/hooks/modals/stateModals/useRequestingModal'

const NFTMortgageDetailContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 30rem;
`

const Row = styled.div`
  display: flex;
  justify-content: center;

  .time {
    width: 100%;
    position: relative;

    .ant-statistic-content-value {
      position: absolute;
      right: 1rem;
      color: #fff;
      font-weight: bolder;
    }
  }
`

const LeftArea = styled.div`
  width: 26.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 1.3rem;
`

const ImageContainer = styled.div`
  width: 22.2rem;
  height: 28.4rem;
  position: relative;
  border: 1px solid #98BDF9;
  padding: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const RightArea = styled.div`
  width: 30.9rem;
  margin-left: 1.3rem;
  position: relative;
`

const NFTBaseInfoContainer = styled.div`
  width: 40rem;

  .nft-name {
    font-size: 4.5rem;
    font-weight: 550;
    color: #98BDF9;
  }

  .description {
    margin-top: 1.2rem;
    height: 12.5rem;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .info-row {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;

      &-label {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        padding-right: 1.4rem;
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 500;
        color: #98BDF9;
        line-height: 2.2rem;
        user-select: none;
      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #98BDF9;
        cursor: pointer;
      }


    }
  }

  .info-row-favorite {
    display: flex;
    justify-content: flex-end;
    margin-top: 6rem;

    .info-row-item-value {
      display: flex;
      justify-content: flex-end;
    }

    .icon-favorite {
      width: 2rem;
      height: 1.2rem;
      display: flex;
      align-self: center;
      margin-right: 0.4rem;
    }


  }

  .price-favorite-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    div {
      display: flex;
      color: #98BDF9;
      font-weight: 550;
    }

    .price {
      align-items: flex-end;
      line-height: 2.1rem;

      .price-label {
        font-size: 1.6rem;
        font-weight: bold;
        color: #98BDF9;
        margin-right: 0.8rem;
      }

      .price-value {
        font-size: 1.6rem;
      }
    }

    .info-name {
      display: flex;
      justify-content: flex-end;
      font-size: 1.6rem;
    }

  }
`

const NeuralNetworks = styled.div`
  display: flex;
  position: relative;

  .NeuralNetworksMain {
    margin-top: 2rem;
    padding: 1rem 0;

    .networksValue-name {
      color: #98BAF2;
      font-size: 2rem;
      font-weight: bolder;
      margin-top: 1rem;
    }

    .networksValue-value {
      width: 15rem;
      color: #fff;
      font-size: 2.4rem;
      font-weight: bolder;
      position: relative;
      display: flex;
      align-items: center;

      span:nth-of-type(2) {
        position: absolute;
        right: 0;
        font-size: 1.2rem;
        margin-left: 2rem;
      }
    }
  }
`

const StatisticsContainer = styled.div`

  .statistics-price {
    width: 100%;
    background: #101D44;
    border-radius: 1.5rem;
    margin-bottom: 1.4rem;
    margin-top: 2rem;
  }
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

const StatisticsMain = styled.div`
  padding: 2rem;
`

const ScheduleFirstCenter = styled.div`
  text-align: center;
  width: 60rem;
  margin-top: 2rem;
  margin-left: calc((100% - 60rem) / 2);

  .title {
    color: #F172ED;
    font-size: 2rem;
    font-weight: bolder;
    margin-bottom: 2rem;
  }

  .main-title {
    font-weight: bolder;
    font-size: 1.7rem;
    color: #fff;
    margin-bottom: 2rem;
  }
`

const ConfirmButton = styled(Button)`
  width: 16.9rem;
  height: 4.8rem;
  background: #554BFF;
  border-radius: 1rem;
  border: none;
  color: #fff;
  font-weight: bolder;
  font-size: 1.7rem;
  transition: all 0.7s;
  margin-top: 1rem;

  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const ScheduleFirst: React.FC = () => {

  const { requestingModal, openRequestingModal } = useRequestingModal()

  const confirm = () => {
    openRequestingModal()
  }

  return (
    <ScheduleFirstCenter>
      <div className="title">Redemption overview</div>
      <div className="main-title">
        Are you sure you want to prepay this NFT ？
      </div>
      <ConfirmButton onClick={confirm}>Confirm</ConfirmButton>
      {requestingModal}
    </ScheduleFirstCenter>
  )
}

const Statistics: React.FC = () => {
  return (
    <StatisticsContainer>
      <div className="statistics-price">
        <AreaTitle>Historical price</AreaTitle>
        <Line />
        <StatisticsMain>
          <DepositAPY />
        </StatisticsMain>
      </div>
      <ScheduleFirst />
    </StatisticsContainer>
  )
}

const NFTBaseInfo: React.FC = () => {
  const uri = useLocationQuery('uri')

  const [, setLikeNum] = useState<number>()

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <NFTBaseInfoContainer>
      <div className="nft-name">
        CryptoPunk #9027
      </div>
      <div className="info-row">
        <div className="info-row-item">
          <div className="info-row-item-label">Artist</div>
          <div className="info-row-item-value">
            0x211....3123
          </div>
          <CopyOutlined className="icon-copy" />
        </div>
      </div>
      <NeuralNetworks>
        <div className="NeuralNetworksMain">
          <div className="networksValue-name">Evaluation Value</div>
          <div className="networksValue-value">$ 78,983</div>
          <div className="networksValue-name">Mortgage Rate</div>
          <div className="networksValue-value">43.7%</div>
        </div>
        <div className="NeuralNetworksMain" style={{ marginLeft: '5rem' }}>
          <div className="networksValue-name">My collateral</div>
          <div className="networksValue-value">
            <span>3.11</span>
            <span style={{ color: '#2ec4b6' }}>↓2.1%</span>
          </div>
          <div className="networksValue-name">health factor</div>
          <div className="networksValue-value">
            <span>43.7%</span>
            <span style={{ color: '#e71d36' }}>↑2.1%</span>
          </div>
        </div>
      </NeuralNetworks>
    </NFTBaseInfoContainer>
  )
}

const RedemptionDetailPage: React.FC = () => {

  return (
    <NFTMortgageDetailContainer>
      <Row>
        <LeftArea>
          <ImageContainer>
            <img src={myDashboard1} alt="" />
          </ImageContainer>
        </LeftArea>
        <RightArea>
          <NFTBaseInfo />
        </RightArea>
        <div className="time" />
      </Row>
      <Statistics />
    </NFTMortgageDetailContainer>
  )
}

export default RedemptionDetailPage
