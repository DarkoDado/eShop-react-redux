import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, decrease_cart, selectCartItems, total_quantity } from "../../redux/slice/cartSlice";
import styles from "./Cart.module.css"

const Cart = () => {
   const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

   const addToCart = (item) => {
    dispatch(add_to_cart(item));
  };
  const decrease = (item) => {
    dispatch(decrease_cart(item))
  }

  useEffect(() => {
    dispatch(total_quantity())
  }, [cartItems, dispatch])
  
  return (
    <div>
    {cartItems.length === 0 ? (
      <h2>Your cart is empty...</h2>
    )
  : (
    <>
    <table className={styles.table}>
      <thead className={styles.tHead}>
        <tr>
          <th>S/N</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
    
    <tbody>
    {cartItems.map((item,index) => {
        const {id, image, title, price, cartQuantity} = item
        return (
          <>
          <tr key={index}>
          <td>{index + 1}</td>

          <td><p>{title}</p>
          <img src={image} style={{width: "50px"}} alt="product image" /> 
          </td>
          <td>{price}</td>
          <td>
          <button onClick={() => decrease(item)} className={styles["increase-decrease"]}>-</button>
          {cartQuantity}
          <button
                    onClick={() => addToCart(item)}
                    className={styles["increase-decrease"]}
                  >
                    +
                  </button>
                  
                  
          </td>
          </tr>
          </>
        )
      })}
      </tbody>
      </table>
     </>
    )}
   
  </div>
  );
};

export default Cart;
