import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { setFirstNameForm, setLastNameForm, setPhoneForm, setIsEditPopup } from "../redux/editPopupComponentAction";
import Button from "../Button/Button";
import styles from "./EditPopup.module.css";
import { saveContactInfo } from "../redux/contactsAction";
import { editSelector } from "../redux/selectors";
import CustomInput from "../CustomInput/CustomInput";

const popUpParent = document.body;

function EditPopup({ id, setFirstNameForm, setLastNameForm, setPhoneForm, setIsEditPopup, saveContact, firstName, lastName, phone }) {
  const { value: firstNameForm, isOk: firstNameOk } = firstName;
  const { value: lastNameForm, isOk: lastNameOk } = lastName;
  const { value: phoneForm, isOk: phoneOk } = phone;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.heading}>{id ? "Change contact info" : "Add new contact"}</div>
      <CustomInput
        isError={firstNameOk ? "" : styles.firstNameError}
        value={firstNameForm}
        errorText="First name must contain from 1 to 10 characters"
        postfix="First name"
        changeFunction={setFirstNameForm}
      />
      <CustomInput
        isError={lastNameOk ? "" : styles.lastNameError}
        value={lastNameForm}
        errorText="Last name must contain from 1 to 20 characters"
        postfix="Last name"
        changeFunction={setLastNameForm}
      />
      <CustomInput
        isError={phoneOk ? "" : styles.phoneError}
        value={phoneForm}
        errorText="Phone number must contain 12 digits"
        prefix="+"
        postfix="Phone"
        changeFunction={setPhoneForm}
        isPhone={true}
      />
      <div className={styles.buttons}>
        <Button text={id ? "Save changes" : "Save new contact"} clickHandler={saveContact} />
        <Button text="Go back" clickHandler={setIsEditPopup} />
      </div>
    </div>,
    popUpParent
  );
}

const mapStateToProps = (state) => {
  const { firstName, lastName, phone, id } = editSelector(state);
  return { firstName, lastName, phone, id };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFirstNameForm: (text) => dispatch(setFirstNameForm(text)),
    setLastNameForm: (text) => dispatch(setLastNameForm(text)),
    setPhoneForm: (phone) => dispatch(setPhoneForm(phone)),
    setIsEditPopup: () => dispatch(setIsEditPopup(false)),
    saveContact: () => dispatch(saveContactInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPopup);
