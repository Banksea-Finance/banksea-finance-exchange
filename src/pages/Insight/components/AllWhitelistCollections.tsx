import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ThemeTable from '../../../styles/ThemeTable'
import { RankingCollection } from '@/hooks/queries/insight/overview/useRankingCollectionsQuery'
import { numberWithCommas } from '@/utils'
import TableTitleWithTooltip from '../../../components/TableTitleWithTooltip'

type AllWhitelistCollectionsProps = {
  collections: RankingCollection[]
}

export type WhitelistCollection = {
  iconUrl: string
  name: string
  volumeIn7Days: string
  salesIn7Days: number
  avgPriceIn7Days: string
  totalSupply: number
  owners: number
  ownerProportion: number
  estimatedMarketCap: string
  volumeAllTime: string
  salesAllTime: number
  added: string
}

const AllWhitelistCollectionsContainer = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 1680px) {
    margin-left: -10%;
    margin-right: -10%;
  }

  .title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 45px;
    margin-top: 88px;
  }
`


const AllWhitelistCollections: React.FC<AllWhitelistCollectionsProps> = ({ collections }) => {
  const history = useHistory()

  const CollectionIconAndName: React.FC<{ seriesLogo: string, seriesName: string }> = ({ seriesLogo, seriesName }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={seriesLogo}
        alt={seriesName}
        style={{ width: '30px', height: '30px', borderRadius: '15px', marginRight: '10px' }}
      />
      <span>{seriesName}</span>
    </div>
  )

  const columns = [
    {
      title: 'Collection',
      // eslint-disable-next-line react/display-name
      render: (text: string, record: any) => <CollectionIconAndName {...record} />,
      width: '220px'
    },
    {
      title: 'Volume(7d)',
      key: 'sevenDayVolume',
      render: (_: string, record: any) => `Ξ${numberWithCommas(record.sevenDayVolume)}`,
      width: '120px',
    },
    {
      title: 'Transactions(7d)',
      key: 'sevenDayTransaction',
      render: (_: string, record: any) => `${numberWithCommas(record.sevenDayTransaction, 0)}`,
      width: '120px'
    },
    {
      title: 'Avg Price(7d)',
      key: 'sevenDayAvgPrice',
      render: (_: string, record: any) => `Ξ${numberWithCommas(record.sevenDayAvgPrice)}`,
      width: '120px'
    },
    {
      title: 'Total supply',
      key: 'totalSupply',
      render: (_: string, record: any) => `${numberWithCommas(record.totalSupply, 0)}`,
      width: '120px'
    },
    {
      title: 'Owners',
      key: 'numOwners',
      render: (_: string, record: any) => `${numberWithCommas(record.numOwners, 0)}`,
      width: '110px'
    },
    {
      title: (
        <TableTitleWithTooltip
          title="Estimated Market Cap"
          tooltip="Estimated market cap is calculated by using 7 day average price * total supply"
        />
      ),
      key: 'marketCap',
      render: (_: string, record: any) => `Ξ${numberWithCommas(record.marketCap)}`,
      width: '190px'
    },
    {
      title: (
        <TableTitleWithTooltip
          title="Volume(All Time)"
          tooltip="Volume is the sum of the transaction price"
        />
      ),
      key: 'totalVolume',
      render: (_: string, record: any) => `Ξ${numberWithCommas(record.totalVolume)}`,
      width: '160px'
    },
    {
      title: 'Transactions(All Time)',
      key: 'allTransaction',
      render: (_: string, record: any) => `${numberWithCommas(record.allTransaction, 0)}`,
      width: '180px'
    },
  ]

  const onRow = (record: any) => {
    return {
      onClick: () => {
        const collection = record as RankingCollection
        history.push(`/insight/${collection.seriesSlug}`)
      }
    }
  }

  return (
    <AllWhitelistCollectionsContainer>
      <div className="title">
        All Whitelist Collections
      </div>
      <ThemeTable
        dataSource={collections}
        columns={columns}
        onRow={onRow}
        scroll={{ x: 1500 }}
        rowCursor={'pointer'}
      />
    </AllWhitelistCollectionsContainer>
  )
}

export default AllWhitelistCollections
