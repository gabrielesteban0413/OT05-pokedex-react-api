import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 15000,
});

client.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err?.response?.data || err),
);

export default client;
