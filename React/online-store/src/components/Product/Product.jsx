import React from "react";
import styles from "./Product.module.css";

function Product({ screen, resolution, memory, cpu, img, name, price }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={img} alt={name} />
      </div>
      <div className={styles.text}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>
          <div>
            <span>Screen size:</span>
            <span>{screen}</span>
          </div>
          <div>
            <span>Screen resolution:</span>
            <span>{resolution}</span>
          </div>
          <div>
            <span>Memory size:</span>
            <span>{memory}</span>
          </div>
          <div>
            <span>CPU:</span>
            <span>{cpu}</span>
          </div>
        </div>
        <div className={styles.price}>{price} UAH</div>
      </div>
    </div>
  );
}

export default Product;
