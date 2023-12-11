import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
import configureStore from "./config/store";
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from "react-router-dom";


export const store = configureStore()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
       <Provider store={store.store}>
           <PersistGate loading={null} persistor={store.persistor}>
               <React.StrictMode>
                   <App />
                   <ToastContainer />
               </React.StrictMode>
           </PersistGate>
       </Provider>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
