import React from "react";

function CustomCheckbox({ value, changeFunction, label, labelPostfix }) {
  return (
    <>
      <label>
        <input type="checkbox" checked={value} onChange={(e) => changeFunction(label, e.target.checked)} />
        {label}
        {labelPostfix}
      </label>
    </>
  );
}

export default CustomCheckbox;
