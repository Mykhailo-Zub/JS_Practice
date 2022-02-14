import { createSelector } from "reselect";

const movies = (state) => state.moviesReducer.movies;

const movie = (state) => state.moviesReducer.movie;

const cast = (state) => state.moviesReducer.cast;

const reviews = (state) => state.moviesReducer.reviews;

export const getMoviesSelector = createSelector(movies, (movies) => movies);

export const getMovieSelector = createSelector(movie, (movie) => movie || {});

export const getCastSelector = createSelector(cast, (cast) => cast);

export const getReviewsSelector = createSelector(reviews, (reviews) => reviews);
