import React from "react";
import styles from "./Character.module.scss";
import noImage from "../../img/no-image.jpg";

function Character({ name, character, photo }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.photo} ${photo ? "" : styles.noPhoto}`}>
        <img src={photo ? `https://image.tmdb.org/t/p/original${photo}` : noImage} alt="Poster" />
      </div>
      <div className={styles.name}>Name: {name}</div>
      <div className={styles.character}>Character: {character}</div>
    </div>
  );
}

export default Character;
