import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
};

const menuPopUpSlice = createSlice({
    name: "menuPopUp",
    initialState,
    reducers: {
        toggleMenuPopUp: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeMenuPopUp: (state) => {
            state.isOpen = false;
        },
        openMenuPopUp: (state) => {
            state.isOpen = true;
        }
    }
});

export const { toggleMenuPopUp, closeMenuPopUp, openMenuPopUp } = menuPopUpSlice.actions;
export default menuPopUpSlice.reducer;