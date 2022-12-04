import ApiInstance from '../ApiInstance';

export const postLogin = (email, password) => {
  return ApiInstance.post('/api/user/login', { email, password });
};
export const postRegister = (email, username, password, isExpert) => {
  return ApiInstance.post('api/user/register', {
    email,
    username,
    password,
    isExpert,
  });
};
export const postCreatePost = (title, body, authenticationToken) => {
  ApiInstance.setHeader('Authorization', authenticationToken);
  return ApiInstance.post('api/post/create-post', { title, body });
};
export const postDeletePost = (slug, authenticationToken) => {
  ApiInstance.setHeader('Authorization', authenticationToken);
  return ApiInstance.post('api/post/delete/' + slug);
};
export const getPosts = (authenticationToken) => {
  ApiInstance.setHeader('Authorization', authenticationToken);
  return ApiInstance.get('api/post/list-posts');
};
export const postCreateComment = (body, slug, authenticationToken) => {
  ApiInstance.setHeader('Authorization', authenticationToken);
  return ApiInstance.post('api/post/create-comment/' + slug + '/', { body });
};
export const getComments = (slug, authenticationToken) => {
  ApiInstance.setHeader('Authorization', authenticationToken);
  return ApiInstance.get('api/post/fetch-comments/' + slug + '/');
};
