import { baseInstance } from './index'

export const reservation = () => baseInstance.get('/reservation')
export const reservationManager = () => baseInstance.get('/reservation_manager')
export const reservationInfo = (data) =>
  baseInstance.post('/reservation_info', data)
export const reservationId = (id) =>
  baseInstance.get(`/reservation_id?id=${id}`)
export const reservationBook = (book) =>
  baseInstance.post('/reservation_book', book)
export const reservationCancel = (id) =>
  baseInstance.post('/reservation_cancel', id)
