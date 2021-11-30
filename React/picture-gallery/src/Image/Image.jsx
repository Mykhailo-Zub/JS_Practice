import React from "react";
import styles from "./Image.module.css";

function Image({ previewSource, tags, popUpHandler }) {
  return (
    <div className={styles.imageWrapper} onClick={popUpHandler}>
      <img className={styles.image} src={previewSource} alt={tags} />
    </div>
  );
}

export default Image;
