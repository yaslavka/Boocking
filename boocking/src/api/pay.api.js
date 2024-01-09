import { baseInstance } from './index'

export const payHistory = () => baseInstance.get('/pay-history')
export const pay = (data) => baseInstance.post('/pay', data)
export const withdrawal = (data) => baseInstance.post('/withdrawal', data)
