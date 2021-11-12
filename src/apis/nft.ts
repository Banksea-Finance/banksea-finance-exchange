import bankseaRequest, { BankseaApiPagingData, BankseaApiResponse } from '@/utils/bankseaRequest'
import { NFTDetail, NftListItem } from '@/types/NFTDetail'

export type ChainType = 'Ethereum' | 'Solana' | ''

export type BankseaNftTransactionStatus = 0 | 1

export type BankseaNftListQueryParams = {
  current?: number,
  size?: number,
  searchKey?: string,
  sortType?: 'time_stamp',
  addressContract?: string
  group?: string
  transactionStatus?: BankseaNftTransactionStatus
  typeChain: ChainType
}

export type BankseaPersonalNftListQueryParams = {
  addressOwner: string,
  typeChain?: ChainType
  size?: number
  current?: number
  searchKey?: string
}

export type NftCreateForm = {
  uri: string
  addressCreate: string
  tokenId: string
  group: string
  feeRecipient: string
  fee: string
  nameArtist: string
  typeChain: ChainType

  // Below 3 is Solana-specific fields
  supply?: number
  accountOwner?: string
  nftPubKey?: string
}

export type NftDetailQueryRequest = {
  uri: string
  contractAddress?: string
}

export function createNFT(data: NftCreateForm) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/create/uri', data)
}

export function bankseaNftList(data: BankseaNftListQueryParams) {
  return bankseaRequest.post<BankseaApiResponse<BankseaApiPagingData<NftListItem>>>('/query/list', data)
}

export function bankseaNftDetail(data: NftDetailQueryRequest) {
  return bankseaRequest.post<BankseaApiResponse<NFTDetail>>('/query/detail', data)
}

export function personalNftList(data: BankseaPersonalNftListQueryParams) {
  return bankseaRequest.post<BankseaApiResponse<any>>('/zone/nft/list', data)
}

export function setNftFavorite(uri: string) {
  return bankseaRequest.get<BankseaApiResponse<any>>(`/view/favorite/${uri}`)
}

export function getNftFavoriteCount(uri: any) {
  return bankseaRequest.get<BankseaApiResponse<any>>(`/view/info/${uri}`)
}
