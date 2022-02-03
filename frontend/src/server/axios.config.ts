import axios from 'axios';
import { getToken, removeToken } from 'utils/tokenUtils';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  // headers: {
  //   Accept: 'application/json',
  //   //crossDomain: true,
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //   'Content-Type': 'application/json',
  // },
  headers: {
    Accept: 'application/json',
    'X-API-Key': 'RgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6',
    'Device-Id': '1',
    // crossDomain: true,
  },
  validateStatus: (status): boolean => {
    if (status === 401) {
      removeToken();
      delete axios.defaults.headers.common['Authorization-Token'];
      //window.location.pathname = '';
      //window.location.search = '';
      //window.location.reload();
      window.location.href = '/';
    }
    return status >= 200 && status < 300; // default
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization-Token'] = getToken();
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
