import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./EditPopup.module.css";

function EditPopup({ contact, confirmHandler, closeHandler }) {
  const { firstName = null, lastName = null, phone = null, id } = contact || {};
  const fixedPhone = phone ? phone.toString().slice(1) : phone;

  const [firstNameForm, setFirstNameForm] = useState(firstName);
  const [firstNameOk, setFirstNameOk] = useState(true);
  const [lastNameForm, setLastNameForm] = useState(lastName);
  const [lastNameOk, setLastNameOk] = useState(true);
  const [phoneForm, setPhoneForm] = useState(fixedPhone);
  const [phoneOk, setPhoneOk] = useState(true);

  const nameHandler = (e) => {
    const firstName = e.target.value;
    if (firstName.length > 10) {
      setFirstNameOk(false);
    } else setFirstNameOk(true);
    setFirstNameForm(e.target.value);
  };

  const lastNameHandler = (e) => {
    const lastName = e.target.value;
    if (lastName.length > 20) {
      setLastNameOk(false);
    } else setLastNameOk(true);
    setLastNameForm(e.target.value);
  };

  const phoneHandler = (e) => {
    const phone = e.target.value;
    if (phone.length !== 12) {
      setPhoneOk(false);
    } else setPhoneOk(true);
    setPhoneForm(e.target.value);
  };

  const saveContact = () => {
    if (firstNameForm && lastNameForm && phoneForm && firstNameOk && lastNameOk && phoneOk) {
      const contact = { firstName: firstNameForm, lastName: lastNameForm, phone: "+" + phoneForm };
      confirmHandler(contact);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{id ? "Change contact info" : "Add new contact"}</div>
      <label className={firstNameOk ? "" : styles.firstNameError}>
        <span>First name must be no more than 10 characters</span>
        <input type="text" value={firstNameForm || ""} onChange={nameHandler} />
        <div>First name</div>
      </label>
      <label className={lastNameOk ? "" : styles.lastNameError}>
        <span>Last name must be no more than 20 characters</span>
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
    </div>
  );
}

export default EditPopup;
