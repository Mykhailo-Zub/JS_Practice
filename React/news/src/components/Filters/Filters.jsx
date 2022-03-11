import React, { useMemo, useState, useContext, useEffect, useCallback } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./Filters.module.css";
import translations from "../../tranlations.json";
import { LangContext } from "../../context";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

function Filters({ category, keyword, setCurrentFilters, categories }) {
  const { currentLang } = useContext(LangContext);
  const [filterCategory, setFilterCategory] = useState(category);
  const [search, setSearch] = useState(keyword);

  const changeCategory = useCallback((value) => {
    setFilterCategory(value);
  }, []);

  const newSearch = () => {
    setCurrentFilters(filterCategory, search);
  };

  useEffect(() => {
    setFilterCategory(category);
    setSearch(keyword);
  }, [category, keyword]);

  const memoizedCategories = useMemo(() => categories.map((el) => translations[currentLang][el]), [categories, currentLang]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputsWrapper}>
        <div className={styles.categoryContainer}>
          <CustomSelect value={filterCategory || ""} label={"category"} optionsArr={memoizedCategories} changeFunction={changeCategory} />
        </div>
        <div className={styles.searchContainer}>
          <label htmlFor="search">
            <WordsWrapper langKey={"keyword"} />
          </label>
          <div className={styles.search}>
            <input id="search" type="text" value={search || ""} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>
      <button className={styles.searchButton} onClick={newSearch}>
        <WordsWrapper langKey={"search"} />
      </button>
    </div>
  );
}

export default Filters;
