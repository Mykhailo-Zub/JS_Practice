import React from "react";
import WordsWrapper from "../WordsWrapper/WordsWrapper";
import translations from "../../tranlations.json";

function LangSelect({ value, changeFunction, label, optionsArr }) {
  return (
    <>
      <label htmlFor={label}>
        <WordsWrapper langKey={label} />
      </label>
      <select id={label} value={value} onChange={(e) => changeFunction(e.target.value)}>
        {optionsArr?.map((el, i) => (
          <option value={el} key={i}>
            {translations[el]["lang"]}
          </option>
        ))}
      </select>
    </>
  );
}

export default LangSelect;
