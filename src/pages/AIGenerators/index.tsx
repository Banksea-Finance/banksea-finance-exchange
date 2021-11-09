import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Image as AntdImage, Image } from 'antd'
import download from '@/assets/images/AIGeneratorsImg/download.png'
import { usePersonalNFTsQuery } from '@/hooks/queries/usePersonalNFTsQuery'
import { aiGeneratorFastStyle, aiStyleList } from '@/apis/ai'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { useMediaQuery } from 'react-responsive'

SwiperCore.use([Navigation, EffectCoverflow, Pagination])

const AIGeneratorsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: 'PingFang SC';
  padding: 5rem 11.2rem;

  @media screen and (min-width : 300px) and (max-width: 1000px) {
    width: 100vw !important;
    height: 180vh;
    background-color: #0B111E;
    padding: 0;
  }
`

/*const MainCarousel = styled.div`
  position: relative;
  margin-left: calc((100% - 82.2rem) / 2);

  .top-area {
    width: 82.8rem;
    height: 23.2rem;
    background: url(${require('../../assets/images/AIGeneratorsImg/generatorsBG.png').default});
    background-size: contain;
  }

  .bottom-area {
    width: 82.8rem;
    height: 12rem;

  }

  .swiperTop {
    width: 100%;
    position: absolute;
    top: 18rem;
    z-index: 10;
    color: #fff;

    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 17rem;
      height: 17rem;

      img {
        object-fit: cover
      }
    }
  }

`*/

const GeneratorTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25rem;
  width: fit-content;
  background-color: #0B111E;

  .introduce {
    text-align: center;
    color: #97BCF9;

    .title {
      font-weight: 550;
      font-size: 4.6rem;
      background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      /*text-shadow: 0 0 3px #aef9ff, 0 0 5px #571eef, 0 0 10px #aef9ff, 0 0 15px #571eef;*/
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 1000px) {
    height: 20vh;
    .title {
      font-size: 10vw !important;
      text-align: center;
    }
    .introduce {
      padding: 0 8vw;
      font-size: 3.3vw !important;
      text-align: left;
    }
  }


`

const MyAntdImage = styled(AntdImage)`
  display: flex;
  justify-content: center;
  margin-left: 1rem;

`

const GeneratorBody = styled.div`
  padding: 1.8rem 0;
  width: 80%;

  .head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 3rem;

    .hr-line {
      margin: 0 auto;
      height: 0.2rem;
      width: 100%;
      background: radial-gradient(#B2B2B2 14%, #0B111E 80%);
      transition: all 1s;

    }

    .nft-border:hover {
      .hr-line {
        background: radial-gradient(#5349F9 14%, #0B111E 80%);
        transition: all 1s;
      }

      .gene-detail {
        width: 100%;
      }
    }

    .title {
      margin: 1.6rem 0 0 1.5rem;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 550;
      color: #97BCF9;
      line-height: 2.5rem;
    }

    @media screen and (max-width: 1000px) {
      .title {
        text-align: left;
        font-size: 2rem !important;
        padding: 0 0 0 1.2rem;
      }

      .nft-border {
        background-color: #141E61;
        padding-bottom: 4rem;
        border-radius: 2rem;
      }
    }

  }

  .plus-icon {
    display: flex;
    justify-content: center;
  }
`

const GeneratorFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`

/*const Description = styled.div`
  width: 99.4rem;
  padding: 2.6rem 5.7rem;
  margin-top: 2.5rem;
  text-align: center;
  border: 2px dashed #7C6DEB;
  background: #E5E2FB;
  color: #7C6DEB;
`*/

/*const GenerateButton = styled.div`
  width: 405px;
  height: 50px;
  background: #7C6DEB;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 50px;
  text-align: center;
`*/

const CreatButton = styled(Button)`
  width: 21.1rem;
  height: 5rem;
  background: #334ed0;
  border: none;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: white;
  position: relative;

  :hover {
    background: #2942b6;
    border: none;
    border-radius: 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #FFFFFF;
  }

  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 30vw;
    height: fit-content;
    display: flex;
    margin: 2vh calc((100% - 30vw) / 2);
  }
`

/*const AssetUploadContainer = styled.div`
  width: 192px;
  height: 130px;
  background: #E5E2FB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .upload-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1.4rem;

    font-size: 1.4rem;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 2rem;
  }
`*/

const MobileGenerateResultContainer = styled.div `
  background-color: #141E61;
  padding: 3rem;
  border-radius: 2rem;

  .mobile-result-title {
    color: #97BCF9;
    font-size: 5vw;
    font-weight: 550;
    margin-bottom: 3vw;
  }


`

const GenerateResultContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  width: 99.4rem;
  height: 53.1rem;
  border-radius: 1rem;
  padding: 3.5rem 5.9rem;
  position: relative;
`

const NewNftperating = styled.div`
  position: absolute;
  bottom: 0.9rem;
  right: 1rem;
  display: flex;
  align-items: center;
  z-index: 10;

  .download {
    width: 2.2rem;
  }
`

const SCSelectedNFTColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 21.2rem;

  .item {
    width: 20rem;
    height: 21rem;
    background-color: #111C3A;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;

    img {
      width: 20rem;
      height: 21rem;
      object-fit: cover;
      cursor: pointer;
      border-radius: 1rem;
    }

    .add {
      width: 5.5rem;
      height: 5.5rem;
      opacity: 0.5;
    }

    margin-bottom: 0.3rem;
  }

  span {
    color: #cccccc;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  @media screen and (min-width: 300px) and (max-width: 1000px) {
    width: 70vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;

    .item {
      width: 30vw;
      height: 15vh;
      background-color: #111C3A;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;

      img {
        width: 30vw;
        height: 15vh;
        object-fit: cover;
        cursor: pointer;
        border-radius: 1rem;

      }
      .add {
        width: 10vw;
        height: 10vw;
        opacity: 0.5;
      }
    }
  }



`

/*const SwiperTop: React.FC<{ list?: string[] }> = ({ list }) => {
  return (
    <div className="swiperTop">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          'rotate': 50,
          'stretch': 0,
          'depth': 100,
          'modifier': 1,
          'slideShadows': true,
        }}
        pagination={true}
      >
        {list?.map((item, key) => (
          <SwiperSlide key={key}>
            <img style={{ height: '100%', objectFit: 'cover', minWidth: '100%' }} src={item} key={item}  alt="" />
          </SwiperSlide>
        ))}
        <SwiperSlide />
      </Swiper>
    </div>
  )
}*/

const SelectedNft: React.FC<{ style: string, content: string }> = ({ style, content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })
  return (
    <SCSelectedNFTColumn>
      <div className="item">
        {
          style ? (
            <AntdImage
              src={style}
              preview={false}
            />
          ) : (
            <a href="#/ai-generators#style-gene">
              <img src={require('../../assets/images/AIGeneratorsImg/add.png').default} alt="" className="add" />
            </a>
          )
        }
      </div>
      {isMobile ? <div /> : <span>Selected Style NFT</span>}
      <div className="item">
        {
          content ? (
            <AntdImage
              src={content}
              preview={false}
            />
          ) : (
            <a href="#/ai-generators#my-nft">
              <img src={require('../../assets/images/AIGeneratorsImg/add.png').default} alt="" className="add" />
            </a>
          )
        }
      </div>
      {isMobile ? <div /> : <span>Selected Style NFT</span>}
    </SCSelectedNFTColumn>
  )
}

const SelectableNFTItem: React.FC<{ src: string, checked?: boolean, onSelect: (_: string) => void }> = ({
  src,
  checked,
  onSelect
}) => {



  const SelectBtn: React.FC = () => {
    return (
      <div
        style={{
          position: 'relative',
          top: '1rem',
          zIndex: 1,
          right: '1rem',
          opacity: 0.7
        }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        top: '1rem',
        display: 'flex',
        justifyContent: 'center'
      }}
      onClick={() => onSelect(src)}
    >
      <MyAntdImage
        width={160}
        height={190}
        src={src}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '1rem', display: 'flex', justifyContent: 'center' }}
        preview={false}
      />
      <SelectBtn />
    </div>
  )
}

const SelectableNFTList: React.FC<{ selectedValue: string, onSelect: (_: string) => void, list?: string[] }> = ({
  selectedValue,
  onSelect,
  list
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  return (
    <div className="gene-detail">
      {
        isMobile ?
          <Swiper slidesPerView={1}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {list?.map((item, key) => (
              <SwiperSlide key={key}>
                <SelectableNFTItem
                  src={item}
                  checked={selectedValue === item}
                  key={item}
                  onSelect={onSelect}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          :
          <Swiper slidesPerView={4}
            spaceBetween={25}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
          >
            {list?.map((item, key) => (
              <SwiperSlide key={key}>
                <SelectableNFTItem src={item} checked={selectedValue === item} key={item} onSelect={onSelect} />
              </SwiperSlide>
            ))}
          </Swiper>
      }
    </div>
  )
}

const RightArrow: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '25.2rem', display: 'flex', justifyContent: 'center' }}>

      <img
        src={require('../../assets/images/AIGeneratorsImg/deep-learning-line.png').default}
        alt=""
        style={{
          position: 'relative',
          width: 'fit-content',
          height: '50rem',
          bottom: '15rem',
          left: '5rem'
        }}
      />

      <img src={require('../../assets/images/AIGeneratorsImg/deep-learning-model.png').default}
        alt=""
        style={{
          position: 'relative',
          width: '16rem',
          height: '16rem',
          right: '18rem',
          top: '2rem'
        }}
      />
    </div>
  )
}

const AIGenerators: React.FC = () => {
  const { data: personalNFTs } = usePersonalNFTsQuery({ typeChain: '' })
  const [styleList, setStyleList] = useState<any>()
  // const [swiperList, setSwiperList] = useState<any>()
  const [generating, setGenerating] = useState(false)

  const init = useCallback(async () => {
    aiStyleList().then(res => {
      setStyleList(res.data.data)
    })
    // aiSwiperList().then(res => {
    //   setSwiperList(res.data.data)
    // })
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const [style, setStyle] = useState('')
  const [content, setContent] = useState('')
  const [newNFT, setNewNFT] = useState('')

  const generate = async () => {
    setGenerating(true)
    const result = await aiGeneratorFastStyle(style, content)
    setGenerating(false)
    setNewNFT(result.data.data)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  return (
    <AIGeneratorsContainer>
      <GeneratorTop>
        {
          isMobile ?
            <div className="introduce" >
              <p className="title">Level Up</p>
              <div>Al Generation uses artificial intelligence algorithms to</div>
              <div>extract the image style of Style Gene NFT and integrate it with the image of My NFT to reconstruct a brand-new</div>
              <div>NFT, which is a very interesting gameplay.</div>
            </div>
            :
            <div className="introduce" >
              <p className="title">Level Up</p>
              <p>Al Generation uses artificial intelligence algorithms</p>
              <p>to extract the image style of Style Gene NFT and integrate it with the image of My</p>
              <p>NFT to reconstruct a brand-new NFT, which is a very interesting gameplay.</p>
            </div>
        }


        {/*<MainCarousel>
          <div className="top-area" />
          <div className="bottom-area" />
          <SwiperTop list={swiperList?.map((style: { url: any }) => style?.url)} />
        </MainCarousel>*/}
      </GeneratorTop>
      <GeneratorBody>
        <div className="head">
          <div className="nft-border">
            { isMobile ? <div /> : <div className="hr-line" /> }
            <p id="/ai-generators#style-gene" style={{ position: 'relative', bottom: '5rem' }} />
            <div className="title">Style Gene</div>

            <SelectableNFTList selectedValue={style}
              onSelect={v => setStyle(v)}
              list={styleList?.map((style: { url: any }) => style?.url)}
            />
            { isMobile ? <div /> : <div className="hr-line" style={{ marginTop: '3rem' }} />  }
          </div>
        </div>
        <div className="head" style={{ marginTop: '5rem' }}>
          <div className="nft-border">
            { isMobile ? <div /> : <div className="hr-line" /> }
            <p id="/ai-generators#my-nft" style={{ position: 'relative', bottom: '5rem' }} />
            <div className="title">My NFT</div>
            <div className="split-border" />

            <SelectableNFTList
              selectedValue={content}
              onSelect={v => setContent(v)}
              list={(personalNFTs as any)?.map((nft: { image: any }) => nft.image)}
            />

            { isMobile ? <div /> : <div className="hr-line" style={{ marginTop: '3rem' }} /> }
          </div>
        </div>
        {/*<AssetUpload />*/}
      </GeneratorBody>
      {
        isMobile ?
          <MobileGenerateResultContainer>
            <div className="mobile-result-title">Selected Style NFT</div>
            <div>
              <SelectedNft style={style} content={content} />
            </div>

            <CreatButton onClick={generate} disabled={generating}>
              {
                !generating ? 'AI Generate' : 'Generating...'
              }
            </CreatButton>

            <div style={{
              backgroundColor: '#111C3A',
              width: '70vw',
              height: '20vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              position: 'relative',
              borderRadius: '1rem'
            }}
            >
              {
                newNFT ? (
                  <Image src={newNFT} alt="" />
                ) : (
                  <div style={{ height: '20vh' }} />
                )
              }
              <NewNftperating>
                {
                  newNFT ? (
                    <a href={newNFT} target="view_window">
                      <img className="download" src={download}  alt="" />
                    </a>
                  ) : (
                    <img className="download" src={download}  alt="" />
                  )
                }
              </NewNftperating>
            </div>
          </MobileGenerateResultContainer>
          :
          <GeneratorFooter>
            <GenerateResultContainer>
              <div>
                <SelectedNft style={style} content={content} />
              </div>
              <div>
                <RightArrow />
              </div>

              <div style={{
                backgroundColor: '#111C3A',
                width: '100%',
                height: '25rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                position: 'relative',
                borderRadius: '1rem'
              }}
              >
                {
                  newNFT ? (
                    <Image src={newNFT} alt="" />
                  ) : (
                    <div style={{ height: '15rem' }} />
                  )
                }
                <NewNftperating>
                  {
                    newNFT ? (
                      <a href={newNFT} target="view_window">
                        <img className="download" src={download}  alt="" />
                      </a>
                    ) : (
                      <img className="download" src={download}  alt="" />
                    )
                  }
                </NewNftperating>
              </div>



            </GenerateResultContainer>
            <CreatButton onClick={generate} disabled={generating}>
              {
                !generating ? 'AI Generate' : 'Generating...'
              }
            </CreatButton>

          </GeneratorFooter>
      }
    </AIGeneratorsContainer>
  )
}

export default AIGenerators
