import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const indexOfProduct = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexOfProduct >= 0) {
        // proizvod vec postoji u korpi
        state.cartItems[indexOfProduct].cartQuantity += 1;
      } else {
        // dodavanje proizvoda u korpu
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
    decrease_cart: (state, action) => {
      const indexOfProduct = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[indexOfProduct].cartQuantity > 1) {
        state.cartItems[indexOfProduct].cartQuantity -= 1;
      } else if (state.cartItems[indexOfProduct].cartQuantity === 1 ) {
        const filteredProduct = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
        state.cartItems = filteredProduct;
      }
    },
    total_quantity: (state) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        array.push(quantity);
      });
      const cartTotalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalQuantity = cartTotalQuantity;
    },
    remove_from_cart: (state, action) => {
        const removedProduct = state.cartItems.filter(item => item.id !== action.payload.id)
        state.cartItems = removedProduct
      },
    clear_cart: (state, action) => {
        state.cartItems = []
    }
  },
 
});

export const { add_to_cart, total_quantity, decrease_cart, remove_from_cart, clear_cart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
