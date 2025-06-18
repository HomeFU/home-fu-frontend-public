import axios from 'axios';

const API_BASE_URL = 'https://homefu.azurewebsites.net/api';

export const ReservationService = {
  createReservation: async (data: {
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children?: number;
    infants?: number;
    pets?: number;
    cardId: number;
  }, token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reservation`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при бронюванні');
    }
  },

  checkAvailability: async (cardId: number, from?: string, to?: string) => {
    try {
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      
      const response = await axios.get(
        `${API_BASE_URL}/reservation/card/${cardId}/availability?${params.toString()}`
      );
      return response.data as Array<{checkIn: string, checkOut: string}>;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при перевірці доступності');
    }
  },

  getUserReservations: async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reservation/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при отриманні бронювань');
    }
  },

  updateReservation: async (id: number, data: Partial<{
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    infants: number;
    pets: number;
    status: string;
  }>, token: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/reservation/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при оновленні бронювання');
    }
  },

  cancelReservation: async (id: number, token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reservation/${id}/cancel`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при скасуванні бронювання');
    }
  },

  deleteReservation: async (id: number, token: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reservation/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Помилка при видаленні бронювання');
    }
  }
};