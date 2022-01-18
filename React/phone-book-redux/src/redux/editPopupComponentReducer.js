import { FIRST_NAME, FIRST_NAME_OK, LAST_NAME, LAST_NAME_OK, PHONE, PHONE_OK, EDIT_POPUP } from "./types";

const initialState = {
  isEditPopup: false,
  firstNameForm: null,
  firstNameOk: true,
  lastNameForm: null,
  lastNameOk: true,
  phoneForm: null,
  phoneOk: true,
};

export const editPopupComponentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_POPUP:
      return {
        ...state,
        isEditPopup: action.payload,
      };
    case FIRST_NAME:
      return {
        ...state,
        firstNameForm: action.payload,
      };
    case FIRST_NAME_OK:
      return {
        ...state,
        firstNameOk: action.payload,
      };
    case LAST_NAME:
      return {
        ...state,
        lastNameForm: action.payload,
      };
    case LAST_NAME_OK:
      return {
        ...state,
        lastNameOk: action.payload,
      };
    case PHONE:
      return {
        ...state,
        phoneForm: action.payload,
      };
    case PHONE_OK:
      return {
        ...state,
        phoneOk: action.payload,
      };
    default:
      return state;
  }
};
