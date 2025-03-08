import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const formSlice = createSlice({
    name:"form",
    initialState,
    reducers: {
        toggleForm:(state) => {
            state.isOpen = !state.isOpen
        },
        closeForm: (state) => {
            state.isOpen = false
        }
    }
});

export const {toggleForm, closeForm} = formSlice.actions;
export default formSlice.reducer;