import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: [],
}

const filterSortSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter_search : (state, action) => {
      const { products, search } = action.payload;
      // console.log(action.payload);
      const tempProducts = products.filter(
        (product) =>
          product.title
          .toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = tempProducts
    }
  }
});

export const {filter_search} = filterSortSlice.actions


export const selectFilteredProduct = (state) => state.filter.filteredProducts;

export default filterSortSlice.reducer