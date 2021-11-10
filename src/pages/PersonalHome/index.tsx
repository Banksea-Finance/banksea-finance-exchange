import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Pagination } from 'antd'
import CopyIcon from '@/assets/images/PersonalPageImg/copy.png'
import { ReactComponent as WalletIcon } from '@/assets/images/PersonalPageImg/wallet.svg'
import {
  ReactComponent as ActivityIcon,
  ReactComponent as OfferIcon
} from '@/assets/images/PersonalPageImg/activity.svg'
import { ReactComponent as HeartIcon } from '@/assets/images/PersonalPageImg/heart.svg'
import NFTListItem from '@/components/NFTListItem'
import ListPageLoading from '@/components/ListPageLoading'
import { usePersonalNFTsQuery } from '@/hooks/queries/usePersonalNFTsQuery'
import { ChainSelector, OrderSelector, StatusSelector } from '@/components/NFTListSelectors'
import { BankseaNftTransactionStatus, ChainType } from '@/apis/nft'
import { ThemeSearchInput } from '@/styles/ThemeSearchInput'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import { shortenAddress } from '@/utils'

const PersonalContainer = styled.div`
  width: 120.2rem;
  font-family: 'PingFang SC';
  margin: 0 auto;
  min-height: calc(100vh - 6.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Avatar = styled.img`
  width: 9.6rem;
  height: 9.6rem;
  border-radius: 100%;
  margin-top: 3.9rem;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .user-name {
    font-size: 3rem;
    font-weight: 500;
    color: #fff;
    line-height: 4.2rem;
  }

  .user-id {
    display: flex;
    font-size: 1.4rem;
    font-weight: 400;
    color: #999999;
    line-height: 2rem;
    margin-top: 0.5rem;

    :hover {
      cursor: pointer;
    }
  }

  .user-sign-border {
    display: flex;
    width: 48.5rem;
    text-align: center;
    margin-top: 0.8rem;

    .user-sign {
      font-size: 1.4rem;
      font-weight: 400;
      color: #999999;
      line-height: 2rem;
    }
  }

  .user-sign {
    margin-bottom: 20px;
  }
`

const UserOptions = styled.div`
  display: flex;
  justify-content: flex-start;

`

const OptionButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
  width: 15rem;
  height: 5rem;
  line-height: 2.2rem;

  .option-name {
    margin-left: 1.3rem;
  }
`

const SelectorsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  position: absolute;
  right: 0;

  .gutter {
    width: 30px;
  }
`

const NFTListContainer = styled.div`
  width: 120.2rem;
  padding-left: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const CustomPagination = styled(Pagination)`
  margin-bottom: 5rem;
  margin-top: 3rem;

  .ant-pagination-prev .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
    color: #7C6DEB;
  }

  .ant-pagination-item-active {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item-active a {
    color: #7C6DEB !important;
  }

  .ant-pagination-item {
    border: 1px solid rgba(124, 109, 235, 0.2) !important;
  }

  .ant-pagination-item a {
    //color: rgba(124,109,235,0.2) !important;
  }

  .ant-pagination-next .ant-pagination-item-link {
    border: none !important;
    background-color: rgba(124, 109, 235, 0.2) !important;
    color: #7C6DEB;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    background-color: rgba(124, 109, 235, 0.2);
  }

  .ant-select {
    color: #7C6DEB;
  }

  .ant-select-arrow {
    color: #7C6DEB;
  }
`

const UserNFTList: React.FC<any> = ({ list }) => {
  return (
    <NFTListContainer>
      {
        list?.map((nft: any, index: number) => (
          <NFTListItem
            data={nft}
            key={index}
            type="own"
          />
        ))
      }
      {
        new Array(4).fill(undefined).map((o, index) => (
          <NFTListItem key={index} />
        ))
      }
    </NFTListContainer>
  )
}

const PersonalHomepage: React.FC = () => {
  const { account } = useSolanaWeb3()
  const [current, setCurrent] = useState<number>(1)
  const [searchKey, setSearchKey] = useState<any>()
  const [, setStatus] = useState<BankseaNftTransactionStatus>()
  const [typeChain, setTypeChain] = useState<ChainType>('')

  const { data: NFTs, isLoading } = usePersonalNFTsQuery({ current, searchKey, typeChain })

  const onPressEnter = (e: any) => {
    setSearchKey(e.target.attributes[2].value)
  }

  return (
    <PersonalContainer>
      <UserInfo>
        <Avatar />
        <div className="user-name">Hug me</div>
        <div className="user-id">
          {shortenAddress(account?.toBase58())}
          <img src={CopyIcon}
            alt=""
            style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.8rem' }}
          />
        </div>
        <div className="user-sign-border">
          <div className="user-sign">Hug me strong and don&apos;t let me go. It&apos;s too cold outside and I wanna be
            warm next to you.
          </div>
        </div>
      </UserInfo>
      <UserOptions>
        <OptionButton icon={<WalletIcon />}>
          <div className="option-name">in Wallet</div>
        </OptionButton>
        <OptionButton icon={<ActivityIcon />}>
          <div className="option-name">Activity</div>
        </OptionButton>
        <OptionButton icon={<OfferIcon />}>
          <div className="option-name">Offers</div>
        </OptionButton>
        <OptionButton icon={<HeartIcon />}>
          <div className="option-name">Favorite</div>
        </OptionButton>
      </UserOptions>
      <div style={{ width: '100%', height: '15rem', position: 'relative' }}>
        <SelectorsContainer>
          <ThemeSearchInput
            onSearch={onPressEnter}
          />
          <div className="gutter" />
          <ChainSelector onChange={setTypeChain} />
          <div className="gutter" />
          <StatusSelector onChange={setStatus} />
          <div className="gutter" />
          <OrderSelector />
        </SelectorsContainer>
      </div>
      <ListPageLoading loading={isLoading} />
      <UserNFTList list={NFTs} />
      <CustomPagination
        defaultCurrent={current}
        total={NFTs?.length}
        onChange={setCurrent}
        pageSize={20}
        pageSizeOptions={['20']}
      />
    </PersonalContainer>
  )
}

export default PersonalHomepage
