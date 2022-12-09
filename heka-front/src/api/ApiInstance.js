import { create } from 'apisauce';

export default create({
  baseURL: 'http://3.72.25.175:8080/',
  headers: {
    Authorization: 'foo',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
