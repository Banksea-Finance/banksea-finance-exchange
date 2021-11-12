import type { PublicKey } from '@solana/web3.js'
import { Transaction } from '@solana/web3.js'

import Wallet from '@project-serum/sol-wallet-adapter'
import EventEmitter from 'eventemitter3'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import notify from '@/utils/notify'
import { useConnectionConfig } from '@/contexts/solana-connection-config'
import { shortenAddress } from '@/utils'
import { WalletItem, WalletSelectionModal } from './modal'
import { LedgerWalletAdapter, PhantomWalletAdapter, SolongWalletAdapter } from './wallet-adapters'

const ASSETS_URL = 'https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/'

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey;
  signTransaction: (tx: Transaction) => Promise<Transaction>;
  signAllTransactions: (txs: Transaction[]) => Promise<Transaction[]>;
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
  account?: PublicKey,
  connect: () => void,
  disconnect: () => void
}

export const SUPPORT_WALLETS: Record<SupportWalletNames, SolanaWallet> = {
  'Phantom': {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://raydium.io/_nuxt/img/phantom.d9e3c61.png',
    adapter: PhantomWalletAdapter
  },
  'Solflare': {
    name: 'Solflare',
    url: 'https://solflare.com/access-wallet',
    icon: `${ASSETS_URL}solflare.svg`
  },
  'Solong': {
    name: 'Solong',
    url: 'https://solongwallet.com',
    icon: `${ASSETS_URL}solong.png`,
    adapter: SolongWalletAdapter
  },
  'MathWallet': {
    name: 'MathWallet',
    url: 'https://mathwallet.org',
    icon: `${ASSETS_URL}mathwallet.svg`
  },
  'Ledger': {
    name: 'Ledger',
    url: 'https://www.ledger.com',
    icon: `${ASSETS_URL}ledger.svg`,
    adapter: LedgerWalletAdapter
  },
  'Sollet': {
    name: 'Sollet',
    url: 'https://www.sollet.io',
    icon: `${ASSETS_URL}sollet.svg`
  }
}

const SolanaWeb3Context = React.createContext<WalletContextValues>({
  adapter: undefined,
  connected: false,
  select: () => {
  },
  wallet: undefined,
  connect: () => {},
  disconnect: () => {}
})

export const SolanaWeb3Provider: React.FC = ({ children }) => {
  const { endpointUrl } = useConnectionConfig()

  const [wallet, setWallet] = useState<SolanaWallet>()
  const [connected, setConnected] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const select = useCallback(() => setIsModalVisible(true), [])
  const close = useCallback(() => setIsModalVisible(false), [])

  const adapter = useMemo(
    () => {
      if (!wallet) {
        return undefined
      }

      return new (wallet.adapter || Wallet)(
        wallet.url,
        endpointUrl
      ) as WalletAdapter
    },
    [wallet, endpointUrl]
  )

  // after wallet being set, automatically execute connect method
  useEffect(() => {
    if (wallet && adapter) {
      adapter.connect()
    }
  }, [wallet, adapter])

  const account = useMemo(() => {
    if (!connected) {
      return undefined
    }

    return adapter?.publicKey
  }, [connected, adapter])

  const connect = useCallback(adapter?.connect ?? select , [adapter, select])

  const disconnect = useCallback(() => {
    adapter?.disconnect()
    setWallet(undefined)
  } , [adapter])

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

  return (
    <SolanaWeb3Context.Provider
      value={{
        adapter,
        connected,
        select,
        wallet,
        account,
        connect,
        disconnect
      }}
    >
      {children}
      <WalletSelectionModal title="Connect To Wallet" visible={isModalVisible} footer="" onCancel={close}>
        {Object.values(SUPPORT_WALLETS).map(wallet => (
          <WalletItem
            wallet={wallet}
            key={wallet.name}
            onClick={(key: SupportWalletNames) => {
              setWallet(SUPPORT_WALLETS[key])
              close()
            }}
          />
        ))}
      </WalletSelectionModal>
    </SolanaWeb3Context.Provider>
  )
}

export function useSolanaWeb3() {
  return useContext(SolanaWeb3Context)
}
