import { apiBaseURL } from "..";

const URl_GetFullInfoAboutUser = "users/me";

export const GetFullInfoAboutUser = async (token:string) => {
    const response = await apiBaseURL.get(URl_GetFullInfoAboutUser, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}