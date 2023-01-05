import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_cart,
  cartTotalQuantity,
  cart_subtotal,
  clear_cart,
  currency_converter,
  decrease_cart,
  remove_from_cart,
  selectCartAmount,
  selectCartItems,
  total_quantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.css";
import { FiDelete } from "react-icons/fi";

const Cart = () => {

  const [convert, setConvert] = useState("usd")

  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartAmount)
  const totalQuantity = useSelector(cartTotalQuantity)
  const dispatch = useDispatch();

  const addToCart = (item) => {
    dispatch(add_to_cart(item));
  };
  const decrease = (item) => {
    dispatch(decrease_cart(item));
  };
  const removeProduct = (item) => {
    dispatch(remove_from_cart(item));
  };

  useEffect(() => {
    dispatch(total_quantity());
    dispatch(cart_subtotal())
    dispatch(currency_converter({convert, cartTotalAmount}))
  }, [cartItems, dispatch, convert]);

  const swichConvert = () => {
    switch(convert) {
    case "usd" : 
    return <>$</>
    case "eur" : 
    return <>EUR</>
    case "rsd" :
      return <>RSD</>
    case "bam" :
      return <>BAM</>
    default: <></>
  }
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty...</h2>
      ) : (
        <>
          <table className={styles.table}>
            <thead className={styles.tHead}>
              <tr className={styles.tableRow}>
                <th>S/N</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => {
                const { id, image, title, price, cartQuantity } = item;
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>
                        <p>{title}</p>
                        <img
                          src={image}
                          style={{ width: "50px", height: "60px" }}
                          alt="product image"
                        />
                      </td>
                      <td>{price}$</td>
                      <td>
                        <button
                          onClick={() => decrease(item)}
                          className={styles["increase-decrease"]}
                        >
                          -
                        </button>
                        {cartQuantity}
                        <button
                          onClick={() => addToCart(item)}
                          className={styles["increase-decrease"]}
                        >
                          +
                        </button>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}$</td>
                      <td>
                        <FiDelete
                          size={24}
                          color="red"
                          onClick={() => removeProduct(item)}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="container">
            <div className={styles.checkoutDetails}>
              <span>
                <button
                  className={styles.clearBtn}
                  onClick={() => dispatch(clear_cart())}
                >
                  Clear All
                </button>
              </span>
              <span>
                <h4>Cart items: {totalQuantity}</h4>
                <h3>Total price: <b>{cartTotalAmount.toFixed(2)}</b>{swichConvert()}
              </h3>
              </span>
              <span className={styles.convert}>
              <h4>Convert total price</h4>
                <select value={convert}
                onChange={(e) => setConvert(e.target.value)}>
                  
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="rsd">RSD</option>
                  <option value="bam">BAM</option>
                </select>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
