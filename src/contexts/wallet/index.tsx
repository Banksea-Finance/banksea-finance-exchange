import type { PublicKey } from '@solana/web3.js'
import { Transaction } from '@solana/web3.js'

import Wallet from '@project-serum/sol-wallet-adapter'
import EventEmitter from 'eventemitter3'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import notify from '@/utils/notify'
import { useConnectionConfig } from '../connection'
import useLocalStorage from '@/hooks/useLocalStotrage'
import { LedgerWalletAdapter } from '@/web3/wallet-adapters/ledger'
import { SolongWalletAdapter } from '@/web3/wallet-adapters/solong'
import { PhantomWalletAdapter } from '@/web3/wallet-adapters/phantom'
import { shortenAddress } from '@/utils'
import { CustomModal, WalletItem } from './modal'

const ASSETS_URL = 'https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/'

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (_transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

export type SupportWalletNames =
  | 'Phantom'
  | 'Solflare'
  | 'Solong'
  | 'MathWallet'
  | 'Ledger'
  | 'Sollet'

export type SolanaWallet = {
  name: SupportWalletNames
  url: string
  icon: string
  adapter?: new() => WalletAdapter
}

export type WalletContextValues = {
  adapter: WalletAdapter | undefined;
  connected: boolean;
  select: () => void;
  wallet: SolanaWallet | undefined;
}

export const SUPPORT_WALLETS: SolanaWallet[] = [
  {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://raydium.io/_nuxt/img/phantom.d9e3c61.png',
    adapter: PhantomWalletAdapter
  },
  {
    name: 'Solflare',
    url: 'https://solflare.com/access-wallet',
    icon: `${ASSETS_URL}solflare.svg`
  },
  {
    name: 'Solong',
    url: 'https://solongwallet.com',
    icon: `${ASSETS_URL}solong.png`,
    adapter: SolongWalletAdapter
  },
  {
    name: 'MathWallet',
    url: 'https://mathwallet.org',
    icon: `${ASSETS_URL}mathwallet.svg`
  },
  {
    name: 'Ledger',
    url: 'https://www.ledger.com',
    icon: `${ASSETS_URL}ledger.svg`,
    adapter: LedgerWalletAdapter
  },
  {
    name: 'Sollet',
    url: 'https://www.sollet.io',
    icon: `${ASSETS_URL}sollet.svg`
  }
]

const WalletContext = React.createContext<WalletContextValues>({
  adapter: undefined,
  connected: false,
  select: () => {
  },
  wallet: undefined
})

export const WalletProvider: React.FC = ({ children }) => {
  const { endpoint } = useConnectionConfig()

  const [connected, setConnected] = useState(false)
  const [autoConnect, setAutoConnect] = useState(false)
  const [providerUrl, setProviderUrl] = useLocalStorage('walletProvider')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const select = useCallback(() => setIsModalVisible(true), [])
  const close = useCallback(() => setIsModalVisible(false), [])

  const wallet = useMemo(
    () => SUPPORT_WALLETS.find(({ url }) => url === providerUrl),
    [providerUrl]
  )

  const adapter = useMemo(
    () => {
      if (!wallet) {
        return undefined
      }

      return new (wallet.adapter || Wallet)(
        providerUrl,
        endpoint
      ) as WalletAdapter
    },
    [wallet, providerUrl, endpoint]
  )

  useEffect(() => {
    if (adapter) {
      adapter.on('connect', () => {
        if (!adapter.publicKey) {
          console.error('adapter connected, but got null publicKey!')
          return
        }

        setConnected(true)
        const walletPublicKey = adapter.publicKey.toBase58()
        const keyToDisplay =
            walletPublicKey.length > 20
              ? shortenAddress(walletPublicKey)
              : walletPublicKey

        notify({
          message: 'Wallet update',
          description: 'Connected to wallet ' + keyToDisplay
        })
      })

      adapter.on('disconnect', () => {
        setConnected(false)
        notify({
          message: 'Wallet update',
          description: 'Disconnected from wallet'
        })
      })
    } else {
      console.error('not adapter found')
    }

    return () => {
      setConnected(false)
      if (adapter) {
        adapter.disconnect()
      }
    }
  }, [adapter])

  useEffect(() => {
    if (adapter && autoConnect) {
      adapter.connect()
      setAutoConnect(false)
    }

    return () => {}
  }, [adapter, autoConnect])

  return (
    <WalletContext.Provider
      value={{
        adapter,
        connected,
        select,
        wallet
      }}
    >
      {children}
      <CustomModal title="Connect To Wallet" visible={isModalVisible} footer="" onCancel={close}>
        {SUPPORT_WALLETS.map(wallet => {
          const onClick = function() {
            setProviderUrl(wallet.url)
            setAutoConnect(true)
            close()
          }

          return (
            <WalletItem wallet={wallet} key={wallet.name} onClick={onClick} />
          )
        })}
      </CustomModal>
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const { adapter, connected, wallet, select } = useContext(WalletContext)

  return {
    adapter,
    connected,
    wallet,
    select,
    publicKey: adapter?.publicKey,
    connect() {
      adapter ? adapter.connect() : select()
    },
    disconnect() {
      adapter?.disconnect()
    }
  }
}
