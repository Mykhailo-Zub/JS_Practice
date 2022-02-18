import React, { useContext } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./Header.module.css";
import translations from "../../tranlations.json";
import { LangContext } from "../../context";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

const languges = [];
for (let language in translations) {
  languges.push(language);
}

function Header() {
  const { currentLang, changeLang } = useContext(LangContext);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>
        <WordsWrapper langKey="heading" />
      </h1>
      <div className={styles.languageContainer}>
        <CustomSelect value={currentLang} optionsArr={languges} changeFunction={changeLang} />
      </div>
    </div>
  );
}

export default Header;
