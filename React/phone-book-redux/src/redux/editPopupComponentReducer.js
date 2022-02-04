import { FIRST_NAME, LAST_NAME, PHONE, EDIT_POPUP } from "./types";

const initialState = {
  isEditPopup: false,
  firstNameForm: { value: null, isOk: true },
  lastNameForm: { value: null, isOk: true },
  phoneForm: { value: null, isOk: true },
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
    case LAST_NAME:
      return {
        ...state,
        lastNameForm: action.payload,
      };
    case PHONE:
      return {
        ...state,
        phoneForm: action.payload,
      };
    default:
      return state;
  }
};
