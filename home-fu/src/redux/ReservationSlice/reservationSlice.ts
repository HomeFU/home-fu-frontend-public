import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReservationService } from '..//..//api/reservationService/reservationService'; // поправь путь
import type { RootState } from '../../redux/store';

interface Reservation {
  id?: number;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children?: number;
  infants?: number;
  pets?: number;
  cardId: number;
}

interface ReservationState {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  loading: false,
  error: null,
};

// Thunk для создания бронирования
export const createReservation = createAsyncThunk<
  Reservation,
  { data: Omit<Reservation, 'id'>; token: string },
  { rejectValue: string }
>(
  'reservation/create',
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await ReservationService.createReservation(data, token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Неизвестная ошибка');
    }
  }
);

// Thunk для получения бронирований пользователя
export const fetchUserReservations = createAsyncThunk<
  Reservation[],
  string,
  { rejectValue: string }
>(
  'reservation/fetchUserReservations',
  async (token, { rejectWithValue }) => {
    try {
      const response = await ReservationService.getUserReservations(token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Неизвестная ошибка');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Создание бронирования
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      })
      // Получение бронирований
      .addCase(fetchUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      });
  }
});

export const selectReservations = (state: RootState) => state.reservation;

export default reservationSlice.reducer;
