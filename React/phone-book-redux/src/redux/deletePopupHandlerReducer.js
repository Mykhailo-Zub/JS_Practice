import { DELETE_POPUP } from "./types";

export const deletePopupHandlerReducer = (state = false, action) => {
  switch (action.type) {
    case DELETE_POPUP:
      return {
        isDeletePopup: action.payload,
      };
    default:
      return state;
  }
};
