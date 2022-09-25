import instance from "./instance";

const httpPost = (endpoint, data) => {
  return instance.post(`${endpoint}`, data);
};
const httpPut = (endpoint, id, data) => {
  return instance.put(`${endpoint}/${id}`, data);
};

const httpDelete = (endpoint, id) => {
  return instance.delete(`${endpoint}/${id}`);
};

export { httpPost, httpPut, httpDelete };
