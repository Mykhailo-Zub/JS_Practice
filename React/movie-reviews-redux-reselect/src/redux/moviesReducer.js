import { GET_ALL, GET_ONE, GET_CAST, GET_REVIEWS } from "./types";

const initialState = {
  movies: [],
  movie: null,
  cast: null,
  reviews: null,
};

export const moviesReducer = (state = [initialState], action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        movies: action.payload,
      };
    case GET_ONE:
      return {
        ...state,
        movie: action.payload,
      };
    case GET_CAST:
      return {
        ...state,
        cast: action.payload,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};
