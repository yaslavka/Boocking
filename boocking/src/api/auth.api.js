import {baseInstance} from "./index";

export const signIn = (credentials) =>{
   return  baseInstance.post('/login', credentials)
}
