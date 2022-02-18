import React, { useCallback } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { useState } from "react";
import { LangContext } from "./context";
import Filters from "./components/Filters/Filters";
import News from "./components/News/News";
import getLatestNews from "./requests";
import translations from "./tranlations.json";

function App() {
  const [currentLang, setCurrentLang] = useState("English");
  const [news, setNews] = useState([]);
  const [page, setNextPage] = useState(0);

  const changeLang = useCallback(
    (lang) => {
      getLatestNews(translations[lang]["lang"], "business", null, null).then(({ results }) => {
        setNews(results);
        setCurrentLang(lang);
      });
    },
    [translations]
  );

  return (
    <LangContext.Provider value={{ currentLang, changeLang }}>
      <div className={styles.wrapper}>
        <Header />
        <Filters setNews={setNews} page={page} setNextPage={setNextPage} />
        <News news={news} setNextPage={setNextPage} />
      </div>
    </LangContext.Provider>
  );
}

export default App;
