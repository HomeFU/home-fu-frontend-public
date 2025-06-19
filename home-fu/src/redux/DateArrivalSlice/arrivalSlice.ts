import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DateState = {
  selectedDate: string | null; 
  isOpen: boolean;
};

const initialState: DateState = {
  selectedDate: null,
  isOpen: false,
};

const arrivalSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {
    setSelectedArrivalDate: (state, action: PayloadAction<string | null>) => {
      state.selectedDate = action.payload;
    },
    toggleDateArrival: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeDateArrival: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  setSelectedArrivalDate,
  toggleDateArrival,
  closeDateArrival,
} = arrivalSlice.actions;

export default arrivalSlice.reducer;
