import axios from "axios";
import { UserModel } from "../../types/Auth/auth";

const URL_Login = "https://homefuserverback.azurewebsites.net/api/auth/login";

export const UserLogin = async (data:UserModel) => {
    const response = await axios.post(URL_Login, data);
    return response.data;
}
