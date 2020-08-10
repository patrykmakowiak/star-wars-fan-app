import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1,
  headers: {
    "Content-type": "application/json"
  },
  method: "GET"
});

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
    return Promise.reject(error);
  }
);
