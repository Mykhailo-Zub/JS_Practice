import React from "react";
import { connect } from "react-redux";
import { setIsDeletePopup } from "../redux/deletePopupHandlerAction";
import { setFocusContactId } from "../redux/contactsAction";
import Button from "../Button/Button";
import styles from "./FullContact.module.css";
import contactImg from "../img/contact-photo.png";
import backImg from "../img/back.png";
import { setIsEditPopup } from "../redux/editPopupComponentAction";
import { focusContact } from "../redux/selectors";

function FullContact({ firstName, lastName, phone, setIsEditPopup, setIsDeletePopup, setFocusContactId }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.back} onClick={setFocusContactId}>
          <div className={styles.arrow}>
            <img src={backImg} alt="back" />
          </div>
          <div>Back</div>
        </div>
        <img src={contactImg} alt="Contact" />
        <div className={styles.nameWrapper}>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className={styles.phone}>{phone}</div>
        <div className={styles.phoneType}>Mobile</div>
        <div className={styles.buttons}>
          <Button text="Edit contact" clickHandler={setIsEditPopup} />
          <Button clickHandler={setIsDeletePopup} text="Delete contact" isRed={true} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { firstName, lastName, phone } = focusContact(state);
  return {
    firstName,
    lastName,
    phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsDeletePopup: () => dispatch(setIsDeletePopup(true)),
    setIsEditPopup: () => dispatch(setIsEditPopup(true)),
    setFocusContactId: () => dispatch(setFocusContactId(null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullContact);
