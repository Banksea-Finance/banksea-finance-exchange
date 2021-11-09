import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message } from 'antd'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'
import { fileCoinList, retweetCreat, retweetList, solanaList, voteCreate } from '@/apis/vote'
import VoteBanner from '@/assets/images/VoteImg/VoteBanner.png'
import { useMediaQuery } from 'react-responsive'

const VoteContainer = styled.div`
  min-height: 100vh;
  background: #090F22;

  @media screen and (min-width : 300px) and (max-width: 1000px) {
    width: fit-content;
    background-color: #0B111E;
    overflow-x: hidden;
  }
`

const VoteContainerTop = styled.div`
  width: 100% ;
  height: 34.4rem;
  background: url(${VoteBanner}) no-repeat;
  background-size:100% 100%;
  position: relative;
  // margin-left: 20.2rem;

  @media screen and (max-width: 1000px) {
    width: 100vw;
    height: 32vh;
    background: #97BCF9;
    padding: 5vw;

    .vote-container-title {
      font-size: 8vw;
      font-weight: bolder;
      color: #280D5F;

    }
  }
`

const ViewOperationSelect = styled.div`
  display: flex;
  justify-content: flex-end;
  div {
    width: 14.5rem;
    height: 7rem;
    background: #405099;
    color: #fff;
    font-weight: bolder;
    border-radius: 1rem;
    line-height: 10rem;
    text-align: center;
    margin-top: -3rem;
    cursor: pointer;
    transition: all 0.7s;
    margin-right: 5rem;
  }

  div:hover {
    margin-top: -2rem;
  }

  .tabs__link {
    background-color: #405099;
    color: #00FEFF;
    margin-top: -2rem;
  }
  @media screen and (max-width: 1000px) {
    display: flex;
    width: 100vw;
    justify-content: space-around;
    float: none;
    margin: 0;

    div {
      width: 20vw;
      margin-right: 0;
    }
  }
`

const Registration = styled.div`

  .registration {
    display: none;
  }

  .registration.active {
    display: block;
  }

  @media screen and (max-width: 1000px) {
    width: 100vw;
    overflow-x: hidden;
  }
`

const RegistrationContainer = styled(Form)`
  width: 116rem;
  display: flex;
  // justify-content: space-between;
  margin-top: 9.6rem;
  margin-left: calc((100% - 80vw) / 2);

  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 5vw 10vw;
    width: 100vw;
    margin: 0;

  }
`

const RegistrationItem = styled(Form.Item)`
  width: 100%;
  margin-right: 4rem;
  display: flex;
  flex-wrap: wrap;


  .ant-form-item-label {
    display: flex;
    justify-content: flex-start;
    height: 3vw;
    overflow: visible;
    width: 14vw;

    label {
      white-space: normal;
      text-align: left;
      color: #9FC4FD;
      font-size: 0.9vw;
      font-weight: 550;
      &:after {
        content: none !important;
      }
    }
  }

  .ant-input {
    width: 20rem;
    height: 4rem;
    background: #405099;
    color: #4470C1;
    font-weight: bold;
    border: 0.2rem solid #4470C1;
    border-radius: 0.8rem;
  }

  @media screen and (max-width: 1000px) {
    width: 80vw;
    margin: 0;
    display: flex;
    flex-wrap: wrap;

    .ant-form-item-label > label {
      width: 100vw;
      font-size: 3.5vw !important;
      font-weight: 500;
      color: #98BDF9;
    }

    .ant-input {
      &::placeholder {
        color: #4779B5;
      }
      margin-top: 6vw;
      height: 4vh;
      width: 100%;
      background: #305099 !important;
      border-radius: 1rem !important;
      border: none;
      font-size: 2vw !important;
      font-weight: 500 !important;
      color: white !important;
    }
  }

`

const ConfirmButton = styled(Button)`
  width: 20rem;
  height: 4rem;
  background: #6C48FF;
  border-radius: 2rem;
  color: #fff;
  font-size: 1.4rem;
  margin-left: calc((100% - 20rem) / 2);
  margin-top: 2.1rem;
  border: none;
  font-weight: bolder;

  &.active,
  &:hover {
    background: #7A7AFF;
    color: #fff;
  }
`

const VotesContainerTable = styled.div`
  width: 100%;
  margin-top: 5rem;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  .votes {
    display: none;

    .search-box {
      position: relative;
      top: 2vw;
      width: 50vw;
      display: flex;
      align-items: center;
    }
  }

  .votes.active {
    display: block;
  }

  @media screen and (max-width: 1000px) {
    display: flex;

    width: 100vw !important;
    padding: 0;
  }
`

const SearchInput = styled(Input)`
  width: 40rem;
  height: 4rem;
  border: 2px solid #3658A7;
  background: none;
  border-radius: 4rem;
  position:absolute;
  right:0;
  margin-bottom:2rem;

  .ant-input {
    background: none;
    color: #3658A7;
    font-weight: bold;
  }
`

const VoteStatistics = styled.section`
  margin: 3vw 0;
  width: 116rem;

  table {
    width: 100%;
    border-spacing: 0px;
    border-collapse: collapse;
    table-layout:fixed;
    overflow-x: scroll;

    tbody tr td {
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      word-break:keep-all;
      padding: 0 7px;
    }
  }
  table caption{
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 50px;
  }

  table th, table td {
    height: 5.1rem;
    text-align: center;
    border: 1px solid #4470C1;
  }

  table thead {
    color: white;
    background-color: #405099;
  }

  table tbody {
    color: white;
    display: block;
    width: 100%;
    height: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  table thead tr, table tbody tr, table tr {
    box-sizing: border-box;
    table-layout: fixed;
    display: table;
    width: 116rem;
  }

  table tbody tr:nth-of-type(odd) {
    background: #405099;
  }

  table tbody tr:nth-of-type(even) {
    background: #405099;
  }

  table tbody tr td{
    border-bottom: none;
  }
  table tbody{
    &::-webkit-scrollbar {
        height: 5px;

    }
    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #fff;
    }
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
        border-radius: 0;
        background: #405099;
        border: 1px solid #4470C1;
    }
}
`

/*const MobileRegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5vw 10vw;
`*/

type VotesType = {
  current: number
  onPressEnter: any
  retweetTable?: any
  init?: any
  filecoin?: any
  solana?: any
}

const TwitterVotesTable: React.FC<VotesType> = ({ current, onPressEnter, retweetTable }) => {
  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 1 && 'active')}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Serial number</th>
                <th>twitterId</th>
                <th>retweetLink</th>
                <th>walletAddress</th>
                <th>referrerId(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                retweetTable?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.twitterId}</td>
                    <td>{item?.retweetLink}</td>
                    <td>{item?.walletAddress}</td>
                    <td>{item?.referrerId}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}

const TwitterVoteRegistration: React.FC<VotesType> = ({ current, onPressEnter, retweetTable, init }) => {

  const [twitterForm] = Form.useForm()

  const twitterFormValues = {
    twitterId: '',
    retweetLink: '',
    walletAddress: '',
    discordId: ''
  }
  const confirmTwitter = () => {
    twitterForm
      .validateFields()
      .then(values => {
        retweetCreat({
          twitterId: values?.twitterId,
          retweetLink: values?.retweetLink,
          walletAddress: values?.walletAddress,
          referrerId: values?.discordId
        }).then(() => {
          message.success('Form submit successfully!')
          init()
        })
      })
  }

  return (
    <Registration>
      <div className={clsx('registration', current === 1 && 'active')}>
        <RegistrationContainer form={twitterForm} initialValues={twitterFormValues} >
          <RegistrationItem>
            <Form.Item
              label="Twitter ID"
              name="twitterId"
              rules={[{ required: true, message: 'Please fill out Discord ID or Twitter ID or Telegram ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label= "Retweet Link"
              name="retweetLink"
              rules={[{ required: true, message: 'Please fill out Transaction record!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label="Wallet Address"
              name="walletAddress"
              rules={[{ required: true, message: 'Please fill out Wallet Address!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label="Referrer Discord ID Or Other ID"
              name="discordId"
              rules={[{ required: true, message: 'Please fill out Referrer Discord ID Or Other ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
        </RegistrationContainer>
        <ConfirmButton onClick={confirmTwitter}>Confirm</ConfirmButton>
      </div>
      <TwitterVotesTable current={current} retweetTable={retweetTable} onPressEnter={onPressEnter} />
    </Registration>
  )
}

const SolanaVotes: React.FC<VotesType> = ({ current, solana, onPressEnter }) => {
  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 2 && 'active')} style={{ marginTop: '12rem' }}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
          {/* <span className="search-box-text">Unit/USDC</span> */}
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Wallet Address</th>
                <th>Total Votes(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                solana?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item?.ranking}</td>
                    <td>{item?.source}</td>
                    <td>{item?.solanaVoting}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}

/*const FilecoinVotes: React.FC<VotesType> = ({ current, filecoin, onPressEnter }) => {

  return (
    <VotesContainerTable>
      <div className={clsx('votes', current === 0 && 'active')}>
        <div className="search-box">
          <SearchInput
            onPressEnter={onPressEnter}
            prefix={<SearchOutlined style={{ color: '#3658A7', width: '1.5rem' }} />}
          />
          {/!* <span className="search-box-text">Unit/USDC</span> *!/}
        </div>
        <VoteStatistics className="table-box">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Discord ID or Twitter ID or Telegram ID, Or Others</th>
                <th>Wallet Address</th>
                <th>Total Votes(USDC)</th>
              </tr>
            </thead>
            <tbody>
              {
                filecoin?.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item?.ranking}</td>
                    <td>{item?.discordId}</td>
                    <td>{item?.filecoinWalletAddress}</td>
                    <td>{item?.filecoinVotes}</td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </VoteStatistics>
      </div>
    </VotesContainerTable>
  )
}*/

const VoteRegistration: React.FC<VotesType> = ({ current, init }) => {
  const [form] = Form.useForm()

  const formInitialValues = {
    userId: '',
    record: '',
    votes: '',
    walletAddress: '',
    discordId: ''
  }

  const confirmCreat = () => {
    form.validateFields().then(values => {
      const confirmCreatForm = {
        discordId: values?.userId,
        transactionRecord: values?.record,
        votes: values?.votes,
        walletAddress: values?.walletAddress,
        referrerId: values?.discordId
      }

      voteCreate(confirmCreatForm).then(res => {
        if (res.data.data === '0') {
          message.success('This transaction record submit successfully. ')
        }
        else {
          message.success('This transaction record has been updated.')
        }
        init()
      })
    })
  }

  // @ts-ignore
  return (
    <Registration>
      <div className={clsx('registration', current === 0 && 'active')}>
        <RegistrationContainer form={form} initialValues={formInitialValues}>
          <RegistrationItem>
            <Form.Item
              label="Discord ID or Twitter ID or Telegram ID, Or Others"
              name="userId"
              rules={[{ required: true, message: 'Please fill out Discord ID or Twitter ID or Telegram ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label="Transaction record"
              name="record"
              rules={[{ required: true, message: 'Please fill out Transaction record!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              name="votes"
              label="Votes"
              rules={[{ required: true, message: 'Please fill out Votes!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label="Wallet Address"
              name="walletAddress"
              rules={[{ required: true, message: 'Please fill out Wallet Address!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
          <RegistrationItem>
            <Form.Item
              label="Referrer Discord ID Or Other ID"
              name="discordId"
              rules={[{ required: true, message: 'Please fill out Referrer Discord ID Or Other ID!' }]}
            >
              <Input />
            </Form.Item>
          </RegistrationItem>
        </RegistrationContainer>

        <ConfirmButton onClick={confirmCreat}>Confirm</ConfirmButton>
      </div>
      {/*<FilecoinVotes current={current} filecoin={filecoin} onPressEnter={onPressEnter} />*/}
    </Registration>
  )
}

const VotePage: React.FC = () => {

  const [current, setCurrent] = useState(0)

  const [searchKey, setSearchKey] = useState<any>()

  const [filecoin, setFilecoin] = useState<any>()

  const [solana, setSolana] = useState<any>()

  const [retweetTable, setRetweetTable] = useState<any>()

  const tabs = [ 'Filecoin Votes','Retweet', 'Solana Votes']
  const mobileTabs = ['Filecoin', 'Retweet', 'Solana']


  const init = useCallback(async (searchKey: any) => {
    if (current === 0) {
      await fileCoinList({
        searchKey: searchKey
      }).then((res: any) => {
        setFilecoin(res.data.data)
      })
    }
    if (current === 1) {
      await retweetList({
        searchKey: searchKey
      }).then((res: any) => {
        setRetweetTable(res.data.data)
      })
    }
    if (current === 2) {
      await solanaList({
        searchKey: searchKey
      }).then((res: any) => {
        setSolana(res.data.data)
      })
    }
  },[current, searchKey])

  useEffect(() => {
    init(searchKey)
  },[init])

  const onPressEnter = (e: any) => {
    setSearchKey(e.target.attributes[2].value)
    init(e.target.attributes[2].value)
  }
  const isMobile = useMediaQuery({ query: '(max-width:1000px)' })


  return (
    <VoteContainer>
      <VoteContainerTop>
        {
          isMobile &&
          <div className="vote-container-title">
            <div>Airdrop And Public</div>
            <div>Whitelist Event</div>
          </div>
        }
      </VoteContainerTop>
      <ViewOperationSelect>
        {
          isMobile ?
            mobileTabs.map((item: string, index: number) => (
              <div
                className={clsx(index === current && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </div>
            ))
            :
            tabs.map((item: string, index: number) => (
              <div
                className={clsx(index === current && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </div>
            ))
        }
      </ViewOperationSelect>
      <VoteRegistration current={current} filecoin={filecoin} onPressEnter={onPressEnter} init={init} />
      <TwitterVoteRegistration current={current} retweetTable={retweetTable} onPressEnter={onPressEnter} init={init} />
      <SolanaVotes current={current} solana={solana} onPressEnter={onPressEnter} />
    </VoteContainer>
  )
}

export default VotePage
