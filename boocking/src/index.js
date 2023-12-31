import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import configureStore from './config/store'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './config/i18n'

export const store = configureStore()
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persist}>
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>,
)
reportWebVitals()
serviceWorker.unregister()
