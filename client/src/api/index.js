// client/src/api/index.js

import axios from 'axios';

// Create a configured instance of Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Using the environment variable
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;