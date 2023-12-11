import {baseInstance} from "./index";

export const userInfo = () => baseInstance.get('/user')
export const reservationInfo = (data) => baseInstance.post('/user', data)
