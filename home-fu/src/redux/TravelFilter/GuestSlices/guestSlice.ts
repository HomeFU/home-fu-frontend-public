import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen:false
}

const guestSlice = createSlice({
    name:"guest",
    initialState,
    reducers: {
        toggleGuest: (state) => {
            state.isOpen = !state.isOpen
        },
        closeGuest: (state) => {
            state.isOpen = false
        }
    }
});

export const {toggleGuest, closeGuest} = guestSlice.actions;
export default guestSlice.reducer;