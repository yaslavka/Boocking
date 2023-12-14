import {baseInstance} from "./index";

export const hotelId = (data) => baseInstance.get(`/hotel_id?id=${data}`)