import { deleteSelectedContact, getAllContacts, saveContact } from "../requests";
import { setIsDeletePopup } from "./deletePopupHandlerAction";
import { setFirstNameForm, setIsEditPopup, setLastNameForm, setPhoneForm } from "./editPopupComponentAction";
import mainAction from "./mainAction";
import { GET_ALL, FOCUS_CONTACT_ID } from "./types";
import { firstNameSelector, focusContactId, lastNameSelector, phoneSelector, focusContact } from "./selectors";

export const getContactsToStore = () => (dispatch) => getAllContacts().then((data) => dispatch(mainAction(GET_ALL, data)));

export const setFocusContactId = (id) => (dispatch, getState) => {
  const isEmptyId = !id;
  dispatch(mainAction(FOCUS_CONTACT_ID, id));
  const { firstName, lastName, phone } = focusContact(getState());
  dispatch(setFirstNameForm(firstName, isEmptyId));
  dispatch(setLastNameForm(lastName, isEmptyId));
  dispatch(setPhoneForm(phone ? phone.toString().slice(1) : phone, isEmptyId));
};

export const saveContactInfo = () => (dispatch, getState) => {
  const state = getState();
  const { value: firstName, isOk: firstNameOk } = firstNameSelector(state);
  const { value: lastName, isOk: lastNameOk } = lastNameSelector(state);
  const { value: phone, isOk: phoneOk } = phoneSelector(state);
  const id = focusContactId(state);
  if (firstName && firstNameOk && lastName && lastNameOk && phone && phoneOk) {
    const contact = { firstName, lastName, phone: "+" + phone };
    saveContact(contact, id).then(() => {
      dispatch(setFocusContactId(null));
      dispatch(setIsEditPopup(false));
      dispatch(getContactsToStore());
    });
  }
};

export const deleteContact = () => (dispatch, getState) => {
  const id = focusContactId(getState());
  deleteSelectedContact(id).then(() => {
    dispatch(setFocusContactId(null));
    dispatch(setIsDeletePopup(false));
    dispatch(getContactsToStore());
  });
};