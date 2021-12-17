import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getMovieCast } from "../../requests";
import Character from "../Character/Character";
import styles from "./Cast.module.css";

function Cast() {
  const [cast, setCast] = useState(null);
  const { id: currentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieCast(currentId).then(setCast);
  }, [currentId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        {"<<"} Back
      </div>
      <div className={styles.characters}>
        {cast?.map((el) => {
          const { name, character, profile_path } = el;
          return <Character name={name} character={character} photo={profile_path} key={name} />;
        })}
      </div>
    </div>
  );
}

export default Cast;
