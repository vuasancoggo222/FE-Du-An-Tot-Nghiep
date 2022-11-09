import axios from "axios";

export const uploadCloudinary = (data) => {
  const url = `https://api.cloudinary.com/v1_1/trung9901/image/upload`;
  const method = "POST";
  const header = {
    "Content-Type": "application/x-www-formendcoded",
  };

  return axios.post(url, method, data, header);
};
