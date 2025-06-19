// redux/Filters/filterSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FilterState = {
  CheckInDate?: string | null;
  CheckOutDate?: string | null;
  Adults?: number | null;
  Children?: number | null;
  LocationId?: number | null;
  SearchTerm?:string | null;
  Infants?:number | null
  Pets?:number | null
}

const initialState: FilterState = {
  CheckInDate: null,
  CheckOutDate: null,
  Adults: null,
  Children: null,
  LocationId: null,
  SearchTerm: null,
  Infants: null,
  Pets: null
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      return { ...state, ...action.payload }
    },
    resetFilters: () => initialState
  }
})

export const { setFilters, resetFilters } = filterSlice.actions
export default filterSlice.reducer
