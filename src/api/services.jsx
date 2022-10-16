import instance from "./instance";
const httpGetOneService = (id) => {
  return instance.get(`service/${id}`);
};

const getSerViceBySlug = (slug) => {
  return instance.get(`service-slug/${slug}`);
};

const httpGetAllService = () => {
  return instance.get(`service`);
};
const httpGet = (endpoint, id) => {
  return instance.get(`${endpoint}/${id}`);
};
const httpPost = (endpoint, data) => {
  return instance.post(`${endpoint}`, data);
};
const httpPut = (endpoint, id, data) => {
  return instance.patch(`${endpoint}/${id}`, data);
};

const httpDelete = (endpoint, id) => {
  return instance.delete(`${endpoint}/${id}`);
};

export {
  httpGetOneService,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  httpGetAllService,
  getSerViceBySlug,
};
