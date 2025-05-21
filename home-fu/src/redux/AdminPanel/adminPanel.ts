import { createSlice } from "@reduxjs/toolkit";

interface LocationFormState {
  isOpenAddLocationForm: boolean;
}

const initialState: LocationFormState = {
  isOpenAddLocationForm: false,
};

const locationFormSlice = createSlice({
  name: "locationForm",
  initialState,
  reducers: {
    openAddLocationForm(state) {
      state.isOpenAddLocationForm = true;
    },
    closeAddLocationForm(state) {
      state.isOpenAddLocationForm = false;
    },
  },
});

export const { openAddLocationForm, closeAddLocationForm } = locationFormSlice.actions;
export default locationFormSlice.reducer;
