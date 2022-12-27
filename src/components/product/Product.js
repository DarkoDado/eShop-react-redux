import React, { useEffect, useState } from 'react'
import styles from "./Product.module.css"
import FilterProduct from './filterProduct/FilterProduct'
import ProductList from './productList/ProductList'
import spinner from '../../assets/spinner.gif'

const Product = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const fetchingProducts = () => { 
       fetch("https://fakestoreapi.com/products")
            .then(res=>res.json())
            .then((data) => { 
                setProducts(data)
                setIsLoading(false)
                console.log(data)
                // ''
                
            })
.catch(() => {
    setIsLoading(false)
    //error message
})
}


    useEffect(() => {
        fetchingProducts()
    },[])

  return (
    <>
    <div className={`container ${styles.product}`}>
        <aside>
        {isLoading ? null : <FilterProduct />}
        
        </aside>
        <main className={styles.main}>
            {isLoading ? (
                <img src={spinner}
                alt="Loading" 
                style={{ width: "50px" }}
                />
            ) : 
            (
                <ProductList products={products}/>
            )}
        </main>
    </div>
    </>
  )

}

export default Product