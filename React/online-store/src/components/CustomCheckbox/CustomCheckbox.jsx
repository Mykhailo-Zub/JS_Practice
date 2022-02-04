import React from "react";

function CustomCheckbox({ value, changeFunction, label, labelPostfix, handlerId, index }) {
  return (
    <>
      <label>
        <input type="checkbox" checked={value} onChange={(e) => changeFunction(handlerId, [index, e.target.checked])} />
        {label}
        {labelPostfix}
      </label>
    </>
  );
}

export default CustomCheckbox;
