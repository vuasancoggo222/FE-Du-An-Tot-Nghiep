import { isAuthenticate } from "../utils/LocalStorage";
import instance from "./instance";
const user = isAuthenticate()
let userId = ""

if(!user.id){
  userId = "63392e3fec0fc66e7175e03f"
  // Guess userId when user is not sign in
}
else{
  userId = user.id
}
const httpGetAll = () => {
  return instance.get(`booking`);
};
const httpAddBooking = (data) => {
  return instance.post(`booking?user=${userId}`, data);
};
const httpGetOne = (id) => {
  return instance.get(`booking/${id}`);
};
const httpGetChangeStatus = (id, data) => {
  return instance.patch(`booking/${id}`, data);
};

export const userHistory = (id) =>  {
  const url = `booking-history/${id}`
  return instance.get(url)
}
// const httpPut = (endpoint, id, data) => {
//   return instance.put(`${endpoint}/${id}`, data);
// };

// const httpDelete = (endpoint, id) => {
//   return instance.delete(`${endpoint}/${id}`);
// };

export { httpGetAll, httpAddBooking, httpGetOne, httpGetChangeStatus,
    //  httpPut, httpDelete 
    };
