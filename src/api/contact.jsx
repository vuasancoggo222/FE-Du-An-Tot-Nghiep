import instance from "./instance";

export const httpAddContact = (data) => {
    return instance.post(`contact`, data);
}

export const httpListContact = () => {
    return instance.post(`contact`);
}
