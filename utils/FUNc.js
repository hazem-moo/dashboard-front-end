import axios from "axios";
const url = process.env.STRAPI_URL;
const api_token = process.env.API_TOCKEN;

export const axiosClient = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${api_token}`,
    "Content-Type": "application/json",
  },
});

export const getHeader = async () => {
  try {
    const res = await axiosClient.get(`/headers`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (apiData) => {
  try {
    const req = await axiosClient.post("/orders", apiData);
    return req.data.data;
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
