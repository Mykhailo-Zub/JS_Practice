import React, { useMemo, useState, useContext, useEffect, useCallback } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./Filters.module.css";
import translations from "../../tranlations.json";
import { LangContext } from "../../context";
import getLatestNews from "../../requests";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

function Filters({ setNews, page, setNextPage }) {
  const { currentLang } = useContext(LangContext);
  const { lang, categories } = translations[currentLang];
  const [category, setCategory] = useState(categories[0]);
  const [search, setSearch] = useState(null);

  const getAndAddNews = (isNext, isCategory) => {
    const categoryIndex = translations[currentLang]["categories"].findIndex((el) => el === (isCategory ? isCategory : category));
    const searchingCategory = translations["English"]["categories"][categoryIndex] || "business";
    getLatestNews(lang, searchingCategory, search, isNext ? page : 0).then(({ results, nextPage }) => {
      setNews(
        isNext
          ? (prevNews) => {
              return [...prevNews, ...results];
            }
          : results
      );
    });
  };

  useEffect(() => {
    getAndAddNews(page > 0);
  }, [page]);

  useEffect(() => {
    setSearch(null);
  }, [currentLang]);

  const newSearch = (isCategory) => {
    if (page === 0) {
      getAndAddNews(false, isCategory);
    } else {
      setNextPage(0);
    }
  };

  const changeCategory = useCallback((value) => {
    setCategory(value);
    newSearch(value);
  }, []);

  const memoizedCategories = useMemo(() => categories, [currentLang]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CustomSelect value={category || ""} label={"category"} optionsArr={memoizedCategories} changeFunction={changeCategory} />
      </div>
      <div className={styles.searchContainer}>
        <label htmlFor="search">
          <WordsWrapper langKey={"search"} />
        </label>
        <div className={styles.inputWrapper}>
          <input id="search" type="text" value={search || ""} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={newSearch}>&#128269;</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
