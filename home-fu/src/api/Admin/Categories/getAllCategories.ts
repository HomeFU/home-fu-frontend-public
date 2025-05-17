import axios from "axios";

const URL_ALL_Categories_For_Admin = "https://homefuserverback.azurewebsites.net/api/categories";

export const AllCategoriesForAdmin = async () => {
    const response = await axios.get(URL_ALL_Categories_For_Admin);
    return response.data;
}