import { useEffect, useState } from 'react'
import { useCollectionsHeatTrendQuery } from '@/hooks/queries/insight/overview/useCollectionsHeatTrendQuery'
import {
  useWhitelistCollectionsQuery,
  WhitelistCollection
} from '@/hooks/queries/insight/overview/useWhitelistCollectionsQuery'
import {
  RankingCollection,
  useRankingCollectionsQuery
} from '@/hooks/queries/insight/overview/useRankingCollectionsQuery'
import {
  CurrencyMarketValue,
  useCurrencyMarketValueQuery
} from '@/hooks/queries/insight/overview/useCurrencyMarketValueQuery'
import { CollectionsHeatTrendChartProps } from '@/pages/Insight/components/charts/CollectionsPopularityTrendChart'
import {
  NftMarketTotalValuation,
  useNftMarketTotalValuationQuery
} from '@/hooks/queries/insight/overview/useNftMarketTotalValuationQuery'

type ValuationPageData = {
  nftMarketTotalValuation?: NftMarketTotalValuation
  allWhitelistCollections: RankingCollection[]
  featureAddedWhitelistCollections: WhitelistCollection[]
  collectionsHeatTrendData?: CollectionsHeatTrendChartProps
  currencyMarketValue?: CurrencyMarketValue
}

const useInsightOverviewData = (): ValuationPageData => {
  const [collectionsHeatTrendData, setCollectionsHeatTrendData] = useState<CollectionsHeatTrendChartProps>()

  const { data: heatDataList } = useCollectionsHeatTrendQuery()

  const { data: whitelistCollections } = useWhitelistCollectionsQuery()

  const { data: currencyMarketValue } = useCurrencyMarketValueQuery()

  const rankingCollections = useRankingCollectionsQuery().data?.records

  const { data: nftMarketTotalValuation } = useNftMarketTotalValuationQuery()

  useEffect(() => {
    if (heatDataList) {
      const collections = heatDataList.map(o => o.seriesName)

      const map = heatDataList.flatMap(heatData =>
        heatData.heatScore.map((score, index) => ([heatData.seriesName, score, heatData.time[index]]))
      )

      setCollectionsHeatTrendData({
        collections,
        chartData: [
          ['collection', 'heat', 'time'],
          ...map
        ]
      })
    }
  }, [heatDataList])

  return {
    allWhitelistCollections: rankingCollections ?? [],
    featureAddedWhitelistCollections: whitelistCollections ?? [],
    collectionsHeatTrendData,
    currencyMarketValue,
    nftMarketTotalValuation
  }
}

export {
  useInsightOverviewData
}
