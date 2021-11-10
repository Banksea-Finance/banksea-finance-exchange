import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'

import App from './App'
import configureStore from './store'
import { Provider } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WalletProvider } from '@/contexts/wallet'
import { ConnectionProvider } from './contexts/connection'

const { store, persistor } = configureStore()

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingOutlined />} persistor={persistor}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <ConnectionProvider>
            <WalletProvider>
              <App />
            </WalletProvider>
          </ConnectionProvider>
        </QueryClientProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
