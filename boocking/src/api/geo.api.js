import {baseInstance} from "./index";

export const geoInfo = () => baseInstance.get('/cities')
export const allCitiesInfo = () => baseInstance.get('/all_cities')