import { create } from 'apisauce';

export default create({
  baseURL: 'http://3.75.133.58:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
