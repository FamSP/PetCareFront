import api from "./api";
const API_URL = import.meta.env.VITE_POSTS_URL;

const createPost = async (post) => {
  return await api.post(API_URL, post);
};
const getAllPost = async () => {
  return await api.get(API_URL);
};

const getById = async (id) => {
  return await api.get(API_URL + "/" + id);
};
const updatePost = async (id, post) => {
  return await api.put(`${API_URL}/${id}`, post);
};
const deletePost = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};
const getByAuthorId = async (id) => {
  return await api.get(`${API_URL}/author/${id}`);
};

const PostService = {
  createPost,
  getAllPost,
  getById,
  updatePost,
  deletePost,
  getByAuthorId,
};

export default PostService;
