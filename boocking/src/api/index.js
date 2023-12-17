import axios from 'axios';
import Raven from 'raven-js';
import {io} from 'socket.io-client';
import {getAccessToken} from "../utils";
import {store} from "../index";
import * as actions from '../actions/auth.actions'

export const baseInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

baseInstance.interceptors.request.use(
    async config => {
        const token = await getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Raven.captureException(error);
        return Promise.reject(error);
    },
);
baseInstance.interceptors.response.use(
    (response) => response?.data,
    (error) => {
        Raven.captureException(error)
        if (error?.response?.status === 401) {
            const timer = localStorage.getItem('w')
            localStorage.clear()
            localStorage.setItem('w', timer)
            store.store.dispatch(actions.signOut())
        } else if (error?.response) {
            // Global path to error message
            throw new Error(error?.response?.data?.message)
        } else {
            throw new Error(error?.message)
        }
    },
)
export const socket = io.connect(process.env.REACT_APP_SOCKET_BASE_URL);