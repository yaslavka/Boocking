import {baseInstance} from "./index";

export const numberInfo = (id) => baseInstance.get(`/number_id?id=${id}`)

