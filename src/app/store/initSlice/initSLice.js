import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsCart: [],
  favorites: [1],
};

const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.itemsCart = [...state.itemsCart, action.payload];
    },
    addItemToFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    resetInitSlice: () => {
      return initialState;
    },
  },
});

export const { addItemToCart, addItemToFavorites, resetInitSlice } =
  initSlice.actions;

export default initSlice.reducer;
