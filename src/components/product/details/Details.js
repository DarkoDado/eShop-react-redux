import React, { useEffect, useState } from "react";
import spinner from "../../../assets/spinner.gif"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProducts, store_products } from "../../../redux/slice/productsSlice";
import styles from "./Details.module.css";

const Details = () => {
  const product = useSelector(selectProducts)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const { id } = useParams();
  const { title, image, description, category} = product
  const fetchProductDetails = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log(("err", err.message));
      });
      dispatch(store_products(response.data))
      setIsLoading(false)
  };
useEffect(() => {
 fetchProductDetails()
},[id])
  return (
    <div className="container">
      {isLoading ? (
        <img src={spinner} alt="loading..." />
      ) : (
      
        <>
        <div className={styles.cardDetails}>
        <h2>{title}</h2>
       
        {/* <h3>Category : {category}</h3> */}
        <div className={styles["product-image"]}>
        <img src={image} alt="product" width={180}/>
        
        <p>{description}</p>
        
        </div>
        
        <button className="btn">Add To Cart</button>
        </div>
        
        </>
        
      )} 
      
    </div>
  );
};

export default Details;
