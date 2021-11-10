import useLocalStorage from '@/hooks/useLocalStotrage'
import { Account, clusterApiUrl, Connection, Transaction, TransactionInstruction } from '@solana/web3.js'
import React, { useContext, useEffect, useMemo } from 'react'
import notify from '@/utils/notify'
import { ExplorerLink } from '@/components/ExplorerLink'
import { setProgramIds } from '@/utils/ids'
import { WalletAdapter } from './wallet'
import { ENV as ChainID } from '@solana/spl-token-registry'

export type Network =
  | 'mainnet-beta'
  | 'testnet'
  | 'devnet'
  | 'localnet';

interface ConnectionConfig {
  connection: Connection;
  sendConnection: Connection;
  endpointUrl: string;
  slippage: number;
  setSlippage: (_val: number) => void;
  network: Network;
  setEndpoint: (_val: string) => void;
}

export type Endpoint = {
  name: Network
  endpointUrl: string
  chainID: ChainID,
}

// eslint-disable-next-line no-unused-vars
export const ENDPOINTS: { [key in Network]: Endpoint } = {
  'mainnet-beta': {
    name: 'mainnet-beta' as Network,
    endpointUrl: 'https://solana-api.projectserum.com/',
    chainID: ChainID.MainnetBeta
  },
  'testnet': {
    name: 'testnet' as Network,
    endpointUrl: clusterApiUrl('testnet'),
    chainID: ChainID.Testnet
  },
  'devnet': {
    name: 'devnet' as Network,
    endpointUrl: clusterApiUrl('devnet'),
    chainID: ChainID.Devnet
  },
  'localnet': {
    name: 'localnet' as Network,
    endpointUrl: 'http://127.0.0.1:8899',
    chainID: ChainID.Devnet
  }
}

const DEFAULT_NETWORK: Network = 'devnet'

const DEFAULT_ENDPOINT = ENDPOINTS[DEFAULT_NETWORK]
const DEFAULT_SLIPPAGE = 1

const ConnectionContext = React.createContext<ConnectionConfig>({
  endpointUrl: DEFAULT_ENDPOINT.endpointUrl,
  setEndpoint: () => {
  },
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (_val: number) => {
  },
  connection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'recent'),
  sendConnection: new Connection(DEFAULT_ENDPOINT.endpointUrl, 'recent'),
  network: DEFAULT_NETWORK
})

export function ConnectionProvider({ children = undefined as any }) {
  const [endpoint, setEndpoint] = useLocalStorage(
    'connectionEndpts',
    DEFAULT_ENDPOINT.endpointUrl
  )

  const [slippage, setSlippage] = useLocalStorage(
    'slippage',
    DEFAULT_SLIPPAGE.toString()
  )

  const connection = useMemo(() => new Connection(endpoint, 'recent'), [
    endpoint
  ])
  const sendConnection = useMemo(() => new Connection(endpoint, 'recent'), [
    endpoint
  ])

  const chain = ENDPOINTS[endpoint as Network] ?? DEFAULT_ENDPOINT
  const env = chain.name

  setProgramIds(env)

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    const id = connection.onAccountChange(new Account().publicKey, () => {
    })
    return () => {
      connection.removeAccountChangeListener(id)
    }
  }, [connection])

  useEffect(() => {
    const id = connection.onSlotChange(() => null)
    return () => {
      connection.removeSlotChangeListener(id)
    }
  }, [connection])

  useEffect(() => {
    const id = sendConnection.onAccountChange(
      new Account().publicKey,
      () => {
      }
    )
    return () => {
      sendConnection.removeAccountChangeListener(id)
    }
  }, [sendConnection])

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null)
    return () => {
      sendConnection.removeSlotChangeListener(id)
    }
  }, [sendConnection])

  return (
    <ConnectionContext.Provider
      value={{
        endpointUrl: endpoint,
        setEndpoint,
        slippage: parseFloat(slippage),
        setSlippage: val => setSlippage(val.toString()),
        connection,
        sendConnection,
        network: env
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnection() {
  return useContext(ConnectionContext).connection as Connection
}

export function useSendConnection() {
  return useContext(ConnectionContext)?.sendConnection
}

export function useConnectionConfig() {
  const context = useContext(ConnectionContext)
  return {
    endpoint: context.endpointUrl,
    setEndpoint: context.setEndpoint,
    env: context.network
  }
}

export function useSlippageConfig() {
  const { slippage, setSlippage } = useContext(ConnectionContext)
  return { slippage, setSlippage }
}

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  // wait for all confirmation before getting transaction
  await connection.confirmTransaction(txid, 'max')

  const tx = await connection.getParsedConfirmedTransaction(txid)

  const errors: string[] = []
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach(log => {
      const regex = /Error: (.*)/gm
      let m
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }

        if (m.length > 1) {
          errors.push(m[1])
        }
      }
    })
  }

  return errors
}

export const sendTransaction = async (
  connection: Connection,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  signers: Account[],
  awaitConfirmation = true
) => {
  if (!wallet?.publicKey) {
    throw new Error('Wallet is not connected')
  }

  let transaction = new Transaction()
  instructions.forEach(instruction => transaction.add(instruction))
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash
  transaction.setSigners(
    // fee paid by the wallet owner
    wallet.publicKey,
    ...signers.map(s => s.publicKey)
  )
  if (signers.length > 0) {
    transaction.partialSign(...signers)
  }
  transaction = await wallet.signTransaction(transaction)
  const rawTransaction = transaction.serialize()
  const options = {
    skipPreflight: true,
    commitment: 'singleGossip'
  }

  const txid = await connection.sendRawTransaction(rawTransaction, options)

  if (awaitConfirmation) {
    const status = (
      await connection.confirmTransaction(
        txid,
        options && (options.commitment as any)
      )
    ).value

    if (status?.err) {
      const errors = await getErrorForTransaction(connection, txid)
      notify({
        message: 'Transaction failed...',
        description: (
          <>
            {errors.map((err, index) => (
              <div key={index}>{err}</div>
            ))}
            <ExplorerLink address={txid} type={'transaction'} />
          </>
        ),
        type: 'error'
      })

      throw new Error(
        `Raw transaction ${txid} failed (${JSON.stringify(status)})`
      )
    }
  }

  return txid
}
