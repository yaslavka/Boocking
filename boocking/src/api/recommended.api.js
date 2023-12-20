import {baseInstance} from './index';

export const recommendedInfo = () => baseInstance.get('/recommended');
export const actionsInfo = () => baseInstance.get('/actions');
