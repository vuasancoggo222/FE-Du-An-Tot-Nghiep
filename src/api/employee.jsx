import instance from "./instance";

export const getEmployeeByDate = (date, id) => {
    return instance.get(`/employee/get-employee-by-date?date=${date}&employee=${id}`)
}
export const httpAddShift = (id, data) => {
    return instance.patch(`employees/new-employee-shift/${id}`, data);
};

export const httpUpdateEmployee = (id, data) => {
    return instance.patch(`employees/${id}`, data);
};
export const httpGetOne = (id) => {
    return instance.get(`employees/${id}`);
}; 

export const httpGetEmployees = () => {
    return instance.get(`employees`);
}; 
export const httpAddEmployees = (data) => {
    return instance.post(`employees`, data);
};
export const httpUpdateEmployees = (id, data) => {
    return instance.put(`employees/${id}`, data);
};

export const httpChangeStatusTimeWork= (id, date, shift, data) => {
    return instance.patch(`employees/update-employee-shift/${id}?date=${date}&shift=${shift}`, data);
};