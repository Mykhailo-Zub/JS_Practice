import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { LangContext } from "./context";
import Filters from "./components/Filters/Filters";
import News from "./components/News/News";
import getLatestNews from "./requests";
import translations from "./tranlations.json";

const categories = ["business", "entertainment", "environment", "food", "health", "politics", "science", "sports", "technology", "top", "world"];
const languges = ["English", "Deutsch", "Español"];
const defaultFilters = { category: categories[0], keyword: null, page: 0 };

function App() {
  const [currentLang, setCurrentLang] = useState(languges[0]);
  const [news, setNews] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  const getAndSetNews = () => {
    const { category, keyword, page } = filters;
    getLatestNews(translations[currentLang]["lang"], category, keyword, page).then(({ results }) => {
      setNews(
        page === 0
          ? results
          : (prevNews) => {
              return [...prevNews, ...results];
            }
      );
    });
  };

  const changeLang = useCallback(
    (lang) => {
      setCurrentLang(lang);
      if (JSON.stringify(filters) === JSON.stringify(defaultFilters)) {
        getAndSetNews();
      } else setFilters(defaultFilters);
    },
    [filters]
  );

  const setNextPage = useCallback(() => {
    setFilters((prevFilters) => {
      const { page } = prevFilters;
      return {
        ...prevFilters,
        page: page + 1,
      };
    });
  }, []);

  useEffect(() => {
    getAndSetNews();
  }, [filters]);

  return (
    <LangContext.Provider value={{ currentLang, changeLang }}>
      <div className={styles.wrapper}>
        <Header languges={languges} />
        <Filters filters={filters} setFilters={setFilters} categories={categories} />
        <News news={news} setNextPage={setNextPage} />
      </div>
    </LangContext.Provider>
  );
}

export default App;
