import { createSlice } from "@reduxjs/toolkit"

interface AnimalsModalState {
  isOpen: boolean;
}

const initialState: AnimalsModalState = {
  isOpen: false,
}

export const animalsSlice = createSlice({
  name: "animalsModal",
  initialState,
  reducers: {
    openAnimalsModal: (state) => {
      state.isOpen = true;
    },
    closeAnimalsModal: (state) => {
      state.isOpen = false;
    },
    toggleAnimalsModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
})

export const { 
  openAnimalsModal, 
  closeAnimalsModal, 
  toggleAnimalsModal
} = animalsSlice.actions;

export default animalsSlice.reducer;