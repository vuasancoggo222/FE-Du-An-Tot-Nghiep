import instance from "./instance";
export const login = (values) =>{
    const url = `signin`
    return instance.post(url,values)
}
export const register = (values) =>{
    const url = `signup`
    return instance.post(url,values)
}