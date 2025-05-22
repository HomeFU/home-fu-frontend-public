
import { createSlice } from "@reduxjs/toolkit";

interface CardFormUpdateState {
  isOpenUpdateCardForm: boolean;
}

const initialState: CardFormUpdateState = {
  isOpenUpdateCardForm: false,
};

const cardFormUpdateSlice = createSlice({
  name: "cardFormUpdate",
  initialState,
  reducers: {
    openUpdateCardForm(state) {
      state.isOpenUpdateCardForm = true;
    },
    closeUpdateCardForm(state) {
      state.isOpenUpdateCardForm = false;
    },
  },
});

export const { openUpdateCardForm, closeUpdateCardForm } = cardFormUpdateSlice.actions;
export default cardFormUpdateSlice.reducer;
