import React from "react";

function CustomCheckbox({ value, changeFunction, label, labelPostfix, index }) {
  return (
    <>
      <label>
        <input type="checkbox" checked={value} onChange={(e) => changeFunction([index, e.target.checked])} />
        {label}
        {labelPostfix}
      </label>
    </>
  );
}

export default CustomCheckbox;
