import { deleteSelectedContact, getAllContacts, saveContact } from "../requests";
import { setIsDeletePopup } from "./deletePopupHandlerAction";
import { setFirstNameForm, setIsEditPopup, setLastNameForm, setPhoneForm } from "./editPopupComponentAction";
import mainAction from "./mainAction";
import { GET_ALL, FOCUS_CONTACT_ID } from "./types";
import { editSelector, focusContact } from "./selectors";

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
  const {
    firstName: { value: firstName, isOk: firstNameOk },
    lastName: { value: lastName, isOk: lastNameOk },
    phone: { value: phone, isOk: phoneOk },
    id,
  } = editSelector(state);
  if (firstName && firstNameOk && lastName && lastNameOk && phone && phoneOk) {
    // касательно замечания: не достаточно, т.к. пока пользователь ничего не вводил, поля помечены валидными
    const contact = { firstName, lastName, phone: "+" + phone };
    saveContact(contact, id).then(() => {
      dispatch(setFocusContactId(null));
      dispatch(setIsEditPopup(false));
      dispatch(getContactsToStore());
    });
  }
};

export const deleteContact = () => (dispatch, getState) => {
  const { id } = editSelector(getState());
  deleteSelectedContact(id).then(() => {
    dispatch(setFocusContactId(null));
    dispatch(setIsDeletePopup(false));
    dispatch(getContactsToStore());
  });
};