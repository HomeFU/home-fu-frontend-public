import { apiBaseURL } from "../..";

const URL_ALL_Categories_For_Admin = "categories";

export const AllCategoriesForAdmin = async () => {
    const response = await apiBaseURL.get(URL_ALL_Categories_For_Admin);
    return response.data;
}