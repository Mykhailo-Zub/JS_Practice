import React from "react";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

function CustomSelect({ value, changeFunction, label, optionsArr }) {
  return (
    <>
      <label htmlFor={label}>
        <WordsWrapper langKey={label} />
      </label>
      <select id={label} value={value} onChange={(e) => changeFunction(e.target.value)}>
        {optionsArr?.map((el, i) => (
          <option value={el} key={i}>
            {el}
          </option>
        ))}
      </select>
    </>
  );
}

export default CustomSelect;
