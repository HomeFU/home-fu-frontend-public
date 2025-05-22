import { createSlice } from '@reduxjs/toolkit';

interface CategoryFormState {
  isOpenAddCategoryForm: boolean;
}

const initialState: CategoryFormState = {
  isOpenAddCategoryForm: false,
};

const adminCategoryAddSlice = createSlice({
  name: 'adminCategoryAdd',
  initialState,
  reducers: {
    toggleAddCategoryForm(state) {
      state.isOpenAddCategoryForm = !state.isOpenAddCategoryForm;
    },
    openAddCategoryForm(state) {
      state.isOpenAddCategoryForm = true;
    },
    closeAddCategoryForm(state) {
      state.isOpenAddCategoryForm = false;
    },
  },
});

export const { toggleAddCategoryForm, openAddCategoryForm, closeAddCategoryForm } = adminCategoryAddSlice.actions;

export default adminCategoryAddSlice.reducer;
