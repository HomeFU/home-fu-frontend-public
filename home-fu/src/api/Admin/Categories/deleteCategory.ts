import axios from "axios";

const URL_Delete_Category = "https://homefuserverback.azurewebsites.net/api/categories/";

export const DeleteCategoryForAdmin = async (id: number) => {
    await axios.delete(URL_Delete_Category + `${id}`);
}