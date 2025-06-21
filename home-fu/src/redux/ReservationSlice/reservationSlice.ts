import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { ReservationService } from '../../api/ServiceReservation/reservationService';
import type { RootState } from '../../redux/store';
import { CreateReservation } from '../../api/ServiceReservation/createReservation';

interface ReservationState {
  loading: boolean;
  error: string | null;
}

const initialState: ReservationState = {
  loading: false,
  error: null,
};

export const createReservation = createAsyncThunk(
  'reservation/create',
  async (payload: { 
    data: { 
      checkInDate: string;
      checkOutDate: string;
      adults: number;
      children?: number;
      infants?: number;
      pets?: number;
      cardId: number;
    };
    token: string;
  }, { rejectWithValue }) => {
    try {
      const response = await CreateReservation(payload.data, payload.token);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Помилка при бронюванні');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetError } = reservationSlice.actions;
export const selectReservationState = (state: RootState) => state.reservation;
export default reservationSlice.reducer;