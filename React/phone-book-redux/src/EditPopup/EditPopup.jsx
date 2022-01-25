import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { setFirstNameForm, setLastNameForm, setPhoneForm, setIsEditPopup } from "../redux/editPopupComponentAction";
import Button from "../Button/Button";
import styles from "./EditPopup.module.css";
import { saveContactInfo } from "../redux/contactsAction";

const popUpParent = document.body;

function EditPopup({
  id,
  setFirstNameForm,
  setLastNameForm,
  setPhoneForm,
  setIsEditPopup,
  saveContact,
  firstNameForm,
  firstNameOk,
  lastNameForm,
  lastNameOk,
  phoneForm,
  phoneOk,
}) {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.heading}>{id ? "Change contact info" : "Add new contact"}</div>
      <label className={firstNameOk ? "" : styles.firstNameError}>
        <span>First name must contain from 1 to 10 characters</span>
        <input type="text" value={firstNameForm} onChange={(e) => setFirstNameForm(e.target.value)} />
        <div>First name</div>
      </label>
      <label className={lastNameOk ? "" : styles.lastNameError}>
        <span>Last name must contain from 1 to 20 characters</span>
        <input type="text" value={lastNameForm} onChange={(e) => setLastNameForm(e.target.value)} />
        <div>Last name</div>
      </label>
      <label className={phoneOk ? "" : styles.phoneError}>
        <span>Phone number must contain 12 digits</span>
        <div>+</div>
        <input className={styles.phone} type="text" value={phoneForm} onChange={(e) => setPhoneForm(e.target.value)} />
        <div>Phone</div>
      </label>
      <div className={styles.buttons}>
        <Button text={id ? "Save changes" : "Save new contact"} clickHandler={saveContact} />
        <Button text="Go back" clickHandler={setIsEditPopup} />
      </div>
    </div>,
    popUpParent
  );
}

const mapStateToProps = (state) => {
  const id = state.contactsReducer.focusContactId;
  return {
    firstNameForm: state.editPopupComponentReducer.firstNameForm || "",
    lastNameForm: state.editPopupComponentReducer.lastNameForm || "",
    phoneForm: state.editPopupComponentReducer.phoneForm || "",
    firstNameOk: state.editPopupComponentReducer.firstNameOk,
    lastNameOk: state.editPopupComponentReducer.lastNameOk,
    phoneOk: state.editPopupComponentReducer.phoneOk,
    id,
  };
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
