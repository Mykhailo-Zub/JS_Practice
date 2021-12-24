import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSelectedProduct } from "../../requests";
import styles from "./ProductFull.module.css";

function ProductFull() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getSelectedProduct(id).then(setProduct);
  }, [id]);

  console.log(product);
  return <div className={styles.wrapper}>Full</div>;
}

export default ProductFull;
