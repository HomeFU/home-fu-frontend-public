import {createSlice} from "@reduxjs/toolkit";

type counterState = {
    counter:number[]
}

const initialState:counterState = {
    counter: [0 ,0 , 0, 0]
}

export const countersSlice = createSlice({
    name:"counters",
    initialState,
    reducers: {
        increment: (state, action: {payload: number }) => {
            state.counter[action.payload] += 1;
        },
        decrement: (state, action: {payload: number }) => {
            if(state.counter[action.payload] > 0) {
                state.counter[action.payload] -= 1;
            }
        }
    }
});

export const {increment, decrement} = countersSlice.actions;
export default countersSlice.reducer;