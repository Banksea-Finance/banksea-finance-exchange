import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Modal } from 'antd'

const CreateLoadingModal = styled(Modal)`
  width: 100%;
  background-color: #0B111E;
  overflow-x: hidden;

  .ant-modal-content {
    border-radius: 1rem;
    width: 62.3rem;
  }

  .ant-modal-header {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
  }

  .ant-modal-header .ant-modal-title {
    display: flex;
    justify-content: center;
    font-weight: 550;
    font-size: 1.8rem;
  }

  .loadingTitle {
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
    color: #7C6DEB;
    font-weight: bolder;
  }

  .loadingContent {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    margin-bottom: 3.5rem;
  }
`


const LoadingModal: React.FC<any> = ({ visible }) => {
  return (
    <CreateLoadingModal
      title={null}
      visible={visible}
      footer={null}
      maskClosable={false}
    >
      <div className="loadingTitle">Please wait</div>
      <div className="loadingContent">
        <LoadingOutlined style={{ color: '#7C6DEB', fontSize: '10rem' }} />
      </div>
    </CreateLoadingModal>
  )
}

export default LoadingModal
