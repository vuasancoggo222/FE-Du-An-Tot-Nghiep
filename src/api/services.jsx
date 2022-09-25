import instance from "./instance";
const httpGet = (endpoint, id) => {
  return instance.get(`${endpoint}/${id}`);
};
const httpPost = (endpoint, data) => {
  return instance.post(`${endpoint}`, data);
};
const httpPut = (endpoint, id, data) => {
  return instance.put(`${endpoint}/${id}`, data);
};

const httpDelete = (endpoint, id) => {
  return instance.delete(`${endpoint}/${id}`);
};

export { httpGet, httpPost, httpPut, httpDelete };
