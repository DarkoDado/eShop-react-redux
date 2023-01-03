import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slice/cartSlice";

const Cart = () => {
   const cartItems = useSelector(selectCartItems)
  return (
    <div>
    {cartItems.length === 0 ? (
      <h2>Your cart is empty...</h2>
    )
  : (
    <p>{cartItems.map(item => {
        return (
          <>
          <h3>{item.price}</h3>
          <h4>{item.title}</h4>
          </>
        )
      })}</p>
    
    )}
  </div>
  );
};

export default Cart;
