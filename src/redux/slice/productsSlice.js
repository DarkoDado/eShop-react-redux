import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    store_products: (state, action) => {
      state.products = action.payload;
      // console.log(action.payload);
    },
  },
});

export const { store_products } = productsSlice.actions;

export const selectProducts = (state) => state.products.products;

export default productsSlice.reducer;
