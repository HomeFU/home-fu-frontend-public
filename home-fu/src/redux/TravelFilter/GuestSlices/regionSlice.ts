import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selectedRegion: "" as string,
    selectedRegionId: null as number | null,
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
        },
        setSelectRegionId: (state, action: { payload: number }) => {
            state.selectedRegionId = action.payload
        }
    }
});

export const {toggleRegion, closeRegion, openRegion, setSelectRegion, setSelectRegionId} = regionSlice.actions;
export default regionSlice.reducer;