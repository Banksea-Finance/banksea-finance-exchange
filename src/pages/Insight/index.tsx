import React from 'react'
import styled from 'styled-components'
import FeatureAddedWhitelistCollections from './components/FeatureAddedWhitelistCollections'
import AllWhitelistCollections from './components/AllWhitelistCollections'
import { useInsightOverviewData } from '@/hooks/queries/insight/overview/useInsightOverviewData'
import {
  CollectionsHearTrendChart,
  CollectionsHeatTrendChartProps
} from './components/charts/CollectionsPopularityTrendChart'
import { AllNFTValuationChart } from './components/charts/AllNFTValuationChart'
import { CurrencyMarketValue } from '@/hooks/queries/insight/overview/useCurrencyMarketValueQuery'
import { formatTime, simplifyNumber } from '@/utils'
import { NftMarketTotalValuation } from '@/hooks/queries/insight/overview/useNftMarketTotalValuationQuery'

const ValuationPageContainer = styled.div`
  color: white;
`

const Wrapper = styled.div`
  max-width: 1380px;
  width: 80%;
  margin: 0 auto;
  margin-top: 45px;
`

const PageTitle = styled.div`
  font-size: 30px;
  font-weight: 500;

  &:before {
    content: 'NFT Insight';
  }
`

const TitleDivider = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, #5D00B4, #09F9FD);
  margin-top: 16px;
  margin-bottom: 28px;
  //text-fill-color: transparent;
`

const SummaryContainer = styled.div`
  font-weight: 500;
  line-height: 36px;
  margin-bottom: 45px;

  .item {
    display: flex;
    align-items: flex-end;

    .value {
      color: #eee;
      font-size: 25px;
    }

    .key {
      color: #b2b2b2;
      font-size: 18px;
      margin-right: 10px;
      height: 32px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

`

const ChartTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  align-items: center;
  user-select: none;

  div {
    display: inline-block;
  }

  .label {
    font-size: 14px;
    color: #b2b2b2;
    margin-right: 10px;
  }

  .value {
    font-size: 20px;
    color: white;
    font-weight: 600;
  }

`

const AllNFTValuation: React.FC<{ data?: NftMarketTotalValuation }> = ({ data }) => {
  const percentString = (num: number) => {
    return [
      num > 0 ? '+' : '',
      (num * 100).toFixed(3),
      '%'
    ].concat()
  }

  return (
    <div style={{ marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
        Valuation of All NFT
      </div>
      {
        data?.nftMarketCapitalizationVoList && <AllNFTValuationChart list={data.nftMarketCapitalizationVoList} />
      }
      <ChartTextContainer>
        <div>
          <div className="label">Yesterday changed</div>
          <div className="value">{data?.changeOneDay ? percentString(data.changeOneDay) : '-'}</div>
        </div>
        <div>
          <div className="label">Data was last updated</div>
          <div className="value">{data?.createTime ? formatTime(new Date(data.createTime * 1000)) : '-'}</div>
        </div>
      </ChartTextContainer>
    </div>
  )
}

const CollectionsPopularityTrend: React.FC<{ data?: CollectionsHeatTrendChartProps }> = ({ data }) => {
  return (
    <div>
      <div style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>
        Popularity Trend of Collections
      </div>
      {
        data && <CollectionsHearTrendChart {...data} />
      }
    </div>
  )
}

const Summary: React.FC<{
  currencyMarketValue?: CurrencyMarketValue,
  marketTotalValuation?: NftMarketTotalValuation
}> = ({
  currencyMarketValue, marketTotalValuation
}) => {
  const { marketCapBtc, marketCapEth } = currencyMarketValue ?? {}

  return (
    <SummaryContainer>
      <div className="row">
        <div className="item">
          <div className="key">Total Value:</div>
          <div className="value">
            {marketTotalValuation ? simplifyNumber(marketTotalValuation.marketCapitalizationEth) : '-'}
            &nbsp;ETH
            ($
            {marketTotalValuation ? simplifyNumber(marketTotalValuation.marketCapitalizationUsd) : '-'}
            )
          </div>
        </div>

        <div className="item">
          <div className="key">
            BTC:
          </div>
          <div className="value">
            ${marketCapBtc ? simplifyNumber(marketCapBtc) : '-'}
          </div>
        </div>

      </div>
      <div className="row">
        <div className="item" />
        <div className="item">
          <div className="key">
            Ethereum:
          </div>
          <div className="value">
            ${marketCapEth ? simplifyNumber(marketCapEth) : '-'}
          </div>
        </div>
      </div>
    </SummaryContainer>
  )
}

const InsightPage: React.FC = () => {
  const {
    allWhitelistCollections,
    featureAddedWhitelistCollections,
    collectionsHeatTrendData,
    currencyMarketValue,
    nftMarketTotalValuation
  } = useInsightOverviewData()

  return (
    <ValuationPageContainer>
      <Wrapper>
        <PageTitle />
        <TitleDivider />
        <Summary currencyMarketValue={currencyMarketValue} marketTotalValuation={nftMarketTotalValuation} />
        <AllNFTValuation data={nftMarketTotalValuation} />
        <CollectionsPopularityTrend data={collectionsHeatTrendData} />
        <FeatureAddedWhitelistCollections collections={featureAddedWhitelistCollections} />
        <AllWhitelistCollections collections={allWhitelistCollections} />
      </Wrapper>
    </ValuationPageContainer>
  )
}

export default InsightPage
