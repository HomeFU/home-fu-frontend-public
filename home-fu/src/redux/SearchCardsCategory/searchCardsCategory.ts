import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchState = {
  SearchTerm?: string | null;
}

const initialState: SearchState = {
  SearchTerm: null,
}

const filterSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SearchState>) => {
      return { ...state, ...action.payload }
    },
    resetFilters: () => initialState
  }
})

export const { setFilters, resetFilters } = filterSlice.actions
export default filterSlice.reducer
