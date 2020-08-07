import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
  headers: {
    "Content-type": "application/json"
  },
  // default method
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
