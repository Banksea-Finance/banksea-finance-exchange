import React, { CSSProperties } from 'react'
import styled from 'styled-components'

import Auction from '@/assets/images/homePageImg/auction-bg.svg'
import Splitting from '@/assets/images/homePageImg/splitting-bg.svg'
import Mortgage from '@/assets/images/homePageImg/mortgage-bg.svg'
import Liquidity from '@/assets/images/homePageImg/liquidity-bg.svg'
import RightArrow from '@/assets/images/homePageImg/right-arrow.svg'
import CornerFlag from '@/assets/images/homePageImg/corner-flag-ai.svg'
import { useHistory } from 'react-router-dom'
import NFTListItem from '../../components/NFTListItem'
import { useMediaQuery } from 'react-responsive'
import coding from '@/assets/images/mockImg/coding.png'
import { useHomeNFTsQuery } from '@/hooks/queries/useHomeNFTsQuery'

const HomePageContainer = styled.div`
  font-family: 'PingFang SC';
  width: 100%;
  position: relative;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: 200vh;
    padding: 0;
  }
`

const BodyContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 15vh 8vw;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
    padding: 6vh 1vw
  }
`

/*const HeadLine = styled.div`
  height: 30rem;
`

const MyCarousel = styled(Carousel)`
  height: 30rem;
`*/

const InfoContainer = styled.div`
  width: 100%;

  .row1 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    /*.nft-mortgage-container:hover {
      box-shadow: rgb(11, 234, 235) -0.3vw 0.3vw 0.3vw;
    }*/

    .nft-mortgage-container {
      position: relative;
      width: 30vw;
      height: 50vh;
      border-radius: 1.5vw;
      margin-bottom: 1vw;
      background: url(${require('../../assets/images/homePageImg/lend-borrow-bg.svg').default}) no-repeat;
      padding: 2.5vh 2.5vw;
      background-size: 100%;
      transition: all 1s;


      .main-title {
        color: black;
        font-size: 2.5vw;
        font-weight: 550;
        margin-bottom: 5vh;
      }

      .sub-title {
        margin-top: 4vh;
        color: black;
        font-size: 1.5vw;
        font-weight: 550;
      }

      .value {
        color: white;
        font-size: 2.5vw;
        font-weight: 550;
      }
    }

    .auction-and-splitting {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .info-panel:hover {
        background: #18284C;
        transition: all 1s;
      }

      .info-panel {
        padding: 2vw;
        position: relative;
        width: 30vw;
        height: 24vh;
        background: #111C3A;
        border-radius: 1.5vw;
        margin-bottom: 1vw;
        transition: all 1s;


        .main-title2 {
          color: #97BCF9;
          font-size: 2vw;
          font-weight: 550;
          margin-bottom: 1vh;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 1vw;
          font-weight: 400;
          margin-bottom: 1vh;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 1vh;
            color: #97BCF9;
            font-size: 1vw;
            font-weight: 400;
          }

          .value {
            margin-left: 1.2vw;
            color: #01F9FF;
            font-size: 1.5vw;
            font-weight: 550;
          }
        }

      }
    }
  }

  .row2 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    .info-panel:hover {
      background: #18284C;
    }

    .info-panel:active {
      background: #111C3A;
      border: solid 0.1rem #4E46EC;
    }

    .info-panel {
      padding: 2vw;
      position: relative;
      width: 30vw;
      height: 24vh;
      background: #111C3A;
      border-radius: 1.5vw;
      margin-bottom: 1vw;
      transition: all 1s;


      .main-title2 {
        color: #97BCF9;
        font-size: 2.5vw;
        font-weight: 550;
        margin-bottom: 1vh;
      }

      .sub-title2 {
        color: #97BCF9;
        font-size: 1vw;
        font-weight: 400;
        margin-bottom: 2vh;
      }

      .nft-values {
        display: flex;
        align-items: center;

        .sub-title2 {
          padding-top: 1vh;
          color: #97BCF9;
          font-size: 1vw;
          font-weight: 400;
        }

        .value {
          margin-left: 1.2vw;
          color: #01F9FF;
          font-size: 1.5vw;
          font-weight: 550;
        }
      }
    }
  }

  @media screen and (min-width: 300px) and (max-width: 600px) {
    position: relative;
    width: 100% !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 0;

    .row1, .row2 {
      position: relative;
      margin: 0 auto;
      justify-content: center;
      flex-direction: column;
      width: fit-content;
    }

    .nft-mortgage-container, .auction-and-splitting > .info-panel {
      width: 80vw!important;
    }

    .nft-mortgage-container {
      padding: 6vw 7vw !important;
      height: fit-content !important;

      .main-title {
        color: black;
        font-size: 7vw !important;
        font-weight: 550;
        margin-bottom: 0!important;
      }

      .sub-title {
        color: black;
        font-size: 5vw !important;
        font-weight: 550;
        margin-top: 6vw !important;
      }

      .value {
        color: white;
        font-size: 6vw !important;
        font-weight: 550;
      }

    }

    .auction-and-splitting {
      display: flex;
      flex-direction: column;
      width: fit-content;
      flex-wrap: wrap;


      .info-panel {
        padding: 6vw 7vw !important;
        position: relative;
        height: 35vw !important;
        background: #111C3A;
        border-radius: 4vw !important;
        margin-top: 5vw!important;



        .main-title2 {
          color: #97BCF9;
          font-size: 6vw !important;
          font-weight: 550;
          margin-bottom: 1.2vw;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 3.5vw !important;
          font-weight: 400;
          width: fit-content;
          margin-bottom:0;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 0 !important;
            color: #97BCF9 !important;
            font-size: 3.5vw !important;
            font-weight: 400;
          }

          .value {
            margin-left: 3vw !important;
            margin-bottom: 2vw;
            color: #01F9FF;
            font-size: 3.5vw !important;
            font-weight: 550;
          }
        }

      }
    }

    .row2 {
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: fit-content;


      .info-panel {
        padding: 6vw 7vw !important;
        position: relative;
        width: 80vw!important;
        height: 35vw !important;
        background: #111C3A;
        border-radius: 4vw;
        transition: all 1s;
        margin-top: 5vw !important;


        .main-title2 {
          color: #97BCF9;
          font-size: 5.5vw !important;
          font-weight: 550;
          margin-bottom: 1.2vw;
        }

        .sub-title2 {
          color: #97BCF9;
          font-size: 3.5vw !important;
          font-weight: 400;
          width: fit-content;
          margin-bottom: 1vw !important;
        }

        .nft-values {
          display: flex;
          align-items: center;

          .sub-title2 {
            padding-top: 0;
            color: #97BCF9;
            font-size: 3.5vw !important;
            font-weight: 400;
          }

          .value {
            margin-left: 3vw;
            color: #01F9FF;
            font-size: 3.5vw !important;
            font-weight: 550;
          }
        }
      }
    }
  }
`

const NFTContainer = styled.div`
  margin-top: 3vw;
  width: 100%;

  .title {
    color: #97BCF5;
    font-size: 2vw;
    font-weight: 550;
    margin-bottom: 1vw;
  }

  @media screen and (min-width: 300px) and (max-width: 600px) {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: fit-content;



    .title {
      color: #97BCF5;
      font-size: 2.6rem;
      font-weight: 500;
      margin-bottom: 1.6rem;
      width: fit-content;
    }

  }
`

const NFTListContainer = styled.div`

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

`

const NFTList: React.FC = () => {
  const { data } = useHomeNFTsQuery({ typeChain: 'Ethereum', size: 8 })

  return (
    <NFTListContainer>
      {data?.records?.map((o: any, index: number) => (
        <NFTListItem
          data={o}
          key={index}
          type="nftList"
        />
      ))}
      {
        new Array(5).fill(undefined).map((o, index) => (
          <NFTListItem key={index} type="nftList" />
        ))
      }
    </NFTListContainer>
  )
}

const PanelIcon: React.FC<any> = ({ iconName }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  const style: CSSProperties = {
    width: '8vw',
    position: 'absolute',
    height: '12vh',
    right: '2vw',
    bottom: '8vh'
  }

  const mobileStyle: CSSProperties = {
    position: 'absolute',
    width: '8vw',
    bottom: '8vh',
    right: '10vw'
  }

  return (
    <div>
      <img
        src={iconName}
        style={isMobile ? mobileStyle : style}
        alt=""
      />
    </div>
  )
}

const AIFlag: React.FC<any> = () => {

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  const style: CSSProperties = {
    position: 'absolute',
    zIndex: 1,
    width: '10vw',
    left: '20vw',
    top: '0vh'
  }
  const mobileStyle: CSSProperties = {
    position: 'absolute',
    width: '20vw',
    right: '0vw',
    top: '0'
  }
  // @ts-ignore
  return (
    <div>
      <img
        src={CornerFlag}
        style={isMobile ? mobileStyle : style}
        alt=""
      />
    </div>
  )
}

const GotoArrow: React.FC<{ path?: string }> = ({ path }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const history = useHistory()

  const style: CSSProperties = {
    position: 'absolute',
    width: '1.5vw',
    right: '1.6vw',
    bottom: '1.6vw',
    cursor: path ? 'pointer' : 'not-allowed'
  }

  const mobileStyle: CSSProperties = {
    position: 'absolute',
    width: '4vw',
    right: '4vw',
    bottom: '4vw',
  }

  return (
    <img
      alt=""
      src={RightArrow}
      onClick={() => path && history.push(path)}
      style={isMobile ? mobileStyle : style}
    />
  )
}

const HomePage: React.FC = () => {
  const history = useHistory()

  return (
    <HomePageContainer>
      <img style={{ position: 'absolute', right: '0', top: '0', zIndex: 99, width: '20vw' }} src={coding} alt="" />
      <BodyContainer>
        <InfoContainer>
          <div className="row1">
            <div className="nft-mortgage-container" onClick={() => history.push('/pools/*')}>
              <AIFlag />
              <div className="main-title">NFT Collateral</div>
              <div className="sub-title">Market size</div>
              <div className="value">$125,300,00</div>
              <div className="sub-title">Transaction Volumn</div>
              <div className="value">$34,324,00</div>
              <GotoArrow />
            </div>

            <div className="auction-and-splitting">
              <div className="info-panel" onClick={() => history.push('/pools/*')}>
                <div className="main-title2">Safety pool
                  <PanelIcon iconName={Auction} />
                </div>
                <div className="sub-title2">KSE pool : $89,294,879.98</div>
                <div className="nft-values">
                  <div className="sub-title2">BPT(KSE/ETH):</div>
                  <div className="value">$982,987,374.93</div>
                </div>
                <GotoArrow />
              </div>

              <div className="info-panel" onClick={() => history.push('/pools/*')}>
                <div className="main-title2">Deposit
                  <PanelIcon iconName={Splitting} />
                </div>
                <div className="nft-values">
                  <div className="sub-title2">Pool size :</div>
                  <div className="value">$92,983,485.09</div>
                </div>
                <div className="nft-values">
                  <div className="sub-title2">Earn up to :</div>
                  <div className="value">303.75%</div>
                </div>
                <div className="nft-values">
                  <div className="sub-title2" />
                  <div className="value" />
                </div>
                <GotoArrow />
              </div>
            </div>
          </div>

          <div className="row2">
            <div className="info-panel" style={{ padding: '1vw 2vw ' }}>
              <div className="main-title2">Users
                <PanelIcon iconName={Mortgage} />
              </div>
              <div className="nft-values">
                <div className="sub-title2">KSE Address Number :</div>
                <div className="value">3230</div>
              </div>
              <div className="nft-values">
                <div className="sub-title2">NFT Address Number :</div>
                <div className="value">2890</div>
              </div>
              <GotoArrow path="/nft/create" />
            </div>

            <div className="info-panel" onClick={() => history.push('/pools/*')}>
              <div className="main-title2">Borrow
                <PanelIcon iconName={Liquidity} />
              </div>
              <div className="nft-values">
                <div className="sub-title2">Borrow size :</div>
                <div className="value">$8,093,233.07</div>
              </div>
              <div className="nft-values">
                <div className="sub-title2" />
                <div className="value" />
              </div>
              <GotoArrow />
            </div>

          </div>
        </InfoContainer>

        <NFTContainer>
          <div className="title">Collateralized NFT</div>
          <NFTList />
        </NFTContainer>
      </BodyContainer>
    </HomePageContainer>
  )
}

export default HomePage
