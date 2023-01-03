import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { add_to_cart, selectCartItems, total_quantity } from '../../../redux/slice/cartSlice'
import styles from "./ProductCard.module.css"

const ProductCard = ({product, grid, id, category, description, image, price, title, rating}) => {
  const cartItems = useSelector(selectCartItems)
  

  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if(text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  }
  const alreadyInCart = cartItems.find(product => product.id === id)
  
  const addToCart = (product) => {
    dispatch(add_to_cart(product))
    dispatch(total_quantity())
  }

  return (

    <section className={grid ? `${styles.card2}` : `${styles.card}`}>
      
      <Link to={`/details/${id}`}>
      <h4>{shortenText(title, 22)}</h4>
      <div className={styles.img}>
        
      <img src={image} alt={title} width={100}/>
      </div>
      </Link>
      <div className={styles.content}>
      <p>{grid ? shortenText(description, 150) : shortenText(description, 90)}
      </p>
      <p><b>${price}</b></p>
      {alreadyInCart ? (
        <>
        <button className={`btn ${styles.disabled}`}><p>Already in Cart</p></button>
        </> 
        ) : (
        <button className='btn' onClick={() => addToCart(product)}><p>Add To Cart</p></button>
      )}
      
      </div>
    </section>

  )
}

export default ProductCard