import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter_category, filter_search} from "../../../redux/slice/filterSortSlice";
import { selectProducts } from "../../../redux/slice/productsSlice";
import Search from "../../search/Search";
import styles from "./FilterProduct.module.css";

const FilterProduct = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts)


  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const handleCategory = (cat) => {
    setCategory(cat);
    dispatch(filter_category({ products, category: cat }));
  };

  const clearFilter = () => {
    setCategory("All")
  };

  useEffect(() => {
    dispatch(filter_search({ products, search }));
    // console.log(products);

  }, [search, products, dispatch]); //products, dispatch

  return (
    <div>
         
      <div>
     <div className={styles.search}>
     <Search value={search} onChange={(e) => setSearch(e.target.value)} /> 
     </div>
        {categories.map((cat, index) => {
          return (
            <button
              key={index}
              onClick={() => handleCategory(cat)}
              className={`${category}` === cat ? `${styles.btnCategory} ${styles.btnCategoryClicked}` : ` ${styles.btnCategory}`}
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
