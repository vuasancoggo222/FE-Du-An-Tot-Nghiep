import instance from "./instance";
export const login = (values) =>{
    const url = `signin`
    return instance.post(url,values)
}
export const register = (values) =>{
    const url = `signup`
    return instance.post(url,values)
}

export const httpGetAllUser= () => {
  return instance.get(`users`);
};
export const httpGetOneUser= (id) => {
  return instance.get(`users/${id}`);
};
export const UpdateUser= (id,data,token) => {
  const header = {
    headers: {
      "Authorization": `${token}`,
    },
  };
  return instance.put(`user/edit/${id}`,data,header);
};
export const changeAccountStatus = (phoneNumber, status, token) => {
    const url = `change-account-status?phone=${phoneNumber}&status=${status}`;
    const header = {
      headers: {
        "Authorization": `${token}`,
      },
    };
    return instance.put(url,null,header);
  };

