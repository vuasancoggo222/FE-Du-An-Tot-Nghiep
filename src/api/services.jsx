import instance from "./instance";
const httpGetOneService = (id) => {
  return instance.get(`service/${id}`);
};
const httpGetAllService= () => {
  return instance.get(`service`);
};
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

export {httpGetOneService, httpGet, httpPost, httpPut, httpDelete,httpGetAllService };
