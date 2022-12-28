import React, {  useEffect, useState } from "react";
import Search from "../../search/Search";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductList.module.css";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filter_search, selectFilteredProduct } from "../../../redux/slice/filterSortSlice";


const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(false)
  const [search, setSearch] = useState("")

   const filteredProducts = useSelector(selectFilteredProduct)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(filter_search({products, search}))  
    console.log(products);
  }, [search]) //products, dispatch 

  return (
    <div>
      <div className={styles.flex}>
        <BsFillGridFill size={26} className={styles.grid} onClick={() => setGrid(false)}/>
        <FaListAlt size={26} className={styles.grid} onClick={() => setGrid(true)}/>
        <span className={styles.sort}>
          <h4>Search</h4>

          <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </span>
        <span className={styles.sort}>
          <h4>Sort by:</h4>
          <select className={styles.sortSelect}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest price</option>
            <option value="highest-price">Highest price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </span>
      </div>
      
      <div className={grid ? `${styles.block} ` : `${styles.cards}`}>
        {filteredProducts.length === 0 ? (
          <p>No products found...</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} {...product} grid={grid}/>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
