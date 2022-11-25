import instance from "./instance";
export const login = (values) => {
  const url = `signin`;
  return instance.post(url, values);
};
export const register = (values) => {
  const url = `signup`;
  return instance.post(url, values);
};

export const httpGetAllUser = () => {
  return instance.get(`users`);
};
export const getProfile = (token) => {
  const url = `/user/my-profile`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.get(url, header);
};
export const updateProfile = (token, data) => {
  const url = `/user/my-profile/edit`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.put(url, data, header);
};
export const changeAccountStatus = (phoneNumber, status, token) => {
  const url = `change-account-status?phone=${phoneNumber}&status=${status}`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.put(url, null, header);
};
export const httpGetOneUser = (token, id) => {
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.get(`user/${id}`, header);
};
export const httpUpdateOneUser = (token, id, data) => {
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.put(`user/edit/${id}`, data, header);
};

export const userAccountStatistics = () => {
  const url = `/users/acccount-status-statistics`;
  return instance.get(url);
};
export const updatePass = (token, data) => {
  const url = `/update-password`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.put(url, data, header);
};
