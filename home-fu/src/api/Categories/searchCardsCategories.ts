import { apiBaseURL } from "..";
import { SearchParams } from "../../types/SearchParams/searchParams";

export const SearchCardsCategory = async (params: SearchParams) => {
    const queryParams = new URLSearchParams();

    if (params.SearchTerm) queryParams.append("SearchTerm", params.SearchTerm);
    if (params.CheckInDate) queryParams.append("CheckInDate", params.CheckInDate);
    if (params.CheckOutDate) queryParams.append("CheckOutDate", params.CheckOutDate);
    if (params.Adults !== undefined) queryParams.append("Adults", params.Adults.toString());
    if (params.Children !== undefined) queryParams.append("Children", params.Children.toString());
    if (params.LocationId !== undefined) queryParams.append("LocationId", params.LocationId.toString());

    const response = await apiBaseURL.get(`/filters/availability?${queryParams.toString()}`);
    return response.data;
};
