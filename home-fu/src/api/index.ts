import axios from "axios";

export const apiBaseURL = axios.create({
    baseURL: 'https://homefuserverback.azurewebsites.net/api/',
});

apiBaseURL.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        // const message = error?.response?.data?.message;
        console.log("Axios interceptor error:", error?.response); // добавь это для отладки

        if (status === 401) {
            alert('Сессия истекла. Пожалуйста, войдите снова.');
            localStorage.removeItem('token');
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);
