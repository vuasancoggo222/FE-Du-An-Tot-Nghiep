import instance from "./instance";
export const feedbackAdd = (token, data) => {
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };
  return instance.post("/feedback/service", data, header);
};
