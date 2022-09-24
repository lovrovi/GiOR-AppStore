import axios from 'axios';
// import { store } from "./index";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// instance.interceptors.request.use(
//   function (config) {
//     const token = store.getState().auth.token;
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default instance;
