import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createPost = async (newPost) => {
  const res = await axios.post(BASE_URL, newPost);
  return res.data;
};

export const updatePost = async ({ id, updatedPost }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedPost);
  return res.data;
};

export const patchPost = async ({ id, title }) => {
  const res = await axios.patch(`${BASE_URL}/${id}`, { title });
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
