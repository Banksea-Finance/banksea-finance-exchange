import { combineReducers, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import app from './app'

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    app
  })

  const store = createStore(
    persistReducer(
      {
        storage,
        key: 'banksea-finance-exchange',
        debug: true,
        blacklist: ['']
      },
      reducer
    ),
    initialState
  )

  const persistor = persistStore(store, null /*, () => {
  }*/)

  return {
    store,
    persistor
  }
}

export default configureStore
