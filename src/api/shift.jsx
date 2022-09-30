import instance from "./instance";

const httpGetAllShift = () => {
  return instance.get(`shift`);
};
const httpGetOne = (id) => {
  return instance.get(`shift/${id}`);
};
// const httpPost = (endpoint, data) => {
//   return instance.post(`${endpoint}`, data);
// }; 
// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };

export {
  httpGetAllShift,httpGetOne
  // , httpPost, httpPut, httpDelete 
};
