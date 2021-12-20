import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMovieCast } from "../../requests";
import Character from "../Character/Character";
import styles from "./Cast.module.css";

function Cast() {
  const [cast, setCast] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getMovieCast(id).then(setCast);
  }, [id]);

  return (
    <>
      <div className={styles.characters}>
        {cast?.map((el) => {
          const { name, character, profile_path } = el;
          return <Character name={name} character={character} photo={profile_path} key={name} />;
        })}
      </div>
    </>
  );
}

export default Cast;
