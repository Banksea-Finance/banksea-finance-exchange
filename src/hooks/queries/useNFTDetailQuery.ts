import { useQuery, UseQueryResult } from 'react-query'
import { bankseaNftDetail, NftDetailQueryRequest } from '@/apis/nft'
import { NFTDetail } from '@/types/NFTDetail'
import { useRefreshController } from '@/contexts'

export const useNFTDetailQuery = (params: NftDetailQueryRequest): UseQueryResult<NFTDetail> => {
  const { quietRefreshFlag } = useRefreshController()

  return useQuery(
    ['NFT_DETAIL', params, quietRefreshFlag],
    async () => {
      return await bankseaNftDetail(params)
        .then(res => res.data.data)
    }
  )
}
