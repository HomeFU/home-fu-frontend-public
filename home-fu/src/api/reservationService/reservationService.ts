import axios from 'axios';

const API_BASE_URL = 'https://homefu.azurewebsites.net/api'

export const ReservationService = {
  // Создать бронирование
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
      throw new Error(error.response?.data?.message || 'Ошибка при создании бронирования');
    }
  },

  // Получить бронирования пользователя
  getUserReservations: async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reservation/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении бронирований');
    }
  },

  // Обновить бронирование
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
      throw new Error(error.response?.data?.message || 'Ошибка при обновлении бронирования');
    }
  },

  // Отменить бронирование
  cancelReservation: async (id: number, token: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reservation/${id}/cancel`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка при отмене бронирования');
    }
  },

  // Удалить бронирование (только для админа)
  deleteReservation: async (id: number, token: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/reservation/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка при удалении бронирования');
    }
  }
};