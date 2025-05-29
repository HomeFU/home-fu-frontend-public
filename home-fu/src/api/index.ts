import axios from "axios";

export const apiBaseURL = axios.create({
    baseURL: 'https://homefuserverback.azurewebsites.net/api/',
});

apiBaseURL.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message;
        if(error?.response?.status === 401 && message?.toLowerCase().includes("token")) {
            alert('Сессия истекла. Пожалуйста, войдите снова.');
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
)