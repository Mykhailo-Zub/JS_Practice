import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSelectedProduct } from "../../requests";
import styles from "./ProductFull.module.css";

function ProductFull() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSelectedProduct(id).then((product) => setProduct(product?.[0] || null));
  }, [id]);

  const { description, img, name, price, about } = product || {};
  const descriptionArr = description?.split("/") || [];
  const [screen, resolution, memory, cpu] = descriptionArr;
  return (
    <div className={styles.wrapper}>
      <div className={styles.backBtn} onClick={() => navigate(-1)}>
        {"<< Back"}
      </div>
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
      <div className={styles.about}>{about}</div>
    </div>
  );
}

export default ProductFull;
