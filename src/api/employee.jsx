import instance from "./instance";

const httpGetOne = (id) => {
    return instance.get(`employees/${id}`);
};
const httpAddShift = (id, data) => {
    return instance.patch(`employees/new-employee-shift/${id}`, data);
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
    httpGetOne,httpAddShift
    // , httpPost, httpPut, httpDelete 
};
