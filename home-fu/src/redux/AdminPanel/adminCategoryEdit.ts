import { createSlice } from '@reduxjs/toolkit';

interface CategoryFormEditState {
  isOpenEditCategoryForm: boolean;
}

const initialState: CategoryFormEditState = {
  isOpenEditCategoryForm: false,
};

const adminCategoryEditSlice = createSlice({
  name: 'adminCategoryEdit',
  initialState,
  reducers: {
    toggleEditCategoryForm(state) {
      state.isOpenEditCategoryForm = !state.isOpenEditCategoryForm;
    },
    openEditCategoryForm(state) {
      state.isOpenEditCategoryForm = true;
    },
    closeEditCategoryForm(state) {
      state.isOpenEditCategoryForm = false;
    },
  },
});

export const { toggleEditCategoryForm, openEditCategoryForm, closeEditCategoryForm } = adminCategoryEditSlice.actions;

export default adminCategoryEditSlice.reducer;
