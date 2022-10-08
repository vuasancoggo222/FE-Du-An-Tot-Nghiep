import instance from "./instance";

export const httpAddContact = (data) => {
    return instance.post(`contact`, data);
}

