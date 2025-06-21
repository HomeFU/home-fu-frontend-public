import { apiBaseURL } from "..";

export const CheckAvailability = async (cardId: number, from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    
    const response = await apiBaseURL.get(
      `/reservation/card/${cardId}/availability?${params.toString()}`
    );
    return response.data;
}