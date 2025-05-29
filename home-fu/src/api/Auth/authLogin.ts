import { UserModel } from "../../types/Auth/auth";
import { apiBaseURL } from "..";

const URL_Login = "auth/login";

export const UserLogin = async (data:UserModel) => {
    const response = await apiBaseURL.post(URL_Login, data);
    return response.data;
}
