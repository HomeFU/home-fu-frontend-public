import axios from "axios";
import { UserModel } from "../../types/Auth/auth";

const URL_Registration = "https://homefuserver.azurewebsites.net/api/auth/register";

export const RegistrationUser = async (data:UserModel) => {
    const response = await axios.post(URL_Registration, data);
    return response;
}