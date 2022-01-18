import axios from "axios";

const TRENDING = "trending/movie/week";
const FIND = "/movie/";
const CAST = "/credits";
const REVIEWS = "/reviews";

const customRequest = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDE4ZWIwZWRkNTI0MzJhZWNhYmVlMTE3YmY1YzYzYyIsInN1YiI6IjYxYjIxODEzNTgwMGM0MDA1ZjBkMDkyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8jECB9f90mZZkDxemZMsMeE1PzWU4KB1Boc_Mt2ntW4",
  },
});

export function getTrandingMovies() {
  return customRequest.get(TRENDING).then((res) => res.data.results);
}

export function getMovieWithId(id) {
  return customRequest.get(FIND + id).then((res) => res.data);
}

export function getMovieCastWithId(id) {
  return customRequest.get(FIND + id + CAST).then((res) => res.data.cast);
}

export function getMovieReviewsWithId(id) {
  return customRequest.get(FIND + id + REVIEWS).then((res) => res.data.results);
}
