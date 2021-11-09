import { BankseaNftListQueryParams } from '@/apis/nft'
import { useQuery, UseQueryResult } from 'react-query'
import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'
import { NftListItem } from '@/types/NFTDetail'

export function useHomeNFTsQuery(params: BankseaNftListQueryParams): UseQueryResult<BankseaApiPagingData<NftListItem>> {
  return useQuery(
    ['HOME_NFTS', params],
    async () => {
      return await bankseaRequest.post<BankseaApiResponse<BankseaApiPagingData<NftListItem>>>('/home/nft', params)
        .then(res => res.data.data)
        .then(pagingData => ({
          ...pagingData,
          records: pagingData.records
        }))
    }
  )
}
