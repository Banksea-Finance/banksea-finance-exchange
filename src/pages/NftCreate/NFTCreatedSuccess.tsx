import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { useLocationQuery } from '@/hooks/useLocationQuery'
import { getUriByIpfsHash } from '@/utils/ipfs'

type NFTCreatedSuccessProps = {
  name: string
}

const SCNFTCreatedSuccessContainer = styled.div`
  margin: 0 auto;
  width: 50rem;
  padding: 4.2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SCTitle = styled.div`
  margin-bottom: 4rem;
  font-size: 1.8rem;
  color: #ececec;

  b {
    background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  b:after {
    content: ' ';
  }

`

const SCImage = styled.img`
  max-width: 60rem;
  max-height: 44rem;
  object-fit: cover;
  margin-bottom: 5.2rem;
`

const SCButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.6rem;

  button {
    height: 5rem !important;
    border-radius: 1rem;
    font-weight: bold;
  }
`


const NFTCreatedSuccess: React.FC<NFTCreatedSuccessProps> = () => {
  const name = useLocationQuery('name')
  const img = useLocationQuery('img')

  const history = useHistory()

  useEffect(() => {
    if (!name || !img) {
      history.push('/')
    }
  }, [name, img])

  return (
    <div style={{ height: 'calc(100vh - 62px)' }}>
      <SCNFTCreatedSuccessContainer>
        <SCTitle>
          <b>{name}</b>
          has been created !
        </SCTitle>
        <SCImage src={getUriByIpfsHash(img!)} alt={name} />
        <SCButtonRow>
          <Link to="/marketplace" style={{ flex: 8 }}>
            <Button style={{ color: 'white', backgroundColor: '#305099', width: '100%' }}>
              View in Marketplace
            </Button>
          </Link>
          <div style={{ flex: 1 }} />
          <Link to="/personal/home" style={{ flex: 3 }}>
            <Button style={{ color: '#305099', backgroundColor: '#ddd', border: '1px solid #305099', width: '100%' }}>
              Go to Personal Home
            </Button>
          </Link>
        </SCButtonRow>
      </SCNFTCreatedSuccessContainer>
    </div>
  )
}

export default NFTCreatedSuccess
