import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from '../../sagas'
import rootReducer from '../../redux'

const persistConfig = {
  key: 'root',
  storage,
}

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer(history))
const middleware = [sagaMiddleware, routerMiddleware(history)]

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware)),
  )
  const persist = persistStore(store)
  sagaMiddleware.run(rootSaga)
  return { store, persist }
}
