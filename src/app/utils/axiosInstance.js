import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://192.168.1.66:30080/",
    baseURL: "https://localhost:7189/",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirect to login.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;