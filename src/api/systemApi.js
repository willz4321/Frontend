import axios from "axios";

export const systemApi = axios.create({
    baseURL:"https://localhost:7190/api/"
})

systemApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x_token': localStorage.getItem('x_token'),
    }
    return config;
})
