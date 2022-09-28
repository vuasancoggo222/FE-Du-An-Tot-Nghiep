import instance from "./instance";

const httpGetAll = () => {
    return instance.get(`shift`);
  };
// const httpGet = (endpoint, id) => {
//   return instance.get(`${endpoint}/${id}`);
// };
// const httpPost = (endpoint, data) => {
//   return instance.post(`${endpoint}`, data);
// }; 
// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };

export { httpGetAll
    // , httpPost, httpPut, httpDelete 
};
