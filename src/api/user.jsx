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
export const updateProfile = (token,data) => {
  const url = `/user/my-profile/edit`;
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.put(url,data,header);
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
