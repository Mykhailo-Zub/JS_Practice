import React from "react";

function CustomSelect({ value, changeFunction, label, optionsArr, defaultValue, optionPostfix }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <select id={label} value={value} onChange={changeFunction}>
        <option value={defaultValue}>{defaultValue}</option>
        {optionsArr?.map((el, i) => (
          <option value={el} key={i}>
            {el}
            {optionPostfix}
          </option>
        ))}
      </select>
    </>
  );
}

export default CustomSelect;
