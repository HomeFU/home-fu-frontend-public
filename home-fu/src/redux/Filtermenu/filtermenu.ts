import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RoomType = "bedrooms" | "beds" | "bathrooms";

interface FilterMenuState {
  isOpen: boolean;
  isAnimating: boolean; // Отслеживаем анимацию
  resetTriggered: boolean;
  filters: {
    placeType: "any" | "room" | "entire";
    priceRange: {
      min: number;
      max: number;
    };
    rooms: {
      bedrooms: number;
      beds: number;
      bathrooms: number;
    };
  };
}

const initialState: FilterMenuState = {
  isOpen: false,
  isAnimating: false,
  resetTriggered: false,
  filters: {
    placeType: "any",
    priceRange: {
      min: 0,
      max: 14000,
    },
    rooms: {
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
  },
};

export const filterMenuSlice = createSlice({
  name: "filterMenu",
  initialState,
  reducers: {
    openFilterMenu: (state) => {
      state.isAnimating = true; // Начинаем анимацию
      state.isOpen = true;
    },
    closeFilterMenu: (state) => {
      state.isAnimating = true; // Начинаем анимацию
      state.isOpen = false;
    },
    toggleForm: (state) => {
      state.isOpen = !state.isOpen;
      state.isAnimating = true; // Запуск анимации при переключении
    },
    startClosingAnimation: (state) => {
      state.isAnimating = true; // Запуск анимации при закрытии
    },
    finishAnimation: (state) => {
      state.isAnimating = false; // Завершаем анимацию
    },
    setPlaceType: (state, action: PayloadAction<"any" | "room" | "entire">) => {
      state.filters.placeType = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filters.priceRange = action.payload;
    },
    incrementRoom: (state, action: PayloadAction<RoomType>) => {
      if (state.filters.rooms[action.payload] < 8) {
        state.filters.rooms[action.payload] += 1;
      }
    },
    decrementRoom: (state, action: PayloadAction<RoomType>) => {
      if (state.filters.rooms[action.payload] > 0) {
        state.filters.rooms[action.payload] -= 1;
      }
    },
    setRoomValue: (state, action: PayloadAction<{ type: RoomType; value: number }>) => {
      state.filters.rooms[action.payload.type] = action.payload.value;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.resetTriggered = !state.resetTriggered;
    },
  },
});

export const {
  openFilterMenu,
  closeFilterMenu,
  toggleForm,
  startClosingAnimation,
  finishAnimation,  // Добавлено для завершения анимации
  setPlaceType,
  setPriceRange,
  incrementRoom,
  decrementRoom,
  setRoomValue,
  resetFilters,
} = filterMenuSlice.actions;

export default filterMenuSlice.reducer;
