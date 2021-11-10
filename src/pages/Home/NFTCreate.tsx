import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Form, Input, message, Select, Upload } from 'antd'
import UploadBtn from '@/assets/images/upload-button.png'
import { pinFileToIPFS } from '@/utils/ipfs'
import { UploadProps } from 'antd/lib/upload/interface'
import { RcFile } from 'antd/es/upload'
import { LoadingOutlined } from '@ant-design/icons'
import { bankseaWeb3 } from '@/BankseaWeb3'
import { useHistory } from 'react-router-dom'
import LoadingModal from '../../components/PleaseWaitModal'
import { useWalletErrorMessageGetter } from '@/hooks/useWalletErrorMessageGetter'
import { useSolanaWeb3 } from '@/contexts/solana-web3'

const ArtistPageContainer = styled.div`
  padding-top: 5.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-weight: 550;
    font-size: 4.6rem;

    background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
    line-height: 4.2rem;
    padding-bottom: 4.7rem;
  }

  @media screen and ( max-width: 1000px ){
    padding-top: 2rem;
    .title {
      font-weight: 550;
      font-size: 3rem;
      margin-bottom: 0;
    }
  }
`

const ArtistForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 82.8rem;
  background: #111C3A;
  border-radius: 5rem;
  padding: 3rem 8rem 12.2rem 8rem;
  margin-bottom: 5rem;

  h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    color: white;
    line-height: 2.8rem;
    padding-top: 3rem;
  }

  .text-area {
    &::placeholder {
      color: #4779B5 !important;
    }

    height: 10rem !important;
    background: #305099 !important;
    border-radius: 1rem !important;
    border: none;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 2rem !important;
  }

  @media screen and ( max-width: 1000px ) {
    width: 90vw;
    padding: 0 3rem;

    h1 {
      font-size: 1.5rem;
    }

  }


`

const CustomFormItem = styled(Form.Item)`
  width: 100%;
  margin-top: 2.5rem;

  .ant-form-item-label > label {
    font-size: 1.6rem;
    font-weight: 500;
    color: #98BDF9;
    line-height: 2.2rem;

  }

  .ant-input {
    &::placeholder {
      color: #4779B5;
    }

    height: 3.6rem ;
    background: #305099 !important;
    border-radius: 1rem !important;
    border: none;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 2rem !important;
  }


`

const Selector = styled(Select)`
  width: 14.4rem !important;
  border: none;

  .ant-select-selector {
    width: 14.4rem !important;
    height: 3.6rem !important;
    background: #305099 !important;
    border-radius: 1rem !important;
    border: none;
  }

  .ant-select-clear {
    background-color: transparent;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 2rem !important;
    padding-right: 5rem !important;
  }
  span {
    color: white;
  }

`

const AssetUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3.7rem;

  .upload-border {
    width: fit-content;
    background: #305099;
    border-radius: 1rem;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      margin-top: 10rem;
      margin-bottom: 4.3rem;
      width: 8.2rem;
    }

    .tip {
      text-align: center;
      width: 15.4rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: black;
      opacity: 0.5;
      filter: alpha(opacity=50); /* IE8 及其更早版本 */
      margin-left: 7.2rem;
      margin-right: 7.2rem;
    }

    .tip:nth-of-type(1) {
      margin-bottom: 1.2rem;
    }

    .tip:nth-of-type(2) {
      margin-bottom: 10rem;
    }

    img.pinned {
      width: 46rem;
      margin: 2.5rem;
    }

    .loading {
      margin: 14rem 10rem;
      font-size: 10rem;
      color: #4779B5;
    }
  }

  .upload-btn {
    margin-top: 2rem;
    width: 9.8rem;
    height: 3.6rem;
    background: #7c6deb;
    border-radius: 1rem;
    text-align: center;

    font-size: 1.2rem;
    font-weight: 500;
    color: #ffffff;
    line-height: 2.2rem;
  }
`

const Announcement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .text {
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: #4779B5;
    line-height: 2.5rem;
  }

  @media screen and ( max-width: 1000px ) {
    .text {
      font-size: 1rem;
      margin-bottom: 2.5rem;
    }

  }



`

const CreateButton = styled(Button)`
  height: 3vw;
  width: 6.85vw;
  margin: 5.2rem 0 1.2rem 0;
  background: #554BFF;
  border-radius: 1rem;
  text-align: center;
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  color: #ffffff;

  @media screen and ( max-width: 1000px ) {
    height: 4rem;
    }
`

type AssetUploadProps = {
  onUploadSuccess: (_assetIpfsHash: string) => void
}

type MessageHintProps = {
  message: string,
  type?: 'error' | 'hint' | 'success'
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

export type NFTCreateForm = {
  artworkName: string
  artistName: string
  briefIntroduction: string
  artworkType: string
  socialMedia: string

  assetIpfsHash: string
}

const NFTCreate: React.FC = () => {
  const { select, connected, account } = useSolanaWeb3()

  const history = useHistory()

  const [form] = Form.useForm<NFTCreateForm>()

  const { getWalletErrorMessage } = useWalletErrorMessageGetter()

  const [loading, setLoading] = useState(false)

  const [promised, setPromised] = useState(false)
  const [hintMessage, setHintMessage] = useState<MessageHintProps>({
    message: '', type: 'hint'
  })

  const formInitialValues: NFTCreateForm = {
    artistName: '',
    artworkName: '',
    artworkType: 'pictures',
    briefIntroduction: '',
    socialMedia: '',
    assetIpfsHash: ''
  }

  const onAssetUploadSuccess = (assetIpfsHash: string) => {
    form.setFieldsValue({ assetIpfsHash })
  }

  const handleCreate = async () => {
    if (!promised) {
      setHintMessage({
        message: 'Please check the checkbox first!',
        type: 'error'
      })
      return
    }

    if (!form.getFieldsValue().assetIpfsHash) {
      setHintMessage({
        message: 'Please upload artwork image first!',
        type: 'error'
      })
      return
    }

    setHintMessage({
      message: ''
    })

    const formValues = await form.validateFields().catch(() => {
      setHintMessage({
        message: 'Please complete the form first!',
        type: 'error'
      })
    })

    if (!formValues) {
      return
    }

    bankseaWeb3.services.createNft(formValues, account!.toBase58())
      .on('pinning_json', () => {
        setHintMessage({
          message: 'Pinning asset JSON to IPFS...',
          type: 'hint'
        })
      })
      .on('json_pinned', () => {
        setHintMessage({
          message: 'Pinned successful! Please confirm in your wallet...',
          type: 'hint'
        })
      })
      .on('json_pinned_failed', (e: any) => {
        setHintMessage({
          message: `Error occurred when pinning JSON to IPFS, retry again. (${e.toString()})`,
          type: 'error'
        })
        setLoading(false)
      })
      .on('submitted', () => {
        setHintMessage({
          message: 'Your creation request has been submitted! Waiting the transaction on chain confirmed. Please DO NOT close this page now!',
          type: 'hint'
        })
        setLoading(false)
      })
      .on('complete', () => {
        message.success('Create successfully!')
        history.push(`/nft/create/success?img=${formValues.assetIpfsHash}&name=${formValues.artworkName}`)
      })
      .on('wallet_error', e => {
        console.log('get wallet_error: ', getWalletErrorMessage(e))
        setHintMessage({
          message: getWalletErrorMessage(e),
          type: 'error'
        })
      })
      .exec()

  }

  const creating = (() => !!hintMessage.message && hintMessage.type === 'hint')()

  useEffect(() => {
    // if (providerInitialized && !networkReady) {
    //   setHintMessage({ message: 'Please manually switch to the Rinkeby in MetaMask', type: 'error' })
    // }
    //
    // if (providerInitialized && networkReady || !providerInitialized) {
    //   setHintMessage({ message: '' })
    // }
    if (!connected) {
      setHintMessage({ message: 'Please connect to a wallet first', type: 'error' })
    } else {
      setHintMessage({ message: '' })
    }
  }, [connected])

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
          <AssetUpload onUploadSuccess={onAssetUploadSuccess} />
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
            <CreateButton onClick={handleCreate} disabled={creating}>
              {
                creating
                  ? 'Creating...'
                  : 'Create'
              }
            </CreateButton>
          )
        }

        <MessageHint {...hintMessage} />
      </ArtistForm>
      <LoadingModal visible={loading} onCancel={() => setLoading(false)} />
    </ArtistPageContainer>
  )
}

export default NFTCreate
