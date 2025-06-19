import { apiBaseURL } from '../../api/index';
import { ReservationData } from '../../types/ReservationTypes/reservationTypes';

export const ReservationService = {
  createReservation: async (data: ReservationData, token: string) => {
    const response = await apiBaseURL.post('/reservation', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  },

  checkAvailability: async (cardId: number, from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    
    const response = await apiBaseURL.get(
      `/reservation/card/${cardId}/availability?${params.toString()}`
    );
    return response.data as Array<{ checkIn: string; checkOut: string }>;
  }
};