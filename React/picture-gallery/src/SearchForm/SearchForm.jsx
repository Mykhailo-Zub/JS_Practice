import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";

function SearchForm({ sendSearch }) {
  const [search, setSearch] = useState(null);

  const validSearch = search || "";
  const searchForSend = validSearch.toLowerCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      sendSearch(searchForSend);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchForSend, sendSearch]);

  return (
    <div className={styles.wrapper}>
      <input name="search" value={validSearch} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search images" />
    </div>
  );
}

export default SearchForm;
