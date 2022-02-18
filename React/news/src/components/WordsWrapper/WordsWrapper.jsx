import React, { useContext } from "react";
import { LangContext } from "../../context";
import translations from "../../tranlations.json";

function WordsWrapper({ langKey }) {
  const { currentLang } = useContext(LangContext);
  const value = translations[currentLang][langKey];
  return <>{value}</>;
}

export default WordsWrapper;
