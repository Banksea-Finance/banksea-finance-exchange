import React, { useEffect, useMemo, useState } from 'react'
import { Checkbox, Form, Input, message, Select, Upload } from 'antd'
import UploadBtn from '@/assets/images/upload-button.png'
import { pinFileToIPFS } from '@/utils/ipfs'
import { UploadProps } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'
import { LoadingOutlined } from '@ant-design/icons'
import { useSolanaWeb3 } from '@/contexts/solana-web3'
import {
  Announcement,
  ArtistForm,
  ArtistPageContainer,
  AssetUploadContainer,
  CreateButton,
  CustomFormItem,
  Selector
} from './index.style'
import useCreateNFT from '@/hooks/contract/service/useCreateNFT'

type AssetUploadProps = {
  onUploadSuccess: (assetIpfsHash: string) => void
}

type MessageHintProps = {
  message?: string,
  type?: 'error' | 'hint' | 'success'
}

export type NFTCreateForm = {
  artworkName: string
  artistName: string
  briefIntroduction: string
  artworkType: string
  socialMedia: string

  assetIpfsHash: string
}

const formInitialValues: NFTCreateForm = {
  artistName: '',
  artworkName: '',
  artworkType: 'pictures',
  briefIntroduction: '',
  socialMedia: '',
  assetIpfsHash: ''
}

const MessageHint: React.FC<MessageHintProps> = ({ message, type }) => {
  const color = type ? {
    'error': 'red',
    'success': 'rgb(82,196,26)',
    'hint': 'red'
  }[type] : ''

  return (
    <p style={{ fontSize: '1.2rem', color }}>
      {message}
    </p>
  )
}

const AssetUpload: React.FC<AssetUploadProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false)

  const [fileList, setFileList] = useState<RcFile[]>([])

  const [pinnedFileHash, setPinnedFileHash] = useState<any>()

  const handleUpload = () => {
    if (!fileList[0]) {
      return
    }

    setUploading(true)
    setPinnedFileHash(undefined)

    pinFileToIPFS(fileList[0])
      .then(r => {
        setUploading(false)
        setPinnedFileHash(r.data.IpfsHash)
        onUploadSuccess(r.data.IpfsHash)
      })
      .catch(e => {
        setUploading(false)
        message.warn(`Upload failed. [${e}]`)
      })
  }

  const uploadProps: UploadProps = {
    showUploadList: false,
    name: 'file',
    maxCount: 1,
    beforeUpload: async file => {
      setFileList([file])
      return false
    },
    fileList,
    progress: {
      strokeColor: {
        '0%': '#ffabe1',
        '50%': '#a685e2',
        '100%': '#7c6deb'
      },
      strokeWidth: 6,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`
    }
  }

  useEffect(handleUpload, [fileList])

  return (
    <AssetUploadContainer>
      <Upload {...uploadProps}>
        {pinnedFileHash ? (
          <div className="upload-border">
            <img className="pinned" src={`https://banksy.mypinata.cloud/ipfs/${pinnedFileHash}`} alt="" />
          </div>
        ) : uploading ? (
          <div className="upload-border">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <div className="upload-border">
            <img src={UploadBtn} alt="upload-btn" />
            <div className="tip">Support: png / jpg /</div>
            <div className="tip">Size: 10M/</div>
          </div>
        )}
      </Upload>
      {/*<Button className="upload-btn" onClick={handleUpload}>*/}
      {/*  Start Upload*/}
      {/*</Button>*/}
    </AssetUploadContainer>
  )
}

const NftCreate: React.FC = () => {
  const { select, connected } = useSolanaWeb3()

  const [form] = Form.useForm<NFTCreateForm>()

  const [promised, setPromised] = useState(false)

  const { create, hint } = useCreateNFT()

  const creating = useMemo(() => !!hint.message && hint.type === 'hint', [hint])

  return (
    <ArtistPageContainer>
      <div className="title">Banksea Artwork</div>
      <ArtistForm form={form} colon={false} layout="vertical" initialValues={formInitialValues}>
        <h1>1. Artwork Information</h1>

        <CustomFormItem
          name="artworkType"
          label="Artwork Type"
          rules={[{ required: true, message: 'Artwork Type is Required!' }]}
        >
          <Selector
            onChange={(value: any) => {
              form.setFieldsValue({ artworkType: value })
            }}
          >
            <Select.Option value="pictures">
              Pictures
            </Select.Option>
            <Select.Option value="gif">GIF</Select.Option>
            <Select.Option value="video">Video</Select.Option>
            <Select.Option value="audio">Audio</Select.Option>
          </Selector>
        </CustomFormItem>

        <CustomFormItem
          name="artworkName"
          label="Artwork Name"
          rules={[{ required: true, message: 'Artwork Name is Required!' }]}
        >
          <Input placeholder="Enter the artwork name" />
        </CustomFormItem>

        <CustomFormItem
          name="artistName"
          label="Artist Name"
          rules={[{ required: true, message: 'Artist Name is Required!' }]}
        >
          <Input placeholder="Enter the artist name" />
        </CustomFormItem>

        <CustomFormItem
          name="socialMedia"
          label="Social Media/Portfolio link"
          rules={[{ required: true, message: 'Social Media/Portfolio link is Required!' }]}
        >
          <Input placeholder="Personal website" />
        </CustomFormItem>

        <CustomFormItem
          name="briefIntroduction"
          label="Brief Introduction"
          rules={[{ required: true, message: 'Brief Introduction is Required!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter the Brief introduction" className="text-area" />
        </CustomFormItem>

        <h1>2. Upload Artwork Image</h1>

        <CustomFormItem
          name="assetIpfsHash"
          rules={[{ required: true }]}
        >
          <AssetUpload
            onUploadSuccess={(assetIpfsHash: string) => {
              form.setFieldsValue({ assetIpfsHash })
            }}
          />
        </CustomFormItem>

        <Announcement>
          <Checkbox
            checked={promised}
            onChange={e => setPromised(e.target.checked)}
          >
            <div className="text">
              I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the
              artwork can be removed anytime if detected.
            </div>
          </Checkbox>
        </Announcement>

        {
          !connected ? (
            <CreateButton onClick={select}>
              Connect to Wallet
            </CreateButton>
          ) : (
            <CreateButton onClick={() => create(form, promised)} disabled={creating}>
              {
                creating
                  ? 'Creating...'
                  : 'Create'
              }
            </CreateButton>
          )
        }

        <MessageHint {...hint} />
      </ArtistForm>
    </ArtistPageContainer>
  )
}

export default NftCreate
