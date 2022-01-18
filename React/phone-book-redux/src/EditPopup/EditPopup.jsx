import React, { useCallback, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFirstNameForm,
  setFirstNameOk,
  setLastNameForm,
  setLastNameOk,
  setPhoneForm,
  setPhoneOk,
  setIsEditPopup,
} from "../redux/editPopupComponentAction";
import Button from "../Button/Button";
import styles from "./EditPopup.module.css";
import { saveContactInfo, setFocusContactId } from "../redux/contactsAction";

const popUpParent = document.body;

function EditPopup() {
  const dispatch = useDispatch();

  const { contacts, focusContactId } = useSelector((store) => store.contactsReducer);

  const contact = useMemo(() => {
    return contacts.find((el) => el.id === focusContactId);
  }, [contacts, focusContactId]);

  const { firstName = null, lastName = null, phone = null, id } = contact || {};

  useEffect(() => {
    dispatch(setFirstNameForm(firstName));
    dispatch(setLastNameForm(lastName));
    dispatch(setPhoneForm(phone ? phone.toString().slice(1) : phone));
  }, [dispatch, firstName, lastName, phone]);

  const { firstNameForm, firstNameOk, lastNameForm, lastNameOk, phoneForm, phoneOk } = useSelector((store) => store.editPopupComponentReducer);

  const checkFirstName = (firstName) => {
    const checkResult = Boolean(firstName && firstName.length < 10);
    dispatch(setFirstNameOk(checkResult));
    return checkResult;
  };

  const checkLastName = (lastName) => {
    const checkResult = Boolean(lastName && lastName.length < 20);
    dispatch(setLastNameOk(checkResult));
    return checkResult;
  };

  const checkPhone = (phone) => {
    const checkResult = Boolean(phone && phone.length === 12);
    dispatch(setPhoneOk(checkResult));
    return checkResult;
  };
  const nameHandler = (e) => {
    const firstName = e.target.value;
    checkFirstName(firstName);
    dispatch(setFirstNameForm(firstName));
  };

  const lastNameHandler = (e) => {
    const lastName = e.target.value;
    checkLastName(lastName);
    dispatch(setLastNameForm(lastName));
  };

  const phoneHandler = (e) => {
    const phone = e.target.value;
    checkPhone(phone);
    dispatch(setPhoneForm(phone));
  };

  const closeHandler = useCallback(() => {
    dispatch(setIsEditPopup(false));
  }, [dispatch]);

  const checkAllFields = (firstName, lastName, phone) => {
    const firstNameField = checkFirstName(firstName);
    const lastNameField = checkLastName(lastName);
    const phoneField = checkPhone(phone);
    return firstNameField && lastNameField && phoneField;
  };

  const saveContact = useCallback(() => {
    if (checkAllFields(firstNameForm, lastNameForm, phoneForm)) {
      const contact = { firstName: firstNameForm, lastName: lastNameForm, phone: "+" + phoneForm };
      dispatch(saveContactInfo(contact, focusContactId));
      dispatch(setFocusContactId(null));
      closeHandler();
    }
  }, [firstNameForm, lastNameForm, phoneForm, focusContactId, dispatch]);

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.heading}>{id ? "Change contact info" : "Add new contact"}</div>
      <label className={firstNameOk ? "" : styles.firstNameError}>
        <span>First name must contain from 1 to 10 characters</span>
        <input type="text" value={firstNameForm || ""} onChange={nameHandler} />
        <div>First name</div>
      </label>
      <label className={lastNameOk ? "" : styles.lastNameError}>
        <span>Last name must contain from 1 to 20 characters</span>
        <input type="text" value={lastNameForm || ""} onChange={lastNameHandler} />
        <div>Last name</div>
      </label>
      <label className={phoneOk ? "" : styles.phoneError}>
        <span>Phone number must contain 12 digits</span>
        <div>+</div>
        <input className={styles.phone} type="text" value={phoneForm || ""} onChange={phoneHandler} />
        <div>Phone</div>
      </label>
      <div className={styles.buttons}>
        <Button text={id ? "Save changes" : "Save new contact"} clickHandler={saveContact} />
        <Button text="Go back" clickHandler={closeHandler} />
      </div>
    </div>,
    popUpParent
  );
}

export default EditPopup;
