import {baseInstance} from './index';

export const hotelId = (data) => baseInstance.get(`/hotel_id?id=${data}`);
export const hotelEdit = (data) => baseInstance.post('/hotel_edit', data);
export const hotelAdd = (data) => baseInstance.post('/hotel_add', data);
export const uploadImages = (data) => baseInstance.post('/upload_mages_hotel', data, {headers: {
  'Content-Type': 'multipart/form-data',
}});
export const uploadAlbumImages = (data) => baseInstance.post('/upload_album_hotel', data, {headers: {
  'Content-Type': 'multipart/form-data',
}});
