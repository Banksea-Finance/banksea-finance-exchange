import { useModal } from '@/hooks/useModal'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import clsx from 'clsx'
import useSellNFT from '@/hooks/contract/service/useSellNFT'

type MessageHintProps = {
  message: string,
  type?: 'error' | 'hint' | 'success'
}

const SellingModal = styled(Modal)`
  .ant-modal-close-icon {
    color: white;
  }

  .ant-modal-content {
    border-radius: 1rem;
    width: 58.3rem;
  }

  .ant-modal-body,
  .ant-modal-header {
    background-color: #111C3A;
  !important;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    color: white;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .checkout-list {

    .checkout-list-title {
      color: white;
      line-height: 25px;
      font-size: 1.6rem;

    }

    .sellMethodButton {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      margin-bottom: 3.6rem;

      Button {
        width: 11.6rem;
        height: 4.2rem;
        background: #554BFF;
        border: none;
        border-radius: 1rem;
        color: white;
        font-size: 1.6rem;
        font-weight: 550;
      }

      .tabs__link {
        background-color: #6974FF;
        color: #ffffff;
      }
    }
  }

  .sellContent {
    width: 100%;
    display: none;
    margin-top: -1rem;

    .hightest {
      color: white;
      line-height: 25px;
      font-size: 1.6rem;


    }

    .fixedPrice {
      width: 100%;
      display: flex;
      align-items: center;

      .ant-input-group {
        width: 60%;
      }

      .ant-select-selector {

        height: 5rem;
        display: flex;
        align-items: center;
        color: white;
        background: #554BFF !important;
        border: none;

      }

      .ant-select-selection-item {
        color: white;
        font-weight: 550;
      }

      .ant-input-group.ant-input-group-compact > *:first-child, .ant-input-group.ant-input-group-compact > .ant-select:first-child > .ant-select-selector, .ant-input-group.ant-input-group-compact > .ant-select-auto-complete:first-child .ant-input, .ant-input-group.ant-input-group-compact > .ant-cascader-picker:first-child .ant-input {
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }

      .ant-input {

        width: 130% !important;
        height: 5rem;
        color: white;
        font-size: 1.6rem;
        font-weight: 550;
        background: #305099 !important;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border: none;
      }

      span {
        color: white;
      }
    }

    .listing {
      width: 100%;
      height: 5rem;

      background: #554BFF;
      border: none;
      color: #ffffff;
      font-weight: 550;
      border-radius: 1rem;
      font-size: 2.4rem;
    }
  }

  .sellContent.active {
    display: block;
  }

  .checkout-detail {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .ntf-info {
      display: flex;

      .nft-image {
        width: 7.1rem;
        height: 7.1rem;
        background: #D8D8D8;
      }

      .nft-detail {
        margin-left: 2.4rem;
        align-self: center;

        .artist-name {
          font-size: 1.8rem;
          font-weight: 500;
          color: #7C6DEB;
          line-height: 2.5rem;
        }

        .nft-name {
          font-size: 1.8rem;
          font-weight: 550;
          line-height: 2.5rem;
        }
      }
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.5rem;
        width: 7.1rem;
      }

      .nft-price-dollar {
        font-size: 1.4rem;
        font-weight: 500;
        color: #999999;
        line-height: 20px;
        width: 7.1rem;
      }
    }
  }

  .total-price {
    display: flex;
    justify-content: space-between;

    .total {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        font-size: 2.2rem;
        font-weight: 500;
        color: #7C6DEB;
        line-height: 3rem;
        width: 9.1rem;
      }

      .nft-price-dollar {
        font-size: 1.8rem;
        font-weight: 500;
        color: #999999;
        line-height: 2.5rem;
        width: 9.1rem;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 3.3rem;

    .ant-btn {
      width: 16.1rem;
      height: 5rem;
      background: #7C6DEB;
      border-radius: 1rem;
    }

    .ant-btn > span {
      font-size: 1.8rem;
      font-weight: 550;
      color: #FFFFFF;
    }
  }
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


  .text {
    width: 54.6rem;
    font-size: 1.3rem;
    color: #97BCF8;
    line-height: 2.5rem;
  }

  .text2 {
    font-size: 1.6rem;
    font-weight: 400;
    color: #7c6deb;
    line-height: 2.5rem;
    padding: 3rem;
  }
`

const Line = styled.div`
  position: absolute;
  right: 0rem;
  top: 5.5rem;
  width: 100%;
  height: 0.15rem;
  background: linear-gradient(to right, #00FFFF, #7702FF);
`

const AuctionItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  .auctionItemLeft {
    color: white;
  }

`

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': '#7c6deb'
  }[type] : ''

  return (
    <p style={{ fontSize: '14px', fontWeight: 'bold', color }}>
      {message}
    </p>
  )
}

type SellingModalProps = {
  nftDetail: any,
  onSellingConfirmed: () => void
  onStart: () => void
}

export const useSellingModal = ({ nftDetail, onSellingConfirmed, onStart }: SellingModalProps) => {
  const [checked, setChecked] = useState(false)
  const [current, setCurrent] = useState(0)
  const [hintMessage, setHintMessage] = useState<MessageHintProps>({
    message: '', type: 'hint'
  })

  const { listByFixedPrice } = useSellNFT()

  const formInitialValues = {
    price: ''
  }

  const [form] = Form.useForm<typeof formInitialValues>()

  const AVAILABLE_SELLING_METHODS = ['Fixed price', 'Auction', 'Splitting', 'Mortgage']

  const validateCheckbox = () => new Promise<void>((resolve, reject) => {
    if (!checked) {
      setHintMessage({
        message: 'Please check the checkbox first!',
        type: 'error'
      })
      reject()
    }

    resolve()
  })

  const handleListing = async (values: typeof formInitialValues) => {
    onStart()

    await listByFixedPrice(nftDetail, values.price)

    onSellingConfirmed()
  }

  const onListingButtonClicked = async () => {
    validateCheckbox()
      .then(() => form.validateFields())
      .then(handleListing)
  }

  const { modal, open, close } = useModal((_open, close, visible) => (
    <SellingModal
      title="Selling"
      visible={visible}
      onCancel={close}
      footer={null}
    >
      <Line />
      <div className="checkout-list">
        <div className="checkout-list-title">Sell Method</div>
        <div className="sellMethodButton">
          {
            AVAILABLE_SELLING_METHODS.map((item: string, index: number) => (
              <Button
                className={clsx(index === current && 'tabs__link')}
                onClick={() => setCurrent(index)}
                key={index}
              >
                {item}
              </Button>
            ))
          }
        </div>
      </div>
      <div className={clsx('sellContent', current === 0 && 'active')}>
        <p className="hightest">Set Price</p>
        <Form form={form} initialValues={formInitialValues}>
          <div className="fixedPrice">
            <Input.Group compact>
              <Select defaultValue="SOL">
                <Select.Option value="SOL">
                  SOL
                </Select.Option>
              </Select>
              <Form.Item name="price">
                <Input style={{ width: '50%' }} />
              </Form.Item>
            </Input.Group>
          </div>
          <Button className="listing" onClick={onListingButtonClicked}>Listing</Button>
        </Form>
        <MessageHint {...hintMessage} />
        <Announcement>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            style={{ marginLeft: '5rem' }}
          >
            <div className="text">
              Listing is free! At the time of the sale, the following fees will be decucted.
            </div>
            <div className="text">Total fees ----------------------------------------------------------- 2%</div>
          </Checkbox>
        </Announcement>
      </div>

      <div className={'sellContent ' + (current === 1 ? 'active' : '')}>
        <p className="hightest">Highest Bid</p>
        <Line style={{ marginTop: '15.2rem' }} />
        <div>
          <AuctionItem>
            <div className="auctionItemLeft">
              <div>Minimum Bid</div>
              <div>
                <span>Set your starting price.</span>
                <span>Learn more</span>
              </div>
            </div>
          </AuctionItem>
        </div>
      </div>
    </SellingModal>
  ))

  return {
    sellingModal: modal,
    openSellingModal: open,
    closeSellingModal: close
  }
}
