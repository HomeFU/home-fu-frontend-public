import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedRegion: "" as string
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
        },
        setSelectRegion: (state, action: { payload: string }) => {
            state.selectedRegion = action.payload
        }
    }
});

export const {toggleRegion, closeRegion, openRegion, setSelectRegion} = regionSlice.actions;
export default regionSlice.reducer;