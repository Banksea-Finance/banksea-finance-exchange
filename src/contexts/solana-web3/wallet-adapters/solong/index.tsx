import EventEmitter from 'eventemitter3'
import { PublicKey, Transaction } from '@solana/web3.js'
import { WalletAdapter } from '@/contexts/solana-web3'
import notify from '@/utils/notify'

export class SolongWalletAdapter extends EventEmitter implements WalletAdapter {
  _publicKey?: PublicKey;
  _onProcess: boolean;

  constructor() {
    super()
    this._publicKey = undefined
    this._onProcess = false
    this.connect = this.connect.bind(this)
  }

  get publicKey() {
    return this._publicKey
  }

  async signTransaction(transaction: Transaction) {
    return (window as any).solong.signTransaction(transaction)
  }

  connect() {
    if (this._onProcess) {
      return
    }

    if ((window as any).solong === undefined) {
      notify({
        message: 'Solong Error',
        description: 'Please install solong wallet from Chrome ',
      })
      return
    }

    this._onProcess = true;
    (window as any).solong
      .selectAccount()
      .then((account: any) => {
        this._publicKey = new PublicKey(account)
        this.emit('connect', this._publicKey)
      })
      .catch(() => {
        this.disconnect()
      })
      .finally(() => {
        this._onProcess = false
      })
  }

  disconnect() {
    if (this._publicKey) {
      this._publicKey = undefined
      this.emit('disconnect')
    }
  }
}
