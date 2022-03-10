import React from "react";
import NewsElement from "../NewsElement/NewsElement";
import WordsWrapper from "../WordsWrapper/WordsWrapper";
import styles from "./News.module.css";

function News({ news, setNextPage }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.news}>
        {news?.map((el, i) => {
          const { description, image_url, keywords, link, pubDate, title, source_id } = el;
          return (
            <NewsElement
              key={i}
              description={description}
              image_url={image_url}
              keywords={keywords}
              link={link}
              pubDate={pubDate}
              title={title}
              source_id={source_id}
            />
          );
        })}
      </div>
      {news?.length ? (
        <button onClick={setNextPage}>
          <WordsWrapper langKey={"loadMore"} />
        </button>
      ) : null}
    </div>
  );
}

export default News;
