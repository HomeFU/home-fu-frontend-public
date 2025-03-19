import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isOpenRegisterForm: false
}

const formSlice = createSlice({
    name:"form",
    initialState,
    reducers: {
        toggleForm:(state) => {
            state.isOpen = !state.isOpen;
        },
        openRegisterForm:(state) => {
            state.isOpenRegisterForm = true;
        },
        closeLoginForm: (state) => {
            state.isOpen = false;
        },
        closeRegisterForm: (state) => {
            state.isOpen = false;
            state.isOpenRegisterForm = false;

        }
    }
});

export const {toggleForm, openRegisterForm, closeLoginForm, closeRegisterForm} = formSlice.actions;
export default formSlice.reducer;