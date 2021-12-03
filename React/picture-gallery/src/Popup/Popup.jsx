import React, { useEffect } from "react";
import styles from "./Popup.module.css";

function Popup({ fullSource, popUpHandler }) {
  useEffect(() => {
    if (fullSource) {
      const offset = window.innerWidth;
      const client = document.body.clientWidth;
      const margin = offset - client;
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${margin}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0";
    }
  }, [fullSource]);

  return (
    <div className={styles.wrapper} onClick={popUpHandler}>
      <div className={`${styles.popup} ${fullSource ? `${styles.popupActive}` : ""}`}>
        <img className={styles.image} src={fullSource} alt="popup" />
      </div>
    </div>
  );
}

export default Popup;
