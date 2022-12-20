import instance from "./instance";
import { isAuthenticate } from "../utils/LocalStorage";

const user = isAuthenticate()
let header = {}
if(user){
header = {
  headers: {
    Authorization: `${user.token}`,
  },
}
}

const httpGetAll = () => {
  return instance.get(`booking`,header);
};

const bookingGenderStatistics = () => {
  const url = `booking-gender-statistics`
  return instance.get(url,header);
};
const httpAddBooking = (token, data,userId) => {
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.post(`booking?user=${userId}`, data, header);
};
const bookingAddByEmployeeApi = (data) => {
  return instance.post(`bookingAddByEmployee`, data,header); 
};
const httpGetOne = (id) => {
  return instance.get(`booking/${id}`,header);
};
const httpGetChangeStatus = (id, data) => {
  return instance.patch(`booking/${id}`, data,header);
};

export const userHistory = (id) => {
  const url = `booking-history/${id}`
  return instance.get(url,header)
}
// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };
export const bookingForEmployee = () => {
  return instance.get(`/booking-employee-list/${user.employeeId}`,header)
}
export {
  httpGetAll, httpAddBooking, httpGetOne, httpGetChangeStatus, bookingGenderStatistics, bookingAddByEmployeeApi
  //  httpPut, httpDelete 
};
