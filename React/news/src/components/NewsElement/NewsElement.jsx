import React, { useMemo } from "react";
import styles from "./NewsElement.module.css";
import noImage from "../../img/no-image.jpg";
import WordsWrapper from "../WordsWrapper/WordsWrapper";

function NewsElement({ description, image_url, keywords, link, pubDate, title, source_id }) {
  const setToSearch = (text) => {
    document.querySelector("#search").value = text;
  };

  const keywordsWithoutDuplicates = useMemo(
    () =>
      keywords?.length
        ? Array.from(
            new Set(
              keywords.map((el) => {
                return el[0] === "/" ? el.slice(1).toLowerCase() : el.toLowerCase();
              })
            )
          )
        : [],
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={image_url ? image_url : noImage} alt="NewsPoster" />
      </div>
      <div className={styles.text}>
        <a className={styles.heading} href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <div className={styles.row}>
          <div className={styles.source}>
            <WordsWrapper langKey={"source"} />: {source_id}
          </div>
          <div className={styles.date}>
            <WordsWrapper langKey={"published"} />: {pubDate}
          </div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.keywords}>
          {keywordsWithoutDuplicates?.map((el, i) => {
            return (
              <div className={styles.keyword} key={i} onClick={() => setToSearch(el)}>
                #{el}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewsElement;
