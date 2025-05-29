import axios from "axios";
import { logout } from "../redux/Auth/authSlice";
import { store } from "../redux/store";

export const apiBaseURL = axios.create({
    baseURL: 'https://homefuserverback.azurewebsites.net/api/',
});

let hasRedirected = false;

apiBaseURL.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        
        console.log("Axios interceptor error:", error?.response);

        if ( status === 401 && !hasRedirected && window.location.pathname !== "/") {
            console.log("status === 401")
            hasRedirected = true;
            localStorage.removeItem("token");
            store.dispatch(logout());
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);
