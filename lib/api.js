import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // sesuaikan dengan URL backend-mu
});

export default API;
