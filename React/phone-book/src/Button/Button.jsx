import React from "react";
import styles from "./Button.module.css";

function Button({ text, isRed, clickHandler, additionalClass }) {
  return (
    <div className={`${styles.wrapper} ${additionalClass} ${isRed ? styles.red : ""}`} onClick={clickHandler}>
      {text}
    </div>
  );
}

export default Button;
