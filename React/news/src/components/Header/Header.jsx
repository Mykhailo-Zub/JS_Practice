import React, { useContext } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./Header.module.css";
import { LangContext } from "../../context";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

function Header({ languges }) {
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
