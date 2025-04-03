import axios from "axios";
import { UserModel } from "../../types/Auth/auth";

const URL_Login = "https://homefuserver.azurewebsites.net/api/auth/login";

export const UserLogin = async (data:UserModel) => {
    const response = await axios.post(URL_Login, data);
    return response;
}
