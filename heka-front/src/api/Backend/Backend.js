import ApiInstance from '../ApiInstance';

export const postLogin = (email, password) => {
  return ApiInstance.post('/api/user/login', { email, password });
};
export const postRegister = (email, name, password) => {
  return ApiInstance.post('api/user/register', { email, name, password });
};
