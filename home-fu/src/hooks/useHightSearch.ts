import { useQuery } from "@tanstack/react-query";
import { SearchHight } from "../types/SearchHight/searchHight";
import {SearchParams} from "../types/SearchParams/searchParams";
import { CardsCategoriesModel } from "../types/Categories/cardsCategories";
import { SearchCardsCategory } from "../api/Categories/searchCardsCategories";

export const useHightSearch = (params: SearchHight | null) => {
  return useQuery<CardsCategoriesModel[]>({
    queryKey: ['searchCards', params],
    queryFn: () => SearchCardsCategory(params as SearchParams),
    enabled: params !== null,
  });
};
