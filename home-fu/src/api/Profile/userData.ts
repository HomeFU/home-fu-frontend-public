import axios from "axios";

const URl_GetFullInfoAboutUser = "https://homefuserverback.azurewebsites.net/api/users/me";

export const GetFullInfoAboutUser = async (token:string) => {
    const response = await axios.get(URl_GetFullInfoAboutUser, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}