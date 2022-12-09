import instance from "./instance";

export const ListVouchers = () => {
  return instance.get(`/vouchers`);
};

export const OneVoucher = (id) => {
  return instance.get(`vouchers/${id}`);
};

export const DeleteVoucher = (id) => {
  return instance.delete(`/voucher/delete/${id}`);
};
