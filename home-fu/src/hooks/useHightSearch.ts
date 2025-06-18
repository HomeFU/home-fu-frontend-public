import { useQuery } from "@tanstack/react-query";
import { searchByTerm } from "..//api/Search/search";
import { SearchHight } from "..//types/SearchHight/searchHight";

export const useHightSearch = (params: Partial<SearchHight> | null) => {
    return useQuery({
        queryKey: ['searchResults', params],
        queryFn: () => {
            if (!params?.SearchTerm) return Promise.resolve([]);

            const cleanParams: Partial<SearchHight> = {
                SearchTerm: params.SearchTerm,
                ...(params.CheckInDate && { CheckInDate: params.CheckInDate }),
                ...(params.CheckOutDate && { CheckOutDate: params.CheckOutDate }),
                ...(params.Adults && { Adults: params.Adults }),
                ...(params.Children && { Children: params.Children }),
                ...(params.LocationId && { LocationId: params.LocationId })
            };

            return searchByTerm(cleanParams);
        },
        enabled: !!params?.SearchTerm
    });
};