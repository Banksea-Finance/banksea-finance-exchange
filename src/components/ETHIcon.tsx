import React from 'react'

const ETHIcon: React.FC = () => {
  return (
    <img
      src={require('../assets/images/commons/eth.svg').default}
      alt="ETH"
      style={{ width: '1.2rem', marginLeft: '3vw' }}
    />
  )
}

export default ETHIcon
