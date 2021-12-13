import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import styles from "./EditPopup.module.css";

const popUpParent = document.body;

function EditPopup({ contact, confirmHandler, closeHandler }) {
  const { firstName = null, lastName = null, phone = null, id } = contact || {};

  const [firstNameForm, setFirstNameForm] = useState(firstName);
  const [firstNameOk, setFirstNameOk] = useState(true);
  const [lastNameForm, setLastNameForm] = useState(lastName);
  const [lastNameOk, setLastNameOk] = useState(true);
  const [phoneForm, setPhoneForm] = useState(() => (phone ? phone.toString().slice(1) : phone));
  const [phoneOk, setPhoneOk] = useState(true);

  const checkFirstName = (firstName) => {
    const checkResult = Boolean(firstName && firstName.length < 10);
    setFirstNameOk(checkResult);
    return checkResult;
  };

  const checkLastName = (lastName) => {
    const checkResult = Boolean(lastName && lastName.length < 20);
    setLastNameOk(checkResult);
    return checkResult;
  };

  const checkPhone = (phone) => {
    const checkResult = Boolean(phone && phone.length === 12);
    setPhoneOk(checkResult);
    return checkResult;
  };

  const nameHandler = (e) => {
    const firstName = e.target.value;
    checkFirstName(firstName);
    setFirstNameForm(firstName);
  };

  const lastNameHandler = (e) => {
    const lastName = e.target.value;
    checkLastName(lastName);
    setLastNameForm(lastName);
  };

  const phoneHandler = (e) => {
    const phone = e.target.value;
    checkPhone(phone);
    setPhoneForm(phone);
  };

  const checkAllFields = (firstName, lastName, phone) => {
    const firstNameField = checkFirstName(firstName);
    const lastNameField = checkLastName(lastName);
    const phoneField = checkPhone(phone);
    return firstNameField && lastNameField && phoneField;
  };

  const saveContact = () => {
    if (checkAllFields(firstNameForm, lastNameForm, phoneForm)) {
      const contact = { firstName: firstNameForm, lastName: lastNameForm, phone: "+" + phoneForm };
      confirmHandler(contact);
    }
  };

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
