import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    store_products : (state, action) => {
        state.products = action.payload
        // console.log(action.payload);
    
  },
  price_range: (state, action) => {
    const { products } = action.payload;
    const array = [];
    products.map((product) => {
      const price = product.price;
      return array.push(price);
    });
    const max = Math.max(...array);
    const min = Math.min(...array);

    state.minPrice = min;
    state.maxPrice = max;
  },
  },

});

export const {store_products, price_range} = productsSlice.actions

export const selectProducts = state => state.products.products


export default productsSlice.reducer