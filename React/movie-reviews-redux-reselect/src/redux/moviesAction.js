import { getMovieWithId, getTrandingMovies, getMovieCastWithId, getMovieReviewsWithId } from "../requests";
import mainAction from "./mainAction";
import { GET_ALL, GET_ONE, GET_CAST, GET_REVIEWS } from "./types";

const getOne = (movie) => {
  return mainAction(GET_ONE, movie);
};

const getCast = (cast) => {
  return mainAction(GET_CAST, cast);
};

const getReviews = (reviews) => {
  return mainAction(GET_REVIEWS, reviews);
};

export const getTrandingToStore = () => (dispatch) => getTrandingMovies().then((data) => dispatch(mainAction(GET_ALL, data)));

export const getMovieInfo = (id) => (dispatch) => getMovieWithId(id).then((data) => dispatch(getOne(data)));

export const getMovieCast = (id) => (dispatch) => getMovieCastWithId(id).then((data) => dispatch(getCast(data)));

export const getMovieReviews = (id) => (dispatch) => getMovieReviewsWithId(id).then((data) => dispatch(getReviews(data)));

export const clearMovieData = () => (dispatch) => {
  dispatch(getOne(null));
  dispatch(getCast(null));
  dispatch(getReviews(null));
};
