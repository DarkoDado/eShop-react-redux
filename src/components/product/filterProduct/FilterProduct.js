import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filter_by_price,
  filter_category,
  filter_search,
} from "../../../redux/slice/filterSortSlice";
import { selectProducts } from "../../../redux/slice/productsSlice";
import Search from "../../search/Search";
import styles from "./FilterProduct.module.css";

const FilterProduct = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(1000);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const minPrice = useSelector((state) => state.filter.minPrice);
  const maxPrice = useSelector((state) => state.filter.maxPrice);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategory = (cat) => {
    setCategory(cat);
    dispatch(filter_category({ products, category: cat }));
  };

  useEffect(() => {
    dispatch(filter_search({ products, search }));
    // console.log(products);
  }, [search, products, dispatch]); //products, dispatch

  useEffect(() => {
    dispatch(filter_by_price({ products, price }));
  }, [dispatch, products, price]);

  return (
    
      <div>
        <div className={styles.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {categories.map((cat, index) => {
          return (
            <button
              key={index}
              onClick={() => handleCategory(cat)}
              className={
                `${category}` === cat
                  ? `${styles.btnCategory} ${styles.btnCategoryClicked}`
                  : ` ${styles.btnCategory}`
              }
            >
              {cat}
            </button>
          );
        })}
        <div className={styles.minMaxPrice}>
          <h4>Filter by Price</h4>
          <p>{`$${price}`}</p>

          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>
  
  );
};

export default FilterProduct;
