import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import VariableAPY from '../../../components/EchartsStatistics/VariableAPY'
// import DepositAPY from '../../../components/EchartsStatistics/DepositAPY'
// import UtilisationRate from '../../../components/EchartsStatistics/UtilisationRate'
import myDashboard1 from '../../../assets/images/mockImg/myDashboard1.png'


const MortgagePoolDetailMain = styled.div`
  min-height: 100vh;
  width: 130rem;
  margin-left: calc((100% - 130rem) /2);
  padding-top: 8rem;

  p {
    margin: 0;
  }
`

const MortgageDetailSeriesTop = styled.div`
  width: 130rem;
  margin-left: calc((100% - 130rem) / 2);

  .mainSeries {
    display: flex;
    margin-top: 2rem;

    .mainSeries-Img {
      width: 18rem;
      height: 20rem;

      img {
        width: 18rem;
        height: 20rem;
        border-radius: 4px;
        object-fit: cover;
      }
    }

    .mainSeries-main {
      margin-left: 2rem;

      .mainSeries-main-title {
        font-size: 2.4rem;
        color: #fff;
        font-weight: bolder;
      }
      .mainSeries-main-item {
        color: #ffffff;
        font-size: 17px;
        margin-top: 30px;
        font-weight: bolder;

        .mainSeries-main-item-name {
          font-size: 15px;

        }
        .mainSeries-main-item-num {
          margin-left: 10px;
        }
      }
    }
  }
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

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: linear-gradient(to right, #00FFFF, #5D00B3);
`

const StatisticsTitle = styled.div`
  padding: 1rem 2rem;
  color: #fff;
  font-weight: bolder;
  display: flex;
  align-items: center;
`

const NFTMortgagesLiquidation = styled.div`
  width: 100%;
  background: #101D44;
  border-radius: 1.5rem;
  margin-bottom: 1.4rem;
`

const NFTLiquidationMortgagesMain = styled.div`
  padding: 3rem;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .mortgages-item {
    width: 16.2rem;
    border-radius: 1rem;
    background: #3658A7;

    .mortgages-item-image {
      height: 17rem;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;

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

const AreaTitle = styled.div`
  padding: 1rem 3.5rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: bolder;
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

const BackIcon:React.FC = () => {
  const history = useHistory()
  return (
    <BackIconButton onClick={() => history.goBack()}>
      <LeftOutlined style={{ fontSize: '1.6rem', color: '#fff' }} />
    </BackIconButton>
  )
}

const IndexValueStatistics:React.FC = () => {
  return (
    <IndexValueStatisticsMain>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Collateral number</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Collateral rate</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
      <div className="indexValueStatistics-item">
        <StatisticsTitle>Borrow Rate</StatisticsTitle>
        <Line />
        <div className="statistics-container">
          <VariableAPY />
        </div>
      </div>
    </IndexValueStatisticsMain>
  )
}

const NFTSeriesList:React.FC = () => {
  return (
    <NFTMortgagesLiquidation>
      <AreaTitle>Liquidation prepayment</AreaTitle>
      <Line />
      <NFTLiquidationMortgagesMain>
        {
          new Array(4).fill((
            <div className="mortgages-item">
              <div className="mortgages-item-image">
                <img src={myDashboard1} alt="" />
              </div>
              <div className="mortgages-item-text">
                <p className="mortgages-item-text-name">CryptoPunk 7804</p>
                <MortgagesItemText>
                  <p className="message-name">Values:</p>
                  <p className="message-number">$ 6.5M</p>
                </MortgagesItemText>
                <MortgagesItemText>
                  <p className="message-name">Mortgage Rate:</p>
                  <p className="message-number">45.7%</p>
                </MortgagesItemText>
              </div>
            </div>
          ))
        }
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
        <div className="mortgages-item" style={{ height: 0 }} />
      </NFTLiquidationMortgagesMain>
    </NFTMortgagesLiquidation>
  )
}


const MortgagePoolDetailPage:React.FC = () => {
  return (
    <MortgagePoolDetailMain>
      <MortgageDetailSeriesTop>
        <BackIcon />
        <div className="mainSeries">
          <div className="mainSeries-Img">
            <img src={myDashboard1} alt="" />
          </div>
          <div className="mainSeries-main">
            <div className="mainSeries-main-title">
              CryptoPunks
            </div>
            <div className="mainSeries-main-item">
              <span className="mainSeries-main-item-name">total number :</span>
              <span className="mainSeries-main-item-num">122</span>
            </div>
            <div className="mainSeries-main-item">
              <span className="mainSeries-main-item-name">total value :</span>
              <span className="mainSeries-main-item-num">$1223</span>
            </div>
            <div className="mainSeries-main-item">
              <span className="mainSeries-main-item-name">Number of holding addresses :</span>
              <span className="mainSeries-main-item-num">122</span>
            </div>
          </div>
        </div>
      </MortgageDetailSeriesTop>
      <IndexValueStatistics />
      <NFTSeriesList />
    </MortgagePoolDetailMain>
  )
}

export default MortgagePoolDetailPage
