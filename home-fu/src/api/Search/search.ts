import { apiBaseURL } from "..";
import { SearchHight } from "../../types/SearchHight/searchHight";

export const searchByTerm = async (params: SearchHight) => {
    const queryParams = new URLSearchParams();
    
    if (params.SearchTerm) queryParams.append("SearchTerm", params.SearchTerm);
    if (params.CheckInDate) queryParams.append("CheckInDate", params.CheckInDate);
    if (params.CheckOutDate) queryParams.append("CheckOutDate", params.CheckOutDate);

    const response = await apiBaseURL.get(`/filters/availability?${queryParams.toString()}`);
    return response.data;
};