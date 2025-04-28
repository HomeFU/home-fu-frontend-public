import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isShowScrolledFilter: true
}

const scrolledFilterSlice = createSlice({
    name: "scrolledFilter",
    initialState,
    reducers: {
        handlerScrolledFilter(state, action) {
            state.isShowScrolledFilter = action.payload
        }
    }
});

export const {handlerScrolledFilter} = scrolledFilterSlice.actions;
export default scrolledFilterSlice.reducer;