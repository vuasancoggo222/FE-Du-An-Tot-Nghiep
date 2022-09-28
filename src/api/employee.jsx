import instance from "./instance";

export const getEmployeeByDate = (date, id) => {
    return instance.get(`/employee/get-employee-by-date?date=${date}&employee=${id}`)
}
export const httpAddShift = (id, data) => {
    return instance.patch(`employees/new-employee-shift/${id}`, data);
};
export const httpGetOne = (id) => {
    return instance.get(`employees/${id}`);
}; 