import instance from "./instance";

export const updatePost = (id, data) => {
  const url = `blog/${id}`;
  return instance.put(url, data);
};
export const createPost = (data) => {
  const url = `blog/add`;

  return instance.post(url, data);
};
export const removePost = (id, data) => {
  const url = `blog/${id}`;
  return instance.delete(url, data);
};
export const getOnePost = (id) => {
  const url = `blogs/${id}`;
  return instance.get(url);
};
export const getPosts = () => {
  return instance.get("blogs");
};
