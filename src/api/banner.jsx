import instance from "./instance";

export const httpAddBanner = (data) => {
  return instance.post(`/banners`, data);
};

export const httpListBanner = () => {
  return instance.get(`/banners`);
};

export const httpDeleteBanner = (id) => {
  return instance.delete(`/banners/${id}`);
};

export const httpGetOne = (id) => {
  return instance.get(`banners/${id}`);
};

export const httpUpdateBanner = (id, data) => {
  return instance.patch(`banners/${id}`, data);
};
