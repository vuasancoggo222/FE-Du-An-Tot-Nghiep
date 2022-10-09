import instance from "./instance";
export const login = (values) =>{
    const url = `signin`
    return instance.post(url,values)
}
export const register = (values) =>{
    const url = `signup`
    return instance.post(url,values)
}
export const changeAccountStatus = (phoneNumber, status, token) => {
    const url = `change-account-status?phone=${phoneNumber}&status=${status}`;
    const header = {
      headers: {
        "Authorization": `${token}`,
      },
    };
    return instance.put(url,null,header);
  };