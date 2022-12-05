import ApiInstance from "../ApiInstance";

export const postLogin = (email, password) => {
  return ApiInstance.post("/api/user/login", { email, password });
};
export const postRegister = (email, username, password, is_expert) => {
  return ApiInstance.post("api/user/register", {
    email,
    username,
    password,
    is_expert,
  });
};

export const postEmail = (email) => {
  return ApiInstance.post("/api/user/forget_password", { email });
};

export const postNewPassword = (code, new_password, confirm_new_password) => {
  return ApiInstance.post("/api/user/reset_password", {
    code,
    new_password,
    confirm_new_password,
  });
};

export const postCreatePost = (
  title,
  body,
  category,
  image,
  authenticationToken
) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/create-post", {
    title,
    body,
    category,
    image,
  });
};
export const postDeletePost = (slug, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/delete/" + slug);
};
export const getPosts = (authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.get("api/post/list-posts");
};
export const postCreateComment = (body, slug, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/create-comment/" + slug + "/", { body });
};
export const getComments = (slug, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.get("api/post/fetch-comments/" + slug + "/");
};
export const postUpvoteComment = (slug, comment_id, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/upvote-comment/" + slug + "/" + comment_id);
};
export const postDownvoteComment = (slug, comment_id, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post(
    "api/post/downvote-comment/" + slug + "/" + comment_id
  );
};
export const postDeleteComment = (slug, comment_id, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/delete-comment/" + slug + "/" + comment_id);
};

export const postUpvotePost = (slug, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/upvote-post/" + slug + "/");
};
export const postDownvotePost = (slug, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/post/downvote-post/" + slug + "/");
};
export const sendMessage = (receiver, message, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/chat/send/message", { receiver, message });
};

export const fetchMessage = (receiver, authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.post("api/chat/fetch/message", { receiver });
};

export const fetchUsersForChat = (authenticationToken) => {
  ApiInstance.setHeader("Authorization", authenticationToken);
  return ApiInstance.get("api/chat/fetch/users");
};
