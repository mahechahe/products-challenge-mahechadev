import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsCart: [],
  products: [],
  favorites: [],
};

const initSlice = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setAddItemToCart: (state, action) => {
      const newItems = [...state.itemsCart, action.payload];
      state.itemsCart = newItems;
      localStorage.setItem('productsCart', JSON.stringify(newItems));
    },
    setAddItemsCartByLocal: (state, action) => {
      state.itemsCart = action.payload;
    },
    setRemoteItemToCart: (state, action) => {
      const filterFav = state.itemsCart.filter((id) => id !== action.payload);
      const newItems = filterFav;
      state.itemsCart = newItems;
      localStorage.setItem('productsCart', JSON.stringify(newItems));
    },
    setAddItemToFavorites: (state, action) => {
      const newItems = [...state.favorites, action.payload];
      state.favorites = newItems;
      localStorage.setItem('favorites', JSON.stringify(newItems));
    },
    setAddItemsFavoriteByLocal: (state, action) => {
      state.favorites = action.payload;
    },
    setRemoteItemToFavorites: (state, action) => {
      const filterFav = state.favorites.filter((id) => id !== action.payload);
      const newItems = filterFav;
      state.favorites = newItems;
      localStorage.setItem('favorites', JSON.stringify(newItems));
    },
    setAddProducts: (state, action) => {
      state.products = action.payload;
    },
    resetInitSlice: () => {
      return initialState;
    },
  },
});

export const {
  setAddItemToCart,
  setAddItemsCartByLocal,
  setRemoteItemToCart,
  setAddItemToFavorites,
  setAddItemsFavoriteByLocal,
  setRemoteItemToFavorites,
  resetInitSlice,
  setAddProducts,
} = initSlice.actions;

export default initSlice.reducer;
