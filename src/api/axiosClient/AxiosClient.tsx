// api/axiosClient.js
import axios from 'axios';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const AxiosClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
AxiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});
AxiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        return error;
    },
);
export default AxiosClient;
