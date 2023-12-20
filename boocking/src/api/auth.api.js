import {baseInstance} from './index';

export const inviter = (credentials) =>{
  return baseInstance.post('/inviter', credentials);
};

export const signIn = (credentials) =>{
  return baseInstance.post('/login', credentials);
};
export const signUp = (credentials) =>{
  return baseInstance.post('/register', credentials);
};
