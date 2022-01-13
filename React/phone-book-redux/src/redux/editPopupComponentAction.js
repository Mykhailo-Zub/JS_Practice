import { FIRST_NAME, FIRST_NAME_OK, LAST_NAME, LAST_NAME_OK, PHONE, PHONE_OK } from "./types";

export const setFirstNameForm = (text) => {
  return {
    type: FIRST_NAME,
    payload: text,
  };
};

export const setFirstNameOk = (isOk) => {
  return {
    type: FIRST_NAME_OK,
    payload: isOk,
  };
};

export const setLastNameForm = (text) => {
  return {
    type: LAST_NAME,
    payload: text,
  };
};

export const setLastNameOk = (isOk) => {
  return {
    type: LAST_NAME_OK,
    payload: isOk,
  };
};

export const setPhoneForm = (number) => {
  return {
    type: PHONE,
    payload: number,
  };
};

export const setPhoneOk = (isOk) => {
  return {
    type: PHONE_OK,
    payload: isOk,
  };
};
