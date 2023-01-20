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
import { price_range } from "../../redux/slice/filterSortSlice";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterBar, setFilterBar] = useState(false);
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

  useEffect(() => {
    const fetchingProducts = async () => {
      const response = await axios
        .get("https://fakestoreapi.com/products")
        .catch((err) => {
          console.log(err.message);
          setIsLoading(false);
        });
        console.log(response.data);
      setIsLoading(false);
      dispatch(store_products(response.data));
      dispatch(price_range({ products: response.data }));
      // setProducts(response.data);
    };

    fetchingProducts();
  }, [dispatch]);

  const handleFilterBar = () => {
    setFilterBar(!filterBar)
  }

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <img src={spinner} alt="Loading" />
        </div>
      ) : (
        <div className={`container ${styles.product}`}>
          
            {isLoading ? null : <FilterProduct filterBar={filterBar} products={products} closeFilterBar={handleFilterBar} />}
          
          <main className={styles.main}>
            <ProductList handleFilterBar={handleFilterBar}/>
          </main>
        </div>
      )}
    </>
  );
};

export default Product;
