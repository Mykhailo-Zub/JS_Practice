import React, { useContext } from "react";
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
        <select value={currentLang} onChange={(e) => changeLang(e.target.value)}>
          {Object.entries(languges).map((el, i) => {
            const [short, long] = el;
            return (
              <option value={short} key={i}>
                {long}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Header;
