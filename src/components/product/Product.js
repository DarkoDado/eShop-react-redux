import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Product.module.css";
import FilterProduct from "./filterProduct/FilterProduct";
import ProductList from "./productList/ProductList";
import spinner from "../../assets/spinner.gif";
import {
  selectProducts,
  store_products,
} from "../../redux/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "../search/Search";
const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [products, setProducts] = useState([]);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  //   const fetchingProducts = () => {
  //     fetch("https://fakestoreapi.com/products")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // setProducts(data);
  //         setIsLoading(false);
  //         // console.log(data);
  //         // ''
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //         //error message
  //       });
  //       dispatch(store_products())
  //   };

  const fetchingProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
    setIsLoading(false);
    dispatch(store_products(response.data));
    // setProducts(response.data);
  };

  useEffect(() => {
      fetchingProducts()
  }, []);

  return (
    <>
      <div className={`container ${styles.product}`}>
        <aside>{isLoading ? null : <FilterProduct products={products}/>}</aside>
        <main className={styles.main}>
          {isLoading ? (
            <img src={spinner} alt="Loading" style={{ width: "50px" }} />
          ) : (
            <ProductList products={products} />
          )}
        </main>
      </div>
    </>
  );
};

export default Product;
