import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { moviesReducer } from "./redux/moviesReducer";

const store = createStore(
  combineReducers({
    moviesReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
