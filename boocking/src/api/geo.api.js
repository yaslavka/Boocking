import {baseInstance} from "./index";

export const geoInfo = () => baseInstance.get('/cities')