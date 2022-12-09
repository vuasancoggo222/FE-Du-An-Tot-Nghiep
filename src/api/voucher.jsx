import instance from "./instance";

export const ListVouchers = () => {
  return instance.get(`/vouchers`);
};

export const OneVoucher = (id) => {
  return instance.get(`vouchers/${id}`);
};
