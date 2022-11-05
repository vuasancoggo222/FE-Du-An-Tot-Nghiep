import instance from "./instance";
export const getListNotification = () => {
  return instance.get(`/notification`);
};
