import axios from 'axios';

import { FilterQuery, ModelType } from '../types';

const API = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or 'access_token' or whatever key you use
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
