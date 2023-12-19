import {baseInstance} from "./index";

export const hotelId = (data) => baseInstance.get(`/hotel_id?id=${data}`)
export const uploadImages = (data) => baseInstance.post('upload_mages_hotel', data, {headers: {
        'Content-Type': 'multipart/form-data',
    },})