import React from "react";

function CustomTextInput({ value, changeFunction, label }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input id={label} type="text" value={value || ""} onChange={changeFunction} />
    </>
  );
}

export default CustomTextInput;
