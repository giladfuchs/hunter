import axios from 'axios';

import { ModelType } from '../types';

export const API = axios.create({
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

export const fetch_or_delete_rows = async (model: ModelType): Promise<any[]> => {
    const response = await API.post(`/${model}`);
    return response.data;
};
