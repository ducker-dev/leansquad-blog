export const getPosts = posts => ({
  type: "GET_POSTS",
  payload: posts
});

export const getPost = post => ({
  type: "GET_POST",
  payload: post
});