import { apiBaseURL } from "../..";

const URL_ALL_Cards_For_Categories = "cards";

export const AllCardsForCategories = async () => {
    const response = await apiBaseURL.get(URL_ALL_Cards_For_Categories);
    return response.data;
}