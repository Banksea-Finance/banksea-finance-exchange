import styled from 'styled-components'
import { Button } from 'antd'

export const Row = styled.div`
  display: flex;
  justify-content: center;
`

export const CollectiblesDetailContainer = styled.div`
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2vw 6vw;
  position: relative;

  .operating {
    width: 100%;
    height: 7rem;
    position: relative;
  }

  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100vw !important;
    height: fit-content;
    background-color: #0B111E;
    padding: 0;
    overflow-x: hidden;

  }
`

export const LeftArea = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 2vw;

`

export const RightArea = styled.div`
  width: 53.9rem;
  margin-left: 1.3rem;
  position: relative;
`

export const Operating = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;

  .ant-btn {
    width: fit-content;
    margin-left: 1vw;
    background: #354d86;
    border: none;
    border-radius: 0.5vw;
    font-size: 1vw;
    font-weight: 550;
    color: #FFFFFF;
    line-height: 2rem;
  }

  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;

    .ant-btn {
      width: 40vw;
      height: 10vw;
      border-radius: 2vw;
      font-size: 5vw;
    }
  }
`

export const PropertiesArea = styled.div`
  height: 21rem;
  width: 30rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: scroll;

  /*::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #98BDF9;
    border-radius: 0.5rem;
    margin-left: 0.5rem;
  }*/

  .properties-group {
    width: 14.3rem;
    height: 9.1rem;
    background: #305099;
    border-radius: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .properties-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .key {
      font-size: 1.4rem;
      font-weight: 550;
      color: white;
      line-height: 2rem;
      margin-top: 1.2rem;
    }

    .value {
      margin-top: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #98BDF9;
      line-height: 1.7rem;
    }

    .percent {
      margin-top: 0.4rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #98BDF9;
      line-height: 1.7rem;
    }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: fit-content;

    .mobile-properties {
      width: 80vw;
      height: 25vh;
      background-color: #305099;
      border-radius: 2rem;
      padding: 4vw 2vw;
    }

    .properties-group {
      width: 35vw;
      height: 10vh;
      background: #162d68;
      border-radius: 1rem;
    }
  }
`

export const CornerFlag = styled.div`
  position: absolute;
  color: white;
  left: -0.3vw;
  top: -0.6vw;
  font-weight: 550;
  text-align: center;
  width: 4.5vw;
  height: 2vw;
  background-image: url(${require('../../assets/images/collectibles-item-corner-flag-bg.png').default});
  background-size: cover;
  z-index: 2;

  @media screen and (max-width: 1000px) {
    top: 3vw;
    left: 8.7vw;
    width: 25vw;
    height: 10vw;
  }
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 31.2rem;
  height: 34.4rem;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  object-fit: cover;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
  }

  @media screen and (max-width: 600px) {
    margin-top: 5vw;
    border: none;
    height: 100%;
    width: 100vw;

    img {
      height: 50vh;
      width: 80vw;
      object-fit: cover;
      border: 1px solid #98BDF9;
    }
  }
`

export const PriceContainer = styled.div`
  .item {
    display: flex;
    flex-direction: row;
    margin-top: 1.2rem;

    .info-label {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      padding-right: 1.4rem;
    }

    .price {
      font-size: 3.2rem;
      font-weight: 400;
      color: #7C6DEB;
      line-height: 2.5rem;
    }

    .price-in-usd {
      font-size: 1.6rem;
      font-weight: 400;
      color: #A196EF;
      line-height: 2.2rem;
      margin-left: 1rem;
    }
  }
`

export const ItemsContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;

  .item {
    width: 25rem;
    height: 9.2rem;
    background: #305099;
    border-radius: 1rem;
    padding: 2rem 1.1rem;
    flex-wrap: wrap;

    .row {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 1.2rem;
        font-weight: 500;
        color: #B3B3B3;
        line-height: 1.7rem;

      }

      .value {
        font-size: 1.2rem;
        font-weight: 550;
        color: white;
        line-height: 17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

  }

  @media screen and (max-width: 600px) {
    display: flex ;
    justify-content: center ;
    flex-direction: column ;
    height: fit-content;

    .item {
      background: #305099;
      width: 80vw;

      .row {
        display: flex;
        justify-content: space-between;
      }
    }
`

export const SubTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 550;
  color: #98BDF9;
  line-height: 2.2rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 600px) {
    padding: 3vh 0;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
    width: 100vw;
    font-size: 8vw !important;
  }
`

export const OtherArtworksArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 91.7rem;
  align-self: center;
  height: 42.2rem;
  margin-top: 4.9rem;

  @media screen and (max-width: 1000px) {
    width: 100vw;
  }

`

export const OtherArtworksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  .artwork-group {
    height: 30rem;
    width: 22rem;
    background-color: #111C3A;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .artwork-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .artwork-img {
        height: 22rem;
        width: 22rem;
        object-fit: cover;
        border-radius: 10px;
        display: flex;
        justify-content: center;
      }

      .artwork-describe {
        width: 100%;
        font-size: 14px;
        font-weight: 550;
        color: white;
        padding: 0 1rem;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .artwork-like {
      display: flex;
      padding: 1.0rem 1rem;
      justify-content: space-between;

      .liked {
        display: flex;
        font-size: 14px;
        font-weight: 500;
        color: white;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    width: 100vw !important;

    .artwork-group {
      margin-left: calc((100vw - 22rem) / 2);
      margin-bottom: 5vh;
    }
  }
`

export const NFTBaseInfoContainer = styled.div`
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
        font-weight: 550;
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

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;

    .nft-name {
      width: fit-content;
      font-size: 4.5rem;
      font-weight: 550;
      color: #98BDF9;
      padding: 5vh 0;
    }

    .line {
      margin-bottom: 5vh;
      width: 80vw;
      border-bottom: solid 0.2rem #787A91;
    }
  }
`

export const BuyButton = styled(Button)`
  margin-top: 1.2rem;
  width: 12vw;
  height: 40px;
  background: #305099;
  color: #FFFFFF;
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;

  &[disabled] {
    background: rgba(48, 80, 153, 0.55) !important;
    color: #999;
  }
`

export const MobileContainer = styled.div`
`

export const MobileNFTBaseInfoContainer = styled.div`
  .nft-info {
    display: flex;
    justify-content: space-between;
    padding: 1vh 10.5vw;
    color: #B2B1B9;
    font-size: 5vw;

    .info-favorite > img {
      width: 7vw;
      height: 2vh;
      display: flex;
      align-self: center;
      margin-right: 2vw;
    }

    .icon-heart > img {
      width: 5vw;
      height: 2vh;
      display: flex;
      align-self: center;
      margin-right: 2vw;
    }

    .nft-artist-label {
      font-weight: 550;
    }

    .nft-artist-value {
      font-weight: normal;
    }
  }

`
