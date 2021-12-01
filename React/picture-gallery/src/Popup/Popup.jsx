import React, { useEffect } from "react";
import styles from "./Popup.module.css";

function Popup({ fullSource, popUpHandler }) {
  useEffect(() => {
    const offset = window.innerWidth;
    const client = document.body.clientWidth;
    const margin = offset - client;
    document.body.style.overflow = fullSource ? "hidden" : "auto";
    document.body.style.marginRight = fullSource ? `${margin}px` : "0";
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
