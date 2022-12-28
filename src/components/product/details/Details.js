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
    <div>
      {isLoading ? (
        <img src={spinner} alt="loading..." />
      ) : (
        <>
        <p>{title}</p>
        <p>{description}</p>
        <p>{category}</p>
        <img src={image} alt="product" />
        </>
      )} 
    </div>
  );
};

export default Details;
