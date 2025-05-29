import { apiBaseURL } from "..";

const URL_Categories = "categories";

export const Categories = async () => {
    const response = await apiBaseURL.get(URL_Categories);
    return response.data;
}