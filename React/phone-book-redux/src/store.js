import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { contactsReducer } from "./redux/contactsReducer";
import { deletePopupHandlerReducer } from "./redux/deletePopupHandlerReducer";
import { editPopupComponentReducer } from "./redux/editPopupComponentReducer";

const store = createStore(
  combineReducers({
    contactsReducer,
    deletePopupHandlerReducer,
    editPopupComponentReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
