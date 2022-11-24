import instance from "./instance";

export const getEmployeeByDate = (date, id) => {
  return instance.get(
    `/employee/get-employee-by-date?date=${date}&employee=${id}`
  );
};
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

export const httpChangeStatusTimeWork = (id, date, shift, data) => {
  return instance.patch(
    `employees/update-employee-shift/${id}?date=${date}&shift=${shift}`,
    data
  );
};

export const removeEmployees = (id, data) => {
  const url = `employees/${id}`;
  return instance.delete(url, data);
};

export const employeeOrderStatistics = (month, year) => {
  console.log(month, year);
  let url
  if(month == undefined && year == undefined) {
    url = `employee/order-statistics`
  }
  else if(month != undefined && year != undefined) {
    url = `employee/order-statistics?month=${month}&year=${year}`;
  }else if(month == undefined){
    url = `employee/order-statistics?year=${year}`;
  }
  return instance.get(url);
}

export const employeeStatistics = (id, month, year) => {
  console.log(month, year);
  let url
  if(month == undefined && year == undefined) {
    url = `statistics-for-employee/${id}`
  }
  else if(month != undefined && year != undefined) {
    url = `statistics-for-employee/${id}?month=${month}&year=${year}`;
  }else if(month == undefined){
    url = `statistics-for-employee/${id}?year=${year}`;
  }
  return instance.get(url);
}