import React from 'react'
import ProductCard from '../productCard/ProductCard'
import styles from "./ProductList.module.css"

const ProductList = ({products}) => {
  
  return (
    <div>
      <h3>Search</h3>
      <h4>Sort by:</h4>
      <select>
        <option>Test</option>
        <option>Test</option>
        <option>Test</option>
      </select>
      <div className={styles.cards}>
        {products.length === 0 ? (
          <p>No products found...</p>
         
        ) : (
          <>
          {products.map(product => {
            return (
              <div key={product.id}>
                <ProductCard product={product}/>
              </div>
            )
          })}
          </>
        )}
      </div>
    </div>
  )
}

export default ProductList