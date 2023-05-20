import axios from "axios";

const axrengAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXRENG_API_URL,
});

export default axrengAPI;
