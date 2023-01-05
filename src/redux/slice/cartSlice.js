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
      } else if (state.cartItems[indexOfProduct].cartQuantity === 1) {
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
      const removedProduct = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removedProduct;
    },
    clear_cart: (state) => {
      state.cartItems = [];
    },
    cart_subtotal: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity, price } = item;
        const subtotal = cartQuantity * price;
        array.push(subtotal);
      });
      const cartAmountTotal = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalAmount = cartAmountTotal;
    },
currency_converter: (state, action) => {
    const {convert} = action.payload
    let converted = []
    if(convert === "usd") {
        converted = state.totalAmount
    }
    if(convert === "eur") {
        converted = state.totalAmount * 0.95035
    }
    if(convert === "rsd") {
        converted = state.totalAmount * 111.5
    }
    if(convert === "bam") {
        converted = state.totalAmount * 1.8588
    }
    state.totalAmount = converted
},
  },
});

export const {
  add_to_cart,
  total_quantity,
  decrease_cart,
  remove_from_cart,
  clear_cart,
  cart_subtotal,
  currency_converter
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartAmount = (state) => state.cart.totalAmount
export const cartTotalQuantity = state => state.cart.totalQuantity

export default cartSlice.reducer;
