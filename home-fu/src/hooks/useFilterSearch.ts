import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "../types/SearchParams/searchParams";
import { CardsCategoriesModel } from "../types/Categories/cardsCategories";
import { SearchCardsCategory } from "../api/Categories/searchCardsCategories";

export const useFilterSearch = (params: SearchParams | null) => {
  return useQuery<CardsCategoriesModel[]>({
    queryKey: ['filteredCards', params],
    queryFn: () => SearchCardsCategory(params as SearchParams),
    enabled: params !== null,
  });
};
