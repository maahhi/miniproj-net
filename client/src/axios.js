import axios from 'axios'
import router from './router'

const API_URL = process.env.API_URL || 'http://localhost:8080/'

let axios_instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
});

axios_instance.interceptors.response.use(
(response) => {
  return response
},
error => {
  if (error.response.status === 401) {
    router.push({ name: 'login' })
  }
}
);

export default axios_instance