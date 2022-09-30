import instance from "./instance";
const httpGetAll = () => {
  return instance.get(`booking`);
};
const httpAddBooking = (data) => {
  return instance.post(`booking`, data);
};
const httpGetOne = (id) => {
  return instance.get(`booking/${id}`);
};
const httpGetChangeStatus = (id, data) => {
  return instance.patch(`booking/${id}`, data);
};
// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };

export { httpGetAll, httpAddBooking, httpGetOne, httpGetChangeStatus
    //  httpPut, httpDelete 
    };
