import React, { useState } from "react";
import Search from "../../search/Search";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductList.module.css";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(false)
  return (
    <div>
      <div className={styles.flex}>
        <BsFillGridFill size={26} className={styles.grid} onClick={() => setGrid(false)}/>
        <FaListAlt size={26} className={styles.grid} onClick={() => setGrid(true)}/>
        <span className={styles.sort}>
          <h4>Search</h4>

          <Search />
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
        {products.length === 0 ? (
          <p>No products found...</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} grid={grid}/>
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
