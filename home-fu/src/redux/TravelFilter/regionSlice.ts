import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const regionSlice = createSlice({
    name:"region",
    initialState,
    reducers: {
        toggleRegion: (state) => {
            state.isOpen = !state.isOpen
        },
        closeRegion: (state) => {
            state.isOpen = false
        },
        openRegion: (state) => {
            state.isOpen = true
        }
    }
});

export const {toggleRegion, closeRegion, openRegion} = regionSlice.actions;
export default regionSlice.reducer;