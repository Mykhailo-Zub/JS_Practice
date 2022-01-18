import mainAction from "./mainAction";
import { FIRST_NAME, FIRST_NAME_OK, LAST_NAME, LAST_NAME_OK, PHONE, PHONE_OK, EDIT_POPUP } from "./types";

export const setIsEditPopup = (isPopup) => {
  return mainAction(EDIT_POPUP, isPopup);
};

export const setFirstNameForm = (text) => {
  return mainAction(FIRST_NAME, text);
};

export const setFirstNameOk = (isOk) => {
  return mainAction(FIRST_NAME_OK, isOk);
};

export const setLastNameForm = (text) => {
  return mainAction(LAST_NAME, text);
};

export const setLastNameOk = (isOk) => {
  return mainAction(LAST_NAME_OK, isOk);
};

export const setPhoneForm = (number) => {
  return mainAction(PHONE, number);
};

export const setPhoneOk = (isOk) => {
  return mainAction(PHONE_OK, isOk);
};
