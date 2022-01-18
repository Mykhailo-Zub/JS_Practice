import mainAction from "./mainAction";
import { DELETE_POPUP } from "./types";

export const setIsDeletePopup = (isPopup) => {
  return mainAction(DELETE_POPUP, isPopup);
};
