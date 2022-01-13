import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { contactsReducer } from "./redux/contactsReducer";
import { mainComponentReducer } from "./redux/mainComponentReducer";
import { editPopupComponentReducer } from "./redux/editPopupComponentReducer";

const store = createStore(
  combineReducers({
    contactsReducer,
    mainComponentReducer,
    editPopupComponentReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
