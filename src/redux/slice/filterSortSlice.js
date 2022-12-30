import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSortSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter_search: (state, action) => {
      const { products, search } = action.payload;
      // console.log(action.payload);
      const searchedProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = searchedProducts;
    },
    products_sort: (state, action) => {
      const { products, sort } = action.payload;
      let sortedProducts = [];
      if (sort === "latest") {
        sortedProducts = products;
      }
      if (sort === "lowest price") {
        sortedProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest price") {
        sortedProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      state.filteredProducts = sortedProducts;
    },
    filter_category: (state, action) => {
      const { products, category } = action.payload;
      let filteredCategories = [];
      if (category === "All") {
        filteredCategories = products;
      } else {
        filteredCategories = products.filter(
          (product) => product.category === category
        );
      }
      state.filteredProducts = filteredCategories;
    },
  },
});

export const { filter_search, products_sort, filter_category } =
  filterSortSlice.actions;

export const selectFilteredProduct = (state) => state.filter.filteredProducts;

export default filterSortSlice.reducer;
