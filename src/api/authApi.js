import axios from "axios";

export const authApi = axios.create({
     baseURL: "https://localhost:7190/Auth/"
})

authApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x_token': localStorage.getItem('x_token'),
    }
    return config;
})

