import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8083', // Spring Boot uygulamanızın çalıştığı URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
