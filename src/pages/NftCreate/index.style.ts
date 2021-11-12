import styled from 'styled-components'
import { Button, Form, Select } from 'antd'

export const ArtistPageContainer = styled.div`
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

  @media screen and ( max-width: 1000px ) {
    padding-top: 2rem;
    .title {
      font-weight: 550;
      font-size: 3rem;
      margin-bottom: 0;
    }
  }
`

export const ArtistForm = styled(Form)`
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

export const CustomFormItem = styled(Form.Item)`
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

    height: 3.6rem;
    background: #305099 !important;
    border-radius: 1rem !important;
    border: none;

    font-size: 1.4rem !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 2rem !important;
  }


`

export const Selector = styled(Select)`
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

export const AssetUploadContainer = styled.div`
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
      color: #fff;
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

export const Announcement = styled.div`
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

export const CreateButton = styled(Button)`
  height: 3vw;
  width: fit-content;
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
