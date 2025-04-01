// @ts-ignore
import config from "@/config";


import axios from 'axios';
import {useCustomizerStore} from "@/common/stores/customizer";

const axiosServices = axios.create({
    baseURL: config.apiUrl,
    withCredentials: false,
    headers: {
        'content-Type': 'application/json',
        'Access-Control-Expose-Headers': 'Access-Token',
    }
})
axiosServices.interceptors.request.use(
    (config) => {
        const customizer = useCustomizerStore();
        customizer.error_message = ''

        customizer.loading = true

        const token = localStorage.getItem('token');
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);


// interceptor for http
axiosServices.interceptors.response.use(
    (response) => {
        const customizer = useCustomizerStore();
        customizer.loading = false

        return response
    },
    (error) => {
        console.log('error', error.response)
        const customizer = useCustomizerStore();
        customizer.loading = false



        return Promise.reject((error.response && error.response.data) || 'Wrong Services')
    }
);

export default axiosServices;
