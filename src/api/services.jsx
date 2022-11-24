import instance from "./instance";
const httpGetOneService = (id) => {
  return instance.get(`service/${id}`);
};

const getSerViceBySlug = (slug) => {
  return instance.get(`service-slug/${slug}`);
};

const groupAgeByService = () => {
  return instance.get(`age-by-service`);
};

const httpGetAllService = () => {
  return instance.get(`service`);
};

const groupGenderByService = () => {
  return instance.get(`gender-by-service`);
};

const turnoverServicesMonth = (year) => {
  return instance.get(`turnover-month-service?year=${year}`);
};

const servicesStatistic = (month, year) => {
  console.log(month, year);
  let url
  if(month == undefined && year == undefined) {
    url = `service-statistics`
  }
  else if(month != undefined && year != undefined) {
    url = `service-statistics?month=${month}&year=${year}`;
  }else if(month == undefined){
    url = `service-statistics?year=${year}`;
  }
  return instance.get(url);
}
const httpGet = (endpoint, id) => {
  return instance.get(`${endpoint}/${id}`);
};
const httpPost = (endpoint, data,header) => {
  console.log(data);
  return instance.post(`${endpoint}`,data,header);
};
const httpPut = (endpoint, id, data) => {
  return instance.patch(`${endpoint}/${id}`, data);
};

const httpDelete = (endpoint, id) => {
  return instance.delete(`${endpoint}/${id}`);
};

export {
  httpGetOneService,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  httpGetAllService,
  getSerViceBySlug,
  servicesStatistic,
  turnoverServicesMonth,
  groupAgeByService,
  groupGenderByService
};
