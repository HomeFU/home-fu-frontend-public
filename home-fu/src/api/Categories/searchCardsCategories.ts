import { apiBaseURL } from "..";
import { SearchParams } from "../../types/SearchParams/searchParams";

export const searchCardsByFilters = async (params: SearchParams) => {
    const queryParams = new URLSearchParams();
    
    if (params.SearchTerm) queryParams.append("SearchTerm", params.SearchTerm);
    if (params.CheckInDate) queryParams.append("CheckInDate", params.CheckInDate);
    if (params.CheckOutDate) queryParams.append("CheckOutDate", params.CheckOutDate);
    if (params.Adults) queryParams.append("Adults", params.Adults.toString());
    if (params.Children) queryParams.append("Children", params.Children.toString());
    if (params.LocationId) queryParams.append("LocationId", params.LocationId.toString());
    const response = await apiBaseURL.get(`/filters/availability?${queryParams.toString()}`);
    return response.data;
};


export const SearchCardsCategory = searchCardsByFilters;        