import { WalletAdapter } from '@/contexts/wallet'
import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import notify from '@/utils/notify'

type PhantomEvent = 'disconnect' | 'connect'
type PhantomRequestMethod = 'connect' | 'disconnect' | 'signTransaction' | 'signAllTransactions'

interface PhantomProvider {
  publicKey?: PublicKey
  isConnected?: boolean
  autoApprove?: boolean
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, handler: (args: any) => void) => void
  request: (method: PhantomRequestMethod, params: any) => Promise<any>
  listeners: (event: PhantomEvent) => (() => void)[]
}

export class PhantomWalletAdapter extends EventEmitter implements WalletAdapter {

  constructor() {
    super()
    this.connect = this.connect.bind(this)
  }

  private static get _provider(): PhantomProvider | undefined {
    if ((window as any)?.solana?.isPhantom) {
      return (window as any).solana
    }
    return undefined
  }

  private _handleConnect = (...args: any) => {
    this.emit('connect', ...args)
  }

  private _handleDisconnect = (...args: any) => {
    this.emit('disconnect', ...args)
  }

  get connected() {
    return PhantomWalletAdapter._provider?.isConnected || false
  }

  get autoApprove() {
    return PhantomWalletAdapter._provider?.autoApprove || false
  }

  // eslint-disable-next-line
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!PhantomWalletAdapter._provider) {
      return transactions
    }

    return PhantomWalletAdapter._provider.signAllTransactions(transactions)
  }

  get publicKey() {
    return PhantomWalletAdapter._provider?.publicKey ?? PublicKey.default
  }

  // eslint-disable-next-line
  async signTransaction(transaction: Transaction) {
    if (!PhantomWalletAdapter._provider) {
      return transaction
    }

    return PhantomWalletAdapter._provider.signTransaction(transaction)
  }

  connect() {
    if (!PhantomWalletAdapter._provider) {
      return
    }

    if (!((window as any).solana.isPhantom)) {

      notify({
        message: 'Phantom Error',
        description: 'Please install Phantom wallet from Chrome ',
      })
      return
    }


    if (PhantomWalletAdapter._provider && !PhantomWalletAdapter._provider.listeners('connect').length) {
      PhantomWalletAdapter._provider?.on('connect', this._handleConnect)
    }
    if (!PhantomWalletAdapter._provider.listeners('disconnect').length) {
      PhantomWalletAdapter._provider?.on('disconnect', this._handleDisconnect)
    }
    return PhantomWalletAdapter._provider?.connect()
  }

  disconnect() {
    if (PhantomWalletAdapter._provider) {
      PhantomWalletAdapter._provider.disconnect()
    }
  }
}
