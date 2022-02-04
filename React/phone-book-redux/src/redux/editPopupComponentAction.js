import mainAction from "./mainAction";
import { extractValue } from "../helpers";
import { FIRST_NAME, LAST_NAME, PHONE, EDIT_POPUP } from "./types";

export const setIsEditPopup = (value) => {
  return mainAction(EDIT_POPUP, value);
};

export const setFirstNameForm = (event, isEmptyId) => (dispatch) => {
  const text = extractValue(event);
  const checkResult = Boolean(text && text.length < 10);
  dispatch(mainAction(FIRST_NAME, { value: text, isOk: isEmptyId || checkResult }));
};

export const setLastNameForm = (event, isEmptyId) => (dispatch) => {
  const text = extractValue(event);
  const checkResult = Boolean(text && text.length < 20);
  dispatch(mainAction(LAST_NAME, { value: text, isOk: isEmptyId || checkResult }));
};

export const setPhoneForm = (event, isEmptyId) => (dispatch) => {
  const number = extractValue(event);
  const checkResult = Boolean(number && number.length === 12);
  dispatch(mainAction(PHONE, { value: number, isOk: isEmptyId || checkResult }));
};