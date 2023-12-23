import {baseInstance} from './index';

export const myObject = () => baseInstance.get('/object');
export const myObjectAdd = () => baseInstance.post('/object_add');
