import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import styles from "./ProductList.module.css";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  products_sort,
  selectFilteredProduct,
} from "../../../redux/slice/filterSortSlice";
import { selectProducts } from "../../../redux/slice/productsSlice";

const ProductList = ({handleFilterBar}) => {
  const [grid, setGrid] = useState(false);
  const [sort, setSort] = useState("latest");
  const products = useSelector(selectProducts)
  const filteredProducts = useSelector(selectFilteredProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(products_sort({ products, sort }));
  }, [dispatch, products, sort]);
  return (
    <div >
      <div className={styles.flex}>
       <div> 
        <BsFillGridFill
          size={26}
          className={styles.grid}
          onClick={() => setGrid(false)}
        />
        <FaListAlt
          size={26}
          className={styles.grid}
          onClick={() => setGrid(true)}
        />
  </div>
        <span className={styles.sort}>
          <h1 onClick={handleFilterBar}>Click</h1>
          <h4>Sort by:</h4>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className={styles.sortSelect}
          >
            <option value="latest">Latest</option>
            <option value="lowest price">Lowest price</option>
            <option value="highest price">Highest price</option>
          </select>
        </span>
      </div>

      <div className={grid ? `${styles.block} ` : `${styles.cards}`}>
        {filteredProducts.length === 0 ? (
          <h3>No products found...</h3>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} {...product} grid={grid} />
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
