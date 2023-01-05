import React, { useEffect, useState } from "react";
import spinner from "../../../assets/spinner.gif";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectProducts,
  store_products,
} from "../../../redux/slice/productsSlice";
import styles from "./Details.module.css";
import {
  add_to_cart,
  decrease_cart,
  selectCartItems,
  total_quantity,
} from "../../../redux/slice/cartSlice";

const Details = () => {
  const product = useSelector(selectProducts);
  const cartItems = useSelector(selectCartItems);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { ID } = useParams();
  const { title, image, description, price, id } = product;

  const alreadyInCart = cartItems.find((item) => item.id === id);

  const currentProduct = cartItems.map((item) => {
    if (item.id === id) {
      return <p>{item.cartQuantity}</p>;
    } // pojedinacni broj proizvoda
  }); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await axios
        .get(`https://fakestoreapi.com/products/${ID}`)
        .catch((err) => {
          console.log(("err", err.message));
        });
      dispatch(store_products(response.data));
      setIsLoading(false);
    };

    fetchProductDetails();
  }, [id, dispatch]);

  const addToCart = (product) => {
    dispatch(add_to_cart(product));
    dispatch(total_quantity());
  };
  const decrease = (product) => {
    dispatch(decrease_cart(product))
    dispatch(total_quantity())
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className={styles.spinner}>
          <img src={spinner} alt="loading..." />
        </div>
      ) : (
        <>
          <div className={styles.cardDetails}>
            {/* <h3>Category : {category}</h3> */}
            <div className={styles["product-image"]}>
              <img src={image} alt="product" width={180} />
            </div>
            <div className={styles.content}>
              <h2>{title}</h2>
              <p>{description}</p>

              <h3>${price}</h3>
              <div className={styles.incDecDiv}>
              {alreadyInCart ? (
                <>
                  <button className={`btn ${styles.disabled}`}>
                    <p>Already in Cart</p>
                  </button>
                  <button onClick={() => decrease(product)} className={styles["increase-decrease"]}>-</button>
                  
                  {currentProduct}
                  <button
                    onClick={() => addToCart(product)}
                    className={styles["increase-decrease"]}
                  >
                    +
                  </button>
                </>
              ) : (
                <button className="btn" onClick={() => addToCart(product)}>
                  <p>Add To Cart</p>
                </button>
              )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
