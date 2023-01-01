import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { add_to_cart, total_quantity } from '../../../redux/slice/cartSlice'
import styles from "./ProductCard.module.css"

const ProductCard = ({product, grid, id, category, description, image, price, title, rating}) => {

  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if(text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  }
  
  // const addToCart = (product) => {
  //   dispatch(add_to_cart(product))
  //   dispatch(total_quantity())
  // }

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
      
      <button className='btn' ><p>Add To Cart</p></button>
      </div>
    </section>

  )
}

export default ProductCard