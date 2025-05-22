
import { createSlice } from "@reduxjs/toolkit";

interface CardFormState {
  isOpenAddCardForm: boolean;
}

const initialState: CardFormState = {
  isOpenAddCardForm: false,
};

export const cardFormAddSlice = createSlice({ 
  name: "cardFormAdd",
  initialState,
  reducers: {
    openAddCardForm(state) {
      state.isOpenAddCardForm = true;
    },
    closeAddCardForm(state) {
      state.isOpenAddCardForm = false;
    },
  },
});
export const { openAddCardForm, closeAddCardForm } = cardFormAddSlice.actions;
export default cardFormAddSlice.reducer;