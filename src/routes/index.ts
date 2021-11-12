import HomePage from '@/pages/Home'
import MarketplacePage from '@/pages/Marketplace'
import { ReactComponent as HomeIcon } from '@/assets/images/menu-icons/home.svg'
import { ReactComponent as CollectiblesIcon } from '@/assets/images/menu-icons/collectibles.svg'
import { ReactComponent as ArtistsIcon } from '@/assets/images/menu-icons/artists.svg'
import { ReactComponent as FarmsIcon } from '@/assets/images/menu-icons/farms.svg'
import { ReactComponent as OracleIcon } from '@/assets/images/menu-icons/oracle.svg'
import { ReactComponent as LevelUpIcon } from '@/assets/images/menu-icons/level-up.svg'
import { ReactComponent as PoolsIcon } from '@/assets/images/menu-icons/pools.svg'
import { ReactComponent as MarketplaceIcon } from '@/assets/images/menu-icons/marketplace.svg'
import { ReactComponent as PriceAirDropIcon } from '@/assets/images/menu-icons/priceAirDrop.svg'

import { CollectibleDetailPage } from '@/pages/Marketplace/CollectibleDetail'
import NFTCreatePage from '@/pages/NftCreate'
import PersonalHomepage from '@/pages/PersonalHome/index'
import NFTCreatedSuccess from '@/pages/NftCreate/NFTCreatedSuccess'
import AIGenerators from '@/pages/AIGenerators'
import FarmPage from '@/pages/Farms'
import VotePage from '@/pages/Vote'
import PoolsPage from '@/pages/Pools/index'
import NFTMortgageDetailPage from '@/pages/Pools/Detail/NFTPrepayDetail'
import MortgagePoolDetailPage from '@/pages/Pools/Detail/MortgagePoolDetail'
import DepositItemDetailPage from '@/pages/Pools/Detail/DepositItemDetail'
import InsightPage from '@/pages/Insight'
import CollectionValuationPage from '@/pages/Insight/CollectionInsight'
import NFTValuationPage from '@/pages/Insight/TokenInsight'
import { EyeOutlined } from '@ant-design/icons'
import React from 'react'

export type Route = {
  path: string
  title: string
  icon?: any
  component?: React.FC<any>
  hidden?: boolean
  match?: RegExp
  pools?: boolean
  disable?: boolean
}

const routes: Route[] = [
  {
    path: '/',
    title: 'Home',
    match: /(\/personal)/,
    icon: HomeIcon,
    component: HomePage
  },

  {
    path: '/insight',
    match: /^\/insight/,
    title: 'NFT Insight',
    icon: EyeOutlined,
    component: InsightPage
  },
  {
    path: '/insight/:collectionSlug',
    hidden: true,
    title: 'Collection Insight',
    component: CollectionValuationPage
  },
  {
    path: '/insight/:collectionSlug/:tokenId',
    hidden: true,
    title: 'NFTValuation',
    component: NFTValuationPage
  },

  {
    path: '/pools/*',
    match: /^\/pools/,
    title: 'Pools',
    icon: PoolsIcon,
    component: PoolsPage
  },

  {
    path: '/marketplace',
    title: 'Marketplace',
    match: /^(\/marketplace\/)|((^\/nft\/create))/,
    icon: MarketplaceIcon,
    component: MarketplacePage
  },
  {
    path: '/marketplace/:id',
    title: 'Collectible',
    icon: CollectiblesIcon,
    component: CollectibleDetailPage,
    hidden: true
  },

  {
    path: '/ai-generators',
    title: 'Level Up',
    icon: LevelUpIcon,
    component: AIGenerators,
    disable: true
  },
  {
    path: '/nft/create',
    title: 'Create NFT',
    component: NFTCreatePage,
    hidden: true
  },
  {
    path: '/nft/create/success',
    title: 'NFT Created successfully',
    component: NFTCreatedSuccess,
    hidden: true
  },

  {
    path: '/artists',
    title: 'Artists',
    icon: ArtistsIcon,
    disable: true
  },
  {
    path: '/farms',
    title: 'Farms',
    icon: FarmsIcon,
    component: FarmPage,
    hidden: true
  },
  {
    path: '/oracle',
    title: 'Oracle',
    icon: OracleIcon,
    disable: true
  },
  {
    path: '/personal/home',
    title: 'Personal Homepage',
    icon: FarmsIcon,
    component: PersonalHomepage,
    hidden: true
  },
  {
    path: '/Airdrop',
    title: 'Airdrop',
    icon: PriceAirDropIcon,
    component: VotePage,
    hidden: true
  },
  {
    path: '/nftMortgageDetailPage',
    title: 'nftMortgageDetailPage',
    component: NFTMortgageDetailPage,
    hidden: true
  },
  {
    path: '/mortgagePoolDetail',
    title: 'mortgagePoolDetail',
    component: MortgagePoolDetailPage,
    hidden: true
  },
  {
    path: '/deposit/depositDetail',
    title: 'DepositDetail',
    match: /^\/pools\//,
    component: DepositItemDetailPage,
    hidden: true
  }
]

export default routes
