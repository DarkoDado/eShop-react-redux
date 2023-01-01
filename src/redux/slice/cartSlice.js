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
    total_quantity: (state, action) => {
        const array = []
        state.cartItems.map(item => {
            const {cartQuantity} = item;
            const quantity = cartQuantity;
            array.push(quantity)
        })
        const cartTotalQuantity = array.reduce((a, b) => {
            return a + b
        }, 0)
        state.totalQuantity = cartTotalQuantity
    }
   
  },
});

export const { add_to_cart, total_quantity } = cartSlice.actions;

export const cartItems = state => state.cart.cartItems

export default cartSlice.reducer;
