import instance from "./instance";

export const updateService = (id, data) => {
  const url = `service/${id}`;
  return instance.patch(url, data);
};
export const createService = (data) => {
  const url = `service`;

  return instance.post(url, data);
};
export const removeService = (id, data) => {
  const url = `service/${id}`;
  return instance.delete(url, data);
};
