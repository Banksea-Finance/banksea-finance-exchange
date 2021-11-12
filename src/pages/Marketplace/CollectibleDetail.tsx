import React, { useCallback, useEffect, useMemo, useState } from 'react'

import {
  BuyButton,
  CollectiblesDetailContainer,
  CornerFlag,
  ImageContainer,
  ItemsContainer,
  LeftArea,
  MobileContainer,
  MobileNFTBaseInfoContainer,
  NFTBaseInfoContainer,
  Operating,
  OtherArtworksArea,
  OtherArtworksContainer,
  PriceContainer,
  PropertiesArea,
  RightArea,
  Row,
  SubTitle
} from './CollectibleDetail.style'
import { Button, Image, message, Popover } from 'antd'
import Show from '@/assets/images/collectibleDetailImg/show.png'
import Heart from '@/assets/images/collectibleDetailImg/like.png'
import moment from 'moment'
import 'moment/locale/pt-br'
import copy from 'copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'
import more1 from '@/assets/images/detailMoreImg/more1.jpg'
import more2 from '@/assets/images/detailMoreImg/more2.png'
import more3 from '@/assets/images/detailMoreImg/more3.jpg'
import more4 from '@/assets/images/detailMoreImg/more4.png'
import { shortenAddress } from '@/utils'
import { useLocationQueries, useLocationQuery } from '@/hooks/useLocationQuery'
import { usePurchaseCheckoutModal } from '@/hooks/modals/usePurchaseCheckoutModal'
import { usePurchaseBlockedModal } from '@/hooks/modals/usePurchaseBlockedModal'
import { useAuthorizingModal } from '@/hooks/modals/useAuthorizingModal'
import { usePurchaseTransactionSentModal } from '@/hooks/modals/usePurchaseTransactionSentModal'
import { useSellingModal } from '@/hooks/modals/useSellingModal'
import ETHIcon from '@/components/ETHIcon'
import { usePurchaseWaitingConfirmationModal } from '@/hooks/modals/usePurchaseWaitingConfirmationModal'
import { getNftFavoriteCount } from '@/apis/nft'
import { useMediaQuery } from 'react-responsive'
import { NFTDetail } from '@/types/NFTDetail'
import { useNFTDetailQuery } from '@/hooks/queries/useNFTDetailQuery'
import ThemeTable from '@/styles/ThemeTable'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { useRefreshController } from '@/contexts'
import useSoldOutNFT from '@/hooks/contract/service/useSoldOutNFT'
import usePurchaseNFT from '@/hooks/contract/service/usePurchaseNFT'

const Properties: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return (
    <div>
      <SubTitle>Properties</SubTitle>
      <PropertiesArea>
        {
          isMobile ?
            <div className="mobile-properties" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100vw' }}>
                <div className="properties-group">
                  <div className="properties-item">
                    <div className="key">CHARACTER</div>
                    <div className="value">Cats</div>
                    <div className="percent">25% have this trait</div>
                  </div>
                </div>
                <div className="properties-group">
                  <div className="properties-item">
                    <div className="key">CHARACTER</div>
                    <div className="value">Cats</div>
                    <div className="percent">25% have this trait</div>
                  </div>
                </div>
                <div className="properties-group">
                  <div className="properties-item">
                    <div className="key">CHARACTER</div>
                    <div className="value">Cats</div>
                    <div className="percent">25% have this trait</div>
                  </div>
                </div>
                <div className="properties-group">
                  <div className="properties-item">
                    <div className="key">CHARACTER</div>
                    <div className="value">Cats</div>
                    <div className="percent">25% have this trait</div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '30rem', flexWrap: 'wrap' }}>
              <div className="properties-group">
                <div className="properties-item">
                  <div className="key">CHARACTER</div>
                  <div className="value">Cats</div>
                  <div className="percent">25% have this trait</div>
                </div>
              </div>
              <div className="properties-group">
                <div className="properties-item">
                  <div className="key">CHARACTER</div>
                  <div className="value">Cats</div>
                  <div className="percent">25% have this trait</div>
                </div>
              </div>
              <div className="properties-group">
                <div className="properties-item">
                  <div className="key">CHARACTER</div>
                  <div className="value">Cats</div>
                  <div className="percent">25% have this trait</div>
                </div>
              </div>
              <div className="properties-group">
                <div className="properties-item">
                  <div className="key">CHARACTER</div>
                  <div className="value">Cats</div>
                  <div className="percent">25% have this trait</div>
                </div>
              </div>
            </div>
        }
      </PropertiesArea>
    </div>
  )
}

const TradingHistories: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {

  const isMobile = useMediaQuery({ query: '(max-width:1000px' })

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      width: 20
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 20
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: 20
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: 20
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }
  ]

  const historyDataSource = nftDetail
    ?.logTransferSingleVos
    ?.slice(0, 4)
    ?.map((item: any, index: number) => ({
      key: index,
      event: item?.tokenId,
      price: 20,
      from: shortenAddress(item?.addressFrom),
      to: shortenAddress(item?.addressTo),
      date: moment(item.updateTime).fromNow()
    }))

  return (
    <div>
      <SubTitle>Trading Histories</SubTitle>
      {
        isMobile ?
          <ThemeTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 550 }}
            pagination={false}
          />
          :
          <ThemeTable
            columns={columns}
            dataSource={historyDataSource}
            scroll={{ x: 100 }}
            pagination={false}
          />
      }
    </div>
  )
}

const MobileNFTBaseInfo: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {
  const uri = useLocationQuery('uri')
  const [likeNum, setLikeNum] = useState<any>()

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  return (
    <MobileNFTBaseInfoContainer>
      <div className="nft-info">
        <div style={{ display: 'flex' }}>
          <div className="nft-artist-label"> Artist :</div>
          <div className="nft-artist-value">
            {nftDetail?.nameArtist || shortenAddress(nftDetail?.addressCreate)}
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div className="info-favorite" style={{ display: 'flex' }}>
          <img
            src={Show}
            alt=""
            className="icon-favorite"
          />
          <div className="info-row-item-value">{likeNum?.view ? likeNum?.view : 0}</div>
        </div>
      </div>

      <div className="nft-info">
        <div style={{ display: 'flex' }}>
          <div className="nft-artist-label"> Owner :</div>
          <div className="nft-artist-value">
            <div className="nft-owner">{shortenAddress(nftDetail?.addressOwner)}</div>
          </div>
          <CopyOutlined
            className="icon-copy"
            onClick={() => handleCopy(nftDetail?.addressCreate)}
          />
        </div>
        <div style={{ display: 'flex' }} className="icon-heart">
          <img
            className="icon-heart"
            src={Heart}
            alt=""
          />
          <div className="info-name">{likeNum?.favorite}</div>
        </div>
      </div>
    </MobileNFTBaseInfoContainer>
  )
}

const NFTBaseInfo: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {
  const uri = useLocationQuery('uri')

  const [likeNum, setLikeNum] = useState<any>()

  const handleCopy = (content: any) => {
    copy(content) && message.success('Copied successfully.', 1)
  }

  const fetchLikeCount = useCallback(async () => {
    getNftFavoriteCount(uri).then(res => {
      setLikeNum(res.data.data)
    })
  }, [uri])

  useEffect(() => {
    fetchLikeCount()
  }, [fetchLikeCount])

  const isMobile = useMediaQuery({ query: '(max-width:600px)' })
  return (
    <NFTBaseInfoContainer>
      {
        isMobile ?
          <div>
            <div className="nft-name">
              {nftDetail?.name}
            </div>
            <div className="line" />
            {/*<div style={{ display:'flex',justifyContent:'flex-start', flexDirection:'column' }}>
              <div className="info-row-item-label">Artist : { nftDetail?.nameArtist || thumbnailAddress(nftDetail?.addressCreate) }</div>
              <div className="info-row-item-label">Owner : { thumbnailAddress(nftDetail?.addressOwner) }
              </div>
            </div>*/}
          </div>
          :
          <div>
            <div className="nft-name">
              {nftDetail?.name}
            </div>
            <div className="info-row">
              <div className="info-row-item">
                <div className="info-row-item-label">Artist</div>
                <div className="info-row-item-value">
                  {
                    nftDetail?.nameArtist || shortenAddress(nftDetail?.addressCreate)
                  }
                </div>
                <CopyOutlined
                  className="icon-copy"
                  onClick={() => handleCopy(nftDetail?.addressCreate)}
                />
              </div>
              <div className="info-row-item">
                <div className="info-row-item-label">Owner</div>
                <div className="info-row-item-value">
                  {
                    shortenAddress(nftDetail?.addressOwner)
                  }
                </div>
                <CopyOutlined
                  className="icon-copy"
                  onClick={() => handleCopy(nftDetail?.addressCreate)}
                />
              </div>
            </div>
            <div className="info-row-favorite">
              <img
                src={Show}
                alt=""
                className="icon-favorite"
              />
              <div className="info-row-item-value">{likeNum?.view ? likeNum?.view : 0}</div>
            </div>

            <PriceContainer>
              <div className="price-favorite-row">
                {
                  nftDetail?.onSale && (
                    <div className="price">
                      <span className="price-label">Current Price</span>
                      <ETHIcon />
                      <span className="price-value">
                        {nftDetail?.price}
                      </span>
                      {/*<div className="price-in-usd">($297.21)</div>*/}
                    </div>
                  )
                }
                <div>
                  <img
                    src={Heart}
                    alt=""
                    style={{
                      width: '2.5rem,',
                      height: '1.4rem',
                      display: 'flex',
                      alignSelf: 'center',
                      marginRight: '0.4rem'
                    }}
                  />
                  <div className="info-name">{likeNum?.favorite}</div>
                </div>
              </div>
            </PriceContainer>
          </div>
      }
    </NFTBaseInfoContainer>
  )
}

const NFTMetadata: React.FC<{ nftDetail?: NFTDetail }> = ({ nftDetail }) => {
  const type = useLocationQuery('type')
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <ItemsContainer>
      {
        isMobile ?
          <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="item">
                <div className="row">
                  <div className="label">NFT Contract ID：</div>
                  <div className="value">
                    {
                      type === 'own' ?
                        <div className="item-value">---</div> :
                        <div className="item-value">
                          {shortenAddress(nftDetail?.addressContract)}
                        </div>
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="label" style={{ marginTop: '1.5rem' }}>Token &nbsp;ID：</div>
                  <div className="value" style={{ marginTop: '1.5rem' }}>
                    {shortenAddress(nftDetail?.addressOwner)}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5vh' }}>
              <div className="item">
                <div className="row">
                  <div className="label">Creator&apos;s Address：</div>
                  <div className="value">
                    {shortenAddress(nftDetail?.addressCreate)}
                  </div>
                </div>
                <div className="row">
                  <div className="label" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
                  <div className="value" style={{ marginTop: '1.5rem' }}>
                    {shortenAddress(nftDetail?.addressOwner)}
                  </div>
                </div>
              </div>
            </div>

          </div>

          :

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '90rem' }}>
            <div className="item">
              <div className="row">
                <div className="label">NFT Contract ID：</div>
                <div className="value">
                  {
                    type === 'own' ?
                      <div className="item-value">---</div> :
                      <div className="item-value">
                        {shortenAddress(nftDetail?.addressContract)}
                      </div>
                  }
                </div>
              </div>
              <div className="row">
                <div className="label" style={{ marginTop: '1.5rem' }}>Token &nbsp;ID：</div>
                <div className="value" style={{ marginTop: '1.5rem' }}>
                  {shortenAddress(nftDetail?.addressOwner)}
                </div>
              </div>
            </div>
            <div className="item">
              <div className="row">
                <div className="label">Creator&apos;s Address：</div>
                <div className="value">
                  {shortenAddress(nftDetail?.addressCreate)}
                </div>
              </div>
              <div className="row">
                <div className="label" style={{ marginTop: '1.5rem' }}>Owner&apos;s Address：</div>
                <div className="value" style={{ marginTop: '1.5rem' }}>
                  {shortenAddress(nftDetail?.addressOwner)}
                </div>
              </div>
            </div>
          </div>
      }
    </ItemsContainer>
  )
}

const MoreArtworks: React.FC = () => {
  return (
    <OtherArtworksArea>
      <SubTitle>More Artworks</SubTitle>
      <OtherArtworksContainer>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more1} style={{ borderRadius: '1rem', objectFit: 'cover' }} alt="" />
            </div>
            <div className="artwork-describe">Pikachu Baby Bimbo #0005</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked">5 KSE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more2}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt="'"
              />
            </div>
            <div className="artwork-describe">1 - The Elf</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked">6 KSE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more3}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt=""
              />
            </div>
            <div className="artwork-describe">Mona Lisa Smile &apos;Gamma Edition &apos;</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked"> KSE</div>
          </div>
        </div>
        <div className="artwork-group">
          <div className="artwork-info">
            <div className="artwork-img">
              <img src={more4}
                style={{ borderRadius: '1rem', objectFit: 'cover' }}
                alt=""
              />
            </div>
            <div className="artwork-describe">Like you mean it</div>
          </div>
          <div className="artwork-like">
            <div className="liked">
              <img
                src={Heart}
                alt=""
                style={{
                  width: '2.4rem,',
                  height: '1.4rem',
                  display: 'flex',
                  alignSelf: 'center',
                  marginRight: '0.2rem'
                }}
              />
              0
            </div>

            <div className="liked">6 KSE</div>
          </div>
        </div>
      </OtherArtworksContainer>
    </OtherArtworksArea>
  )
}

const CollectibleDetailPage: React.FC = () => {
  moment.locale('en')

  const { forceRefresh } = useRefreshController()
  const { isMobile } = useMatchBreakpoints()
  const { connected, account, select } = useSolanaWeb3()
  const [uri, contractAddress] = useLocationQueries([
    { key: 'uri', defaultValue: '' },
    { key: 'contractAddress' }
  ])

  const { data: nftDetail } = useNFTDetailQuery({ uri, contractAddress })
  const { soldOut } = useSoldOutNFT()
  const { purchaseByFixedPrice } = usePurchaseNFT()

  const [reasonOfUnableToBuy, setReasonOfUnableToBuy] = useState<string>()

  const { purchaseBlockedModal, openPurchaseBlockedModal } = usePurchaseBlockedModal()
  const { authorizingModal, openAuthorizingModal, closeAuthorizingModal } = useAuthorizingModal()
  const {
    purchaseWaitingConfirmationModal,
    openPurchaseWaitingConfirmationModal,
    closePurchaseWaitingConfirmationModal
  } = usePurchaseWaitingConfirmationModal()
  const { purchaseTransactionSentModal, openPurchaseTransactionSentModal } = usePurchaseTransactionSentModal()
  const { sellingModal, openSellingModal } = useSellingModal({
    nftDetail,
    onSellingConfirmed: forceRefresh,
    onStart: openAuthorizingModal
  })

  const checkoutPassed = () => {
    openAuthorizingModal()

    purchaseByFixedPrice({
      account: account!.toBase58(),
      nftDetail,
      onAuthorized: () => {
        closeAuthorizingModal()
        openPurchaseWaitingConfirmationModal()
      },
    })
      .then(() => {
        openPurchaseTransactionSentModal()
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        closePurchaseCheckoutModal()
        closePurchaseWaitingConfirmationModal()
      })
      .catch(e => {
        console.error(e)
        message.error(`Failed to purchase by fixed price: ${e.toString}`)
      })
  }

  const checkoutFailed = () => {
    openPurchaseBlockedModal()
  }

  const {
    purchaseCheckoutModal,
    openPurchaseCheckoutModal,
    closePurchaseCheckoutModal
  } = usePurchaseCheckoutModal(checkoutPassed, checkoutFailed, nftDetail)

  useEffect(() => {
    if (nftDetail?.nftPubKey) {
      //
    }

  }, [nftDetail])

  const allowToSell = useMemo(() => {
    if (nftDetail?.typeChain === 'Solana') {
      return nftDetail?.nftPubKey?.length > 0 && account?.toBase58() === nftDetail?.addressOwner
    }

    return false
  }, [nftDetail, account])

  useEffect(() => {
    if (!(nftDetail?.onSale && nftDetail.price)) {
      setReasonOfUnableToBuy('Not on sale')
      return
    }

    if (account?.toBase58() === nftDetail?.addressOwner) {
      setReasonOfUnableToBuy('You CANNOT buy your own NFT')
      return
    }

    if (nftDetail?.typeChain === 'Ethereum') {
      setReasonOfUnableToBuy('The NFT is on Ethereum, but for now we only support Solana.')
      return
    }

    setReasonOfUnableToBuy(undefined)
  }, [account, nftDetail])

  const allowToSoldOut = useMemo(() => {
    return nftDetail?.onSale && allowToSell
  }, [nftDetail, allowToSell])

  const onClickBuyButton = () => {
    openPurchaseCheckoutModal()
  }

  const handleSoldOut = async () => {
    soldOut(nftDetail).then(forceRefresh)
  }

  const coverImageUrl = useCallback(() => {
    return nftDetail?.image?.startsWith('ipfs:/')
      ? `https://banksy.mypinata.cloud${nftDetail?.image?.slice(6)}`
      : `https://banksy.mypinata.cloud${nftDetail?.image?.slice(-52)}`
  }, [nftDetail])

  return (
    <CollectiblesDetailContainer>
      {
        isMobile ?
          <MobileContainer>
            <NFTBaseInfo nftDetail={nftDetail} />
            <ImageContainer>
              {nftDetail?.onSale && <CornerFlag>on Sale</CornerFlag>}
              <Image src={coverImageUrl()} />
            </ImageContainer>

            <MobileNFTBaseInfo nftDetail={nftDetail} />
            {
              !reasonOfUnableToBuy &&
              <Button className="buyNow" onClick={onClickBuyButton}>
                Buy Now
              </Button>
            }
            {
              allowToSell &&
              <Operating>
                <Button className="sell" onClick={openSellingModal}>
                  Sell
                </Button>
              </Operating>
            }
            <NFTMetadata nftDetail={nftDetail} />
            <div className="mobile-properties-area">
              <Properties />
            </div>
            <TradingHistories nftDetail={nftDetail} />
            <MoreArtworks />
          </MobileContainer> :
          <div>
            <Operating>
              {
                allowToSoldOut && (
                  <Button onClick={handleSoldOut}>
                    Sold out
                  </Button>
                )
              }
              {
                allowToSell && (
                  <Button onClick={openSellingModal}>
                    Sell
                  </Button>
                )
              }
            </Operating>
            <Row>
              <LeftArea>
                <ImageContainer>
                  {nftDetail?.onSale && <CornerFlag>on Sale</CornerFlag>}
                  <Image src={coverImageUrl()} height="34.4rem" width="31.2rem" />
                </ImageContainer>
              </LeftArea>
              <RightArea>
                <NFTBaseInfo nftDetail={nftDetail} />
                {
                  !connected ? (
                    <BuyButton onClick={select}>
                      Connect To A Wallet
                    </BuyButton>
                  ) : (
                    !reasonOfUnableToBuy ? (
                      <BuyButton onClick={onClickBuyButton}>
                        Buy Now
                      </BuyButton>
                    ) : (
                      <Popover content={reasonOfUnableToBuy}>
                        <BuyButton onClick={onClickBuyButton} disabled={true}>
                          Buy Now
                        </BuyButton>
                      </Popover>
                    )
                  )
                }
                <NFTMetadata nftDetail={nftDetail} />
              </RightArea>
            </Row>
            <Row>
              <LeftArea style={{ marginTop: '5rem' }}>
                <Properties />
              </LeftArea>
              <RightArea style={{ marginTop: '5rem', height: '34rem' }}>
                <TradingHistories nftDetail={nftDetail} />
              </RightArea>
            </Row>
            <Row>
              <MoreArtworks />
            </Row>
          </div>
      }

      {purchaseCheckoutModal}
      {purchaseBlockedModal}
      {authorizingModal}
      {purchaseWaitingConfirmationModal}
      {purchaseTransactionSentModal}
      {sellingModal}
    </CollectiblesDetailContainer>
  )
}

export { CollectibleDetailPage }
