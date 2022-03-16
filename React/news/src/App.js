import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { LangContext } from "./context";
import Filters from "./components/Filters/Filters";
import News from "./components/News/News";
import getLatestNews from "./requests";

const categories = ["business", "entertainment", "environment", "food", "health", "politics", "science", "sports", "technology", "top", "world"];
const languges = { en: "English", de: "Deutsch", es: "Español" };
const defaultFilters = { category: categories[0], keyword: null, page: 0 };

function App() {
  const [currentLang, setCurrentLang] = useState(Object.keys(languges)[0]);
  const [news, setNews] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  const getAndSetNews = () => {
    const { category, keyword, page } = filters;
    getLatestNews(currentLang, category, keyword, page).then(({ results }) => {
      setNews(
        page === 0
          ? results
          : (prevNews) => {
              return [...prevNews, ...results];
            }
      );
    });
  };

  const changeLang = useCallback((lang) => {
    setCurrentLang(lang);
    setFilters(defaultFilters);
  }, []);

  const setNextPage = useCallback(() => {
    setFilters((prevFilters) => {
      const { page } = prevFilters;
      return {
        ...prevFilters,
        page: page + 1,
      };
    });
  }, []);

  const setCurrentFilters = useCallback((category, keyword) => {
    setFilters({ category, keyword, page: 0 });
  }, []);

  useEffect(() => {
    getAndSetNews();
  }, [filters, currentLang]);

  const { category, keyword } = filters;
  return (
    <LangContext.Provider value={{ currentLang, changeLang }}>
      <div className={styles.wrapper}>
        <Header languges={languges} />
        <Filters category={category} keyword={keyword} setCurrentFilters={setCurrentFilters} categories={categories} />
        <News news={news} setNextPage={setNextPage} />
      </div>
    </LangContext.Provider>
  );
}

export default App;
