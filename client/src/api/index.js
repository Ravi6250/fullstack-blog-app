// client/src/api/index.js

import axios from 'axios';

// Create a configured instance of Axios
const api = axios.create({
    // Set the base URL for all API requests
    baseURL: 'http://localhost:5000/api', // This should match your backend server's address
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