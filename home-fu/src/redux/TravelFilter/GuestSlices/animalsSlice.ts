import { createSlice } from "@reduxjs/toolkit"

interface AnimalsModalState {
  isOpen: boolean;
  isAnimating: boolean;
}

const initialState: AnimalsModalState = {
  isOpen: false,
  isAnimating: false,
}

export const animalsModalSlice = createSlice({
  name: "animalsModal",
  initialState,
  reducers: {
    openAnimalsModal: (state) => {
      state.isOpen = true;
      state.isAnimating = false;
    },
    closeAnimalsModal: (state) => {
      state.isOpen = false;
      state.isAnimating = false;
    },
    toggleAnimalsModal: (state) => {
      state.isOpen = !state.isOpen;
      state.isAnimating = false;
    },
    startClosingAnimation: (state) => {
      state.isAnimating = true;
    },
  },
})

export const { 
  openAnimalsModal, 
  closeAnimalsModal, 
  toggleAnimalsModal,
  startClosingAnimation 
} = animalsModalSlice.actions;

export const selectAnimalsModalOpen = (state: any) => state.animalsModal.isOpen;
export const selectAnimalsModalAnimating = (state: any) => state.animalsModal.isAnimating;
export default animalsModalSlice.reducer;