import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://todo-app-eo09.onrender.com'
    : 'http://localhost:3000/api',
  timeout: 5000,
});

export default api;
