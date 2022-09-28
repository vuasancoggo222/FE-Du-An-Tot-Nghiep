import instance from "./instance";
const httpGetAll = (endpoint) => {
  return instance.get(`${endpoint}`);
};
const httpAddBooking = (data) => {
  return instance.post(`booking`, data);
};

// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };

export { httpGetAll, httpAddBooking,
    //  httpPut, httpDelete 
    };
