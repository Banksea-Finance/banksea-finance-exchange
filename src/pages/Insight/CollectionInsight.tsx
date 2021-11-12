import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ThemeTable from '@/styles/ThemeTable'
import { DropdownSelector } from '@/styles/DropdownSelector'
import { Pagination, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { CollectionExternalLink, CollectionValuationStatisticItem } from '@/types/CollectionValuation'
import { CollectionPopularityCompositionChart } from './components/charts/CollectionPopularityCompositionChart'
import { PriceScatterChart } from './components/charts/PriceScatterChart'
import { TotalMarketValueChart } from './components/charts/TotalMarketValueChart'
import {
  AVAILABLE_SORT_KEYS,
  CollectionNft,
  CollectionNftsQuerySortByKey,
  useCollectionNftsQuery
} from '@/hooks/queries/insight/collection/useCollectionNftsQuery'
import { useCollectionValuationDetailQuery } from '@/hooks/queries/insight/collection/useCollectionValuationDetailQuery'
import { TradeFlowChart } from './components/charts/TradeFlowChart'
import { useMediaQuery } from 'react-responsive'
import {
  CollectionValuationAttributeQuerySortKey,
  useCollectionValuationAttributeQuery
} from '@/hooks/queries/insight/collection/useCollectionValuationAttributeQuery'
import { numberWithCommas } from '@/utils'
import { ThemeSearchInput } from '@/styles/ThemeSearchInput'
import {
  convertCollectionValuationDetailToCollectionExternalLinks,
  convertCollectionValuationDetailToCollectionValuationStatisticItems
} from './converters'
import { SortOrder } from 'antd/es/table/interface'
import { Flex } from '@pancakeswap/uikit'

type CollectionValuationPageProps = {
  //
}

const CollectionValuationPageContainer = styled.div`
  padding: 30px 0;
  color: #9BBFFC;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1380px;
  width: 80%;
`

const Banner = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  padding: 0;
  margin-bottom: 30px;
  border-radius: 10px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .name {
    font-size: 42px;
    font-weight: 700;
    margin-right: 40px;
  }

  .external-links {
    display: flex;
    color: #9BBFFC;

    .item {
      display: flex;
      align-items: center;
      margin-left: 40px;
      font-size: 14px;

      &:nth-of-type(1) {
        margin-left: 0;
      }

      .icon {
        height: 17px;
        margin-right: 10px;
      }

      .text {
        color: #9BBFFC;
      }
    }
  }
`

const DescriptionContainer = styled.div`
  margin-top: 27px;
  margin-bottom: 31px;

  .title {
    font-size: 22px;
    font-weight: 700;
  }

  .content {
    font-size: 14px;
    font-weight: 400;
  }
`

const StatisticContainer = styled.div`
  display: flex;
  max-width: 550px;
  flex-wrap: wrap;
  margin-bottom: 72px;
  justify-content: space-between;
  //border: 1px red solid;

  .item {
    //border: 1px red solid;
    width: 180px;
    margin-bottom: 30px;

    .key {
      margin-bottom: 10px;

      color: rgba(155, 191, 252, 0.8);
      font-size: 13.5px;
    }

    .value {
      font-size: 20px;
      font-weight: 600;
    }
  }

  @media screen and (max-width: 1100px) {
    margin-left: auto;
    margin-right: auto;

    .item {
      width: 45%;
    }
  }
`

const ChartsContainer = styled.div`
  width: 100%;

  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .item {
      height: 500px;
      width: 100%;

      .title {
        margin-bottom: 47px;
        display: flex;
        align-items: center;

        .text {
          font-size: 36px;
          margin-right: 10px;
        }

        .icon {
          font-size: 20px;
          position: relative;
          top: 10px;
        }
      }

      .chart {
        height: 465px;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    margin: 0 auto;

    .row {
      margin-left: -10%;
      margin-right: -10%;

      .item {
        width: 100%;
        text-align: center;
      }
    }
  }
`

const ValuationTableContainer = styled.div`
  position: relative;
  overflow: visible;

  .title {
    font-size: 30px;
  }

  margin-bottom: 80px;

  @media screen and (max-width: 1100px) {
    margin-left: -10%;
    margin-right: -10%;

    .title {
      font-size: 6vw;
      text-align: center;
    }
  }
`

const CollectionNFTListContainer = styled.div`
  .header {
    margin-bottom: 25px;

    .sb-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      margin-bottom: 10px;
    }

    .title {
      font-size: 22px;
      margin-bottom: 10px;
    }

    .sort-by {
      .text {
        font-weight: 600;
        width: 50px;
        margin-right: 5px;

      }
    }

    .sort-by, .buttons, .pager {
      display: flex;
      align-items: center;
    }

    button {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid #305099;

      margin: 0 11px;

      img {
        width: 22px;
        height: 22px;
        margin: 0 auto;
      }
    }

  }

  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: -10px;
  }
`

const CollectionTokenContainer = styled.div`
  cursor: pointer;
  width: 210px;
  height: 278px;
  background-color: #101C3A;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
  margin-right: 10px;
  overflow-y: hidden;

  &:hover {
    .first-page, .second-page {
      position: relative;
      bottom: calc(100% + 30px);
    }
  }

  .first-page, .second-page {
    position: relative;
    bottom: 0;
    transition: bottom .25s;
  }

  .first-page {
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 500;

    img {
      width: 190px;
      height: 190px;
      border-radius: 10px;
      margin: 10px 0;
      object-fit: cover;
    }
  }

  .second-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;

      .key {
        color: #b2b2b2;

        &::after {
          content: ':';
          margin-right: 5px;
        }
      }

      .value {
        font-size: 120%;
      }
    }
  }

  &.empty {
    padding: 0;
    height: 0;
  }
`

const Title: React.FC<{
  name?: string,
  externalLinks: CollectionExternalLink[]
}> = ({ name, externalLinks }) => {
  return (
    <TitleContainer>
      <div className="name">{name}</div>
      <div className="external-links">
        {
          externalLinks
            .filter(item => item.url)
            .map(item => (
              <a className="item" href={item.url} key={item.name} target="_blank" rel="noreferrer">
                <img src={item.iconUrl} alt={item.name} className="icon" />
                <div className="text">{item.name}</div>
              </a>
            ))
        }
      </div>
    </TitleContainer>
  )
}

const Description: React.FC<{ description?: string }> = ({ description }) => {
  return (
    <DescriptionContainer>
      <div className="title">Description</div>
      <div className="content">{description ?? 'No description yet.'}</div>
    </DescriptionContainer>
  )
}

const Statistic: React.FC<{ statistic: CollectionValuationStatisticItem[] }> = ({ statistic }) => {
  return (
    <StatisticContainer>
      {
        statistic.map(({ key, value }) => (
          <div key={key} className="item">
            <div className="key">{key}</div>
            <div className="value">{value}</div>
          </div>
        ))
      }
    </StatisticContainer>
  )
}

const Charts: React.FC<{ seriesId?: string, contractAddress: string, seriesSlug?: string }> = ({
  seriesId,
  contractAddress,
  seriesSlug
}) => {
  const items: { title: string, description: string, component: JSX.Element }[] = [
    {
      title: 'Composition of Collection Popularity',
      description: 'Turnover rate indicates heat rate',
      component: <CollectionPopularityCompositionChart seriesSlug={seriesSlug} />
    },
    {
      title: 'Price Scatter',
      description: 'Scatter diagram of NFT trading price',
      component: <PriceScatterChart contractAddress={contractAddress} />
    },
    {
      title: 'Total Market Value',
      description: 'Market value analysis of all NFTs',
      component: <TotalMarketValueChart seriesId={seriesId} />
    },
    {
      title: 'Trade Flows',
      description: 'NFTs trading flows among addresses',
      component: <TradeFlowChart id={seriesId} assetContractAddress={contractAddress} />
    }
  ]

  return (
    <ChartsContainer>
      <div className="row">
        {
          items.map(({ title, component, description }) => (
            <div className="item" key={title}>
              <div className="title">
                <div className="text">
                  {title}
                </div>
                <Tooltip title={description}>
                  <QuestionCircleOutlined className="icon" />
                </Tooltip>
              </div>
              <div className="chart">
                {component}
              </div>
            </div>
          ))
        }
      </div>
    </ChartsContainer>
  )
}

const ValuationTable: React.FC<{ id?: string }> = ({ id }) => {
  const [current, setCurrent] = useState(1)
  const [sortKey, setSortKey] = useState<CollectionValuationAttributeQuerySortKey>()

  const { data, isLoading } = useCollectionValuationAttributeQuery({
    id,
    current,
    sortKey
  })

  const columns = [
    {
      title: 'Trait Type',
      key: 'attributeType',
      dataIndex: 'attributeType',
      width: '120px'
    },
    {
      title: 'Value',
      key: 'attributeValue',
      dataIndex: 'attributeValue',
      width: '150px'
    },
    {
      title: 'Rarity',
      key: 'rarity',
      render: (text: string, row: any) => `${numberWithCommas(row.rarity)}`,
      width: '200px',
      sortDirections: ['descend' as SortOrder, null],
      sorter: (_a: any, _b: any, sortOrder?: SortOrder) => {
        setSortKey(sortOrder ? 'rarity' : undefined)
        return 0
      }
    },
    {
      title: 'Popularity',
      key: 'popularity',
      render: (text: string, row: any) => numberWithCommas(row.popularity),
      width: '200px',
      sortDirections: ['descend' as SortOrder],
      sorter: (_a: any, _b: any, sortOrder?: SortOrder) => {
        setSortKey(sortOrder ? 'popularity' : undefined)
        return 0
      }
    }
  ]

  const handlePaginationChange = (current: number) => {
    setCurrent(current)
  }

  return (
    <ValuationTableContainer>
      <div className="title">Valuation by Type and Attribute</div>
      <ThemeTable
        columns={columns}
        dataSource={data?.records}
        loading={isLoading}
        scroll={{ x: 1000 }}
        pagination={{
          total: data?.total,
          pageSize: 10,
          showSizeChanger: false,
          onChange: handlePaginationChange,
          showQuickJumper: true,
          position: ['topRight']
        }}
      />
    </ValuationTableContainer>
  )
}

const CollectionToken: React.FC<{ token: CollectionNft, index: number }> = ({ token, index }) => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>()

  return (
    <CollectionTokenContainer
      onClick={() => window.open(`#/insight/${collectionSlug}/${token.nftNumber}`)}
    >
      <div className="first-page">
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <span>
            #{index + 1}
          </span>
          <span>
            {token.nftName}
          </span>
        </Flex>
        <img src={token.nftImageUrl} alt={token.id} />
        <Flex justifyContent={'flex-end'}>
          <span>
            {token.valuation && `Ξ${numberWithCommas(token.valuation)}`}
          </span>
        </Flex>
      </div>
      <div className="second-page">
        <div className="item">
          <div className="key">Last Price</div>
          <div className="value">{token.lastPrice === '-1' ? '-' : `Ξ${numberWithCommas(token.lastPrice)}`}</div>
        </div>
        <div className="item">
          <div className="key">Valuation</div>
          <div className="value">Ξ{numberWithCommas(token.valuation)}</div>
        </div>
        <div className="item">
          <div className="key">Rarity</div>
          <div className="value">{numberWithCommas(token.rarity)}</div>
        </div>
        <div className="item">
          <div className="key">Popularity</div>
          <div className="value">{token.popularity}</div>
        </div>
        <div className="item">
          <div className="key">Sales Number</div>
          <div className="value">{token.salesNumber}</div>
        </div>
      </div>
    </CollectionTokenContainer>
  )
}

const CollectionTokenList: React.FC<{ collectionId?: string, collectionName?: string }> = ({
  collectionName,
  collectionId
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  const [searchKey, setSearchKey] = useState<string | undefined>()
  const [current, setCurrent] = useState(1)
  const [size, setSize] = useState(60)
  const [total, setTotal] = useState(0)
  const [sortByKey, setSortByKey] = useState<CollectionNftsQuerySortByKey>()

  const { data } = useCollectionNftsQuery({
    nftSeriesId: collectionId,
    current,
    size,
    searchKey,
    sortByKey
  })

  const handlePaginationChange = (current: number, size?: number) => {
    setCurrent(current)
    size && setSize(size)
  }

  useEffect(() => {
    if (data) {
      setTotal(data.total)
    }
  }, [data])

  return (
    <CollectionNFTListContainer>
      <div className="header">
        <div className="sb-row">
          <div className="title">
            {
              collectionName && `${data?.total ?? '-'} Total ${collectionName}`
            }
          </div>
        </div>
        <div className="sb-row">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeSearchInput
              style={{ maxWidth: '300px', marginRight: '20px', height: '32px' }}
              onSearch={e => setSearchKey(e)}
            />
            <div className="sort-by">
              <div className="text">Sort by</div>
              <DropdownSelector
                allowClear
                style={{ maxWidth: '214px', minWidth: '120px' }}
                value={sortByKey}
                onChange={e => setSortByKey(e as CollectionNftsQuerySortByKey)}
              >
                {
                  AVAILABLE_SORT_KEYS.map(key => (
                    <DropdownSelector.Option
                      key={key}
                      value={key}
                    >
                      {key}
                    </DropdownSelector.Option>
                  ))
                }
              </DropdownSelector>
            </div>
          </div>

          <Pagination
            showQuickJumper
            showSizeChanger={false}
            showLessItems={isMobile}
            total={total}
            onChange={handlePaginationChange}
            pageSize={size}
            current={current}
            className={'pager'}
            pageSizeOptions={['12', '24', '48', '60']}
          />
        </div>

      </div>
      <div className="list">
        {
          data?.records?.map((item, index) => (
            <CollectionToken
              index={index}
              token={item}
              key={item.id}
            />
          ))
        }
        {
          new Array(5).fill({}).map((_, index) => (
            <CollectionTokenContainer className="empty" key={index} />
          ))
        }
      </div>
    </CollectionNFTListContainer>
  )
}

const CollectionValuationPage: React.FC<CollectionValuationPageProps> = () => {
  const { collectionSlug } = useParams<{ collectionSlug: string }>()

  const { data: detail } = useCollectionValuationDetailQuery(collectionSlug)

  useEffect(() => {
    document.getElementById('main')!.scrollTo(0, 0)
  }, [])

  return (
    <CollectionValuationPageContainer>
      <Wrapper>
        <Banner src={detail?.seriesPoster} />
        <Title
          name={detail?.seriesName}
          externalLinks={convertCollectionValuationDetailToCollectionExternalLinks(detail)}
        />
        <Description description={detail?.seriesDescription} />
        <Statistic statistic={convertCollectionValuationDetailToCollectionValuationStatisticItems(detail)} />
        <Charts
          seriesId={detail?.id}
          contractAddress={detail?.assetContractAddress ?? ''}
          seriesSlug={detail?.seriesSlug}
        />
        <ValuationTable id={detail?.id} />
        <CollectionTokenList
          collectionName={detail?.seriesName}
          collectionId={detail?.id}
        />
      </Wrapper>
    </CollectionValuationPageContainer>
  )
}

export default CollectionValuationPage
