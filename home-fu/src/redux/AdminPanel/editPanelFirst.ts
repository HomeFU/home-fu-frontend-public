import { createSlice } from "@reduxjs/toolkit";

interface UpdateLocationFormState {
  isOpenUpdateLocationForm: boolean;
  idForUpdate: number | null;
  nameForUpdate: string;
}

const initialState: UpdateLocationFormState = {
  isOpenUpdateLocationForm: false,
  idForUpdate: null,
  nameForUpdate: '',
};

const updateLocationFormSlice = createSlice({
  name: "updateLocationForm",
  initialState,
  reducers: {
    openUpdateLocationForm(state, action) {
      state.isOpenUpdateLocationForm = true;
      state.idForUpdate = action.payload.id;
      state.nameForUpdate = action.payload.name;
    },
    closeUpdateLocationForm(state) {
      state.isOpenUpdateLocationForm = false;
      state.idForUpdate = null;
      state.nameForUpdate = '';
    },
  },
});

export const { openUpdateLocationForm, closeUpdateLocationForm } = updateLocationFormSlice.actions;
export default updateLocationFormSlice.reducer;
