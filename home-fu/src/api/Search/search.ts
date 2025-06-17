import { apiBaseURL } from "..";
import { SearchHight } from "../../types/SearchHight/searchHight";

export const Search = async (params: SearchHight) => {
    const queryParams = new URLSearchParams();

    if (params.SearchTerm) queryParams.append("SearchTerm", params.SearchTerm);

    const response = await apiBaseURL.get(`/filters/availability?${queryParams.toString()}`);
    return response.data;
};
