import React from "react";
import styles from "./CustomInput.module.css";

function CustomInput({ isError, value, errorText, prefix, postfix, changeFunction, isPhone }) {
  return (
    <label className={isError}>
      <span>{errorText}</span>
      <div>{prefix}</div>
      <input className={isPhone ? styles.phone : ""} type="text" value={value || ""} onChange={(e) => changeFunction(e.target.value)} />
      <div>{postfix}</div>
    </label>
  );
}

export default CustomInput;
