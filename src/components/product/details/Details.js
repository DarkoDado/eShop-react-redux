import React, { useEffect, useState } from "react";
import spinner from "../../../assets/spinner.gif"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts, store_products } from "../../../redux/slice/productsSlice";
import styles from "./Details.module.css";
import { add_to_cart, total_quantity } from "../../../redux/slice/cartSlice";

const Details = () => {
  const product = useSelector(selectProducts)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const { id } = useParams();
  const { title, image, description, price} = product
  
useEffect(() => {

  const fetchProductDetails = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log(("err", err.message));
      });
      dispatch(store_products(response.data))
      setIsLoading(false)
  };

 fetchProductDetails()
},[id, dispatch])

const addToCart = (product) => {
  dispatch(add_to_cart(product))
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
        <img src={image} alt="product" width={180}/>
        </div>
        <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        
        <h3>${price}</h3>
        
        <button className="btn" onClick={() => addToCart(product)}><p>Add To Cart</p></button>
        </div>
        </div>
        
        </>
        
      )} 
      
    </div>
  );
};

export default Details;
