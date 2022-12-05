import { create } from 'apisauce';

export default create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Authorization: 'foo',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
