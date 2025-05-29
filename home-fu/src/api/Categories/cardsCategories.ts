import { apiBaseURL } from "..";

const URL_Categories = "cards/byCategory?categoryIds";

export const CardsCategories = async (id:number) => {
    const response = await apiBaseURL.get(URL_Categories + `=${id}`);
    return response.data;
}