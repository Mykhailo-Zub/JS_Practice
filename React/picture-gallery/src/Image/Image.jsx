import React, { useEffect, useState } from "react";
import styles from "./Image.module.css";

function Image({ previewSource, fullSource, tags }) {
  const [isPopUp, setIsPopUp] = useState(false);

  useEffect(() => {
    const offset = window.innerWidth;
    const client = document.body.clientWidth;
    const margin = offset - client;
    document.body.style.overflow = isPopUp ? "hidden" : "auto";
    document.body.style.marginRight = isPopUp ? `${margin}px` : "0";
  }, [isPopUp]);

  const popUpHandler = () => {
    setIsPopUp((prevIsPopUp) => !prevIsPopUp);
  };

  return (
    <div className={`${styles.wrapper} ${isPopUp ? `${styles.popupActive}` : ""}`} onClick={popUpHandler}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={previewSource} alt={tags} />
      </div>
      <div className={styles.popup}>
        <img className={styles.image} src={fullSource} alt={tags} />
      </div>
    </div>
  );
}

export default Image;
