import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filter_category } from "../../../redux/slice/filterSortSlice";
import styles from "./FilterProduct.module.css";

const FilterProduct = ({ products }) => {
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const handleCategory = (cat) => {
    dispatch(filter_category({ products, category: cat }));
    setCategory(cat);
  };
  const clearFilter = () => {};
  return (
    <div>
      <div>
        {categories.map((cat, index) => {
          return (
            <button
              key={index}
              onClick={() => handleCategory(cat)}
              className={`${category}` === cat ? `${styles.btnCategory}` : null}
            >
              {cat}
            </button>
          );
        })}
        <button onClick={clearFilter}>Clear Filters</button>
      </div>
      <h3>Brand</h3>
      <h3>Price</h3>
    </div>
  );
};

export default FilterProduct;
