import React from 'react'

import styles from "./ProductCard.module.css"

const ProductCard = ({product}) => {
  const {id, category, description, image, price, title} = product
  const shortenText = (text, n) => {
    if(text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText
    }
    return text
  }

  return (

    <section className={styles.card}>
      {shortenText(title, 22)}
      <div className={styles.img}>
      <img src={image} alt={title} width={100}/>
      </div>
      <div className={styles.content}>
      <p>{shortenText(description, 100)}
      </p>
      <p><b>${price}</b></p>
      
      
      <button className='btn'><p>Add To Cart</p></button>
      </div>
    </section>

  )
}

export default ProductCard