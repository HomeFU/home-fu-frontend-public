import { apiBaseURL } from "..";

const URL_AddUserPhoto = "users/";

export const AddUserPhoto = async (id:number, token:string, fileImage:File) => {
    const formData = new FormData();

    formData.append("file", fileImage);

    const response = await apiBaseURL.post(`${URL_AddUserPhoto}${id}/photo`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}