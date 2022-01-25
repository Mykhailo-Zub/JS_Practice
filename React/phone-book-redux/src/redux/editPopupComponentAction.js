import mainAction from "./mainAction";
import { FIRST_NAME, FIRST_NAME_OK, LAST_NAME, LAST_NAME_OK, PHONE, PHONE_OK, EDIT_POPUP } from "./types";

export const setIsEditPopup = (isPopup) => {
  return mainAction(EDIT_POPUP, isPopup);
};

const setFirstName = (text) => {
  return mainAction(FIRST_NAME, text);
};

export const setFirstNameOk = (isOk) => {
  return mainAction(FIRST_NAME_OK, isOk);
};

const setLastName = (text) => {
  return mainAction(LAST_NAME, text);
};

export const setLastNameOk = (isOk) => {
  return mainAction(LAST_NAME_OK, isOk);
};

const setPhone = (number) => {
  return mainAction(PHONE, number);
};

export const setPhoneOk = (isOk) => {
  return mainAction(PHONE_OK, isOk);
};

export const setFirstNameForm = (text) => (dispatch) => {
  const checkResult = Boolean(text && text.length < 10);
  dispatch(setFirstName(text));
  dispatch(setFirstNameOk(checkResult));
};

export const setLastNameForm = (text) => (dispatch) => {
  const checkResult = Boolean(text && text.length < 20);
  dispatch(setLastName(text));
  dispatch(setLastNameOk(checkResult));
};

export const setPhoneForm = (number) => (dispatch) => {
  const checkResult = Boolean(number && number.length === 12);
  dispatch(setPhone(number));
  dispatch(setPhoneOk(checkResult));
};