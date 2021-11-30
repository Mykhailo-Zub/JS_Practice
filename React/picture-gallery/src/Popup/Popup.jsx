import React from "react";
import styles from "./Popup.module.css";

function Popup({ fullSource, tags, popUpHandler }) {
  return (
    <div className={styles.wrapper} onClick={popUpHandler}>
      <div className={`${styles.popup} ${fullSource ? `${styles.popupActive}` : ""}`}>
        <img className={styles.image} src={fullSource} alt={tags} />
      </div>
    </div>
  );
}

export default Popup;
