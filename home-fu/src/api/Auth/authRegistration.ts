import { UserModel } from "../../types/Auth/auth";
import { apiBaseURL } from "..";

const URL_Registration = "auth/register";

export const RegistrationUser = async (data:UserModel) => {
    const response = await apiBaseURL.post(URL_Registration, data);
    return response;
}