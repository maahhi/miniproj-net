import axios from 'axios'
import router from './router'

const API_URL = process.env.API_URL || 'http://localhost:8080/';

function parseError (messages) {
  // error
  if (messages) {
    return Promise.reject(messages)
  } else {
    return Promise.reject({ message: ['no error message'] })
  }
}

let axios_instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios_instance.interceptors.request.use(
(config) => {
  config.headers.authorization = 'Bearer ' + window.sessionStorage.jwt;
  return config;
},
error => Promise.reject(error)
);

axios_instance.interceptors.response.use(
(response) => {
  return response
},
error => {
  if (error.response) {
    if (error.response.status === 401 && error.config.url !== API_URL + "login") {
      router.replace({ name: 'login' })
    }
    else
    {
      return parseError(error.response.data)
    }
  } else {
    return Promise.reject(error)
  }
}
);

export default axios_instance