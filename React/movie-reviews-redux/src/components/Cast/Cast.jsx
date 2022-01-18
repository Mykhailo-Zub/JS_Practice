import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getMovieCast } from "../../redux/moviesAction";
import Character from "../Character/Character";
import styles from "./Cast.module.css";
import { useDispatch, useSelector } from "react-redux";

function Cast() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { cast } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(getMovieCast(id));
  }, [dispatch, id]);

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
