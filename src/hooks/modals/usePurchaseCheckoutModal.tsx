import React, { useCallback, useState } from 'react'
import { Button, Checkbox, Divider, message, Modal } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useModal } from '@/hooks/useModal'
import ETHIcon from '@/components/ETHIcon'
import useCheckBalance from '@/hooks/contract/service/useCheckBalance'
import { NFTDetail } from '@/types/NFTDetail'

const PurchaseCheckoutModal = styled(Modal)`

  .ant-modal-close-icon {
    color: white;
  }

  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;

  }

  .ant-modal-body,
  .ant-modal-header {
    background-color: #111C3A;
  !important;
  }

  .ant-modal-header {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    border-bottom: none;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    color: white;
    font-size: 2.1rem;
  }

  .checkout-list {
    display: flex;
    justify-content: space-between;
    color: #97BCF8;

    p {
      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
    }
  }

  .checkout-detail {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    .ntf-info {
      display: flex;

      .nft-image {
        object-fit: cover;
        width: 7.1rem;
        height: 7.1rem;
      }

      .nft-detail {
        margin-left: 2.4rem;
        align-self: center;

        .artist-name {
          font-size: 1.8rem;
          font-weight: 500;
          color: #97BCF8;
          line-height: 2.5rem;
        }

        .nft-name {
          font-size: 1.8rem;
          font-weight: 550;
          line-height: 2.5rem;
          color: #97BCF8;

        }
      }
    }

    .nft-value {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      align-self: center;

      .nft-price {
        display: flex;
        justify-content: flex-end;
        color: #97BCF8;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 2.5rem;
        width: 15.1rem;
      }

      .nft-price-dollar {
        display: flex;
        justify-content: flex-end;
        color: #97BCF8;
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 20px;
        width: 15.1rem;
      }
    }
  }

  .total-price {
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;

    .total {

      line-height: 25px;
      font-size: 1.8rem;
      font-weight: 550;
      color: #97BCF8;
    }

    .nft-value {
      display: flex;
      flex-direction: column;
      align-self: center;
      text-align: right;

      .nft-price {
        display: flex;
        justify-content: flex-end;
        font-size: 1.8rem;
        font-weight: 500;
        color: #97BCF8;
        line-height: 3rem;
        width: 15.1rem;
      }

      .nft-price-dollar {
        display: flex;
        justify-content: flex-end;
        font-size: 1.8rem;
        font-weight: 500;
        color: #97BCF8;
        line-height: 2.5rem;
        width: 15.1rem;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 3.3rem;

    .ant-btn {
      color: #FFFFFF !important;
      font-size: 1.8rem !important;
      width: 16.1rem;
      height: 5rem;
      background: #554BFF;
      border: none;
      border-radius: 1rem;
    }

    .ant-btn > span {
      font-weight: 550;
    }
  }
`

/*const Caveat = styled.div`
  width: 100%;
  height: 4.3rem;
  display: flex;
  align-items: center;
  background: #FDFDF4;
  border: 1px solid #E0DDF6;
  position: relative;

  .danger {
    width: 2rem;
    margin-left: 1.7rem;
  }

  span {
    margin-left: 1.4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }

  .dangerDownArrow {
    width: 1.2rem;
    position: absolute;
    right: 1.5rem;
  }
`*/

/*const CaveatContent = styled.div`
  width: 100%;
  padding: 2rem;
  background: #FDFDF4;
  border: 1px solid #EFC300;
`*/

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


  .ant-checkbox + span {
    color: #97BCF8;
    font-size: 1.2rem;
  }
`

const Line = styled.div`
  position: absolute;
  right: 0rem;
  top: 5rem;
  width: 100%;
  height: 0.15rem;
  background: linear-gradient(to right, #00FFFF, #7702FF);
`

export const usePurchaseCheckoutModal = (checkoutPassed: () => void, checkoutFailed: () => void, nftDetail?: NFTDetail) => {
  const [allChecked, setAllChecked] = useState(false)
  const [checking, setChecking] = useState(false)

  const checkBalance = useCheckBalance()

  const checkboxOptions = [
    'By checking this box. I acknowledge that this item has not been reviewed or approved by Banksea',
    'By checking this box. I agree to Banksea\'s Terms of Services'
  ]

  const onChange = (e: any) => setAllChecked(e.length === checkboxOptions.length)

  const handleCheckout = () => {
    setChecking(true)

    checkBalance(nftDetail?.price)
      .then(() => {
        setChecking(false)
        checkoutPassed()
      })
      .catch(e => {
        message.warn(e?.toString() ?? 'Error occurred while checking balance')
        setChecking(false)
        checkoutFailed()
      })
  }

  const buildModalByNftDetail = useCallback(
    (close: () => void, visible: boolean) => (
      <PurchaseCheckoutModal
        title="Checkout"
        visible={visible}
        onCancel={close}
        footer={null}
      >
        <Line />
        <div className="checkout-list">
          <p>Item</p>
          <p>Subtotal</p>
        </div>
        <Line style={{ marginTop: '16.5rem' }} />
        <div className="checkout-detail">
          <div className="ntf-info">
            <img className="nft-image" src={nftDetail?.image} alt="" />
            <div className="nft-detail">
              <div className="artist-name">{nftDetail?.name}</div>
              <div className="nft-name">{nftDetail?.description}</div>
            </div>
          </div>
          <div className="nft-value">
            <div className="nft-price">
              <ETHIcon />
              {nftDetail?.price ? nftDetail?.price : '---'}
            </div>
            <div className="nft-price-dollar">( $ - )</div>
          </div>
        </div>
        <Line style={{ marginTop: '24.5rem' }} />
        <div className="total-price">
          <div className="total">Total</div>
          <div className="nft-value">
            <div className="nft-price">
              <ETHIcon />
              {nftDetail?.price ? nftDetail?.price : '- - -'}
            </div>
            <div className="nft-price-dollar">( $ - )</div>
          </div>
        </div>
        <Divider />
        <Announcement>
          <Checkbox.Group options={checkboxOptions} onChange={onChange} />
        </Announcement>
        <div className="footer">
          <Button disabled={!allChecked || checking} onClick={handleCheckout}>
            {
              checking ? (<><LoadingOutlined />&nbsp;Checking...</>) : 'Checkout'
            }
          </Button>
        </div>
      </PurchaseCheckoutModal>
    ),
    [nftDetail, allChecked, onChange]
  )

  const { modal, open, close } = useModal((_open, close, visible) => buildModalByNftDetail(close, visible))

  return {
    purchaseCheckoutModal: modal,
    openPurchaseCheckoutModal: open,
    closePurchaseCheckoutModal: close
  }
}
