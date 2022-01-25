import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Button from "../Button/Button";
import styles from "./DeletePopup.module.css";
import { deleteContact } from "../redux/contactsAction";
import { setIsDeletePopup } from "../redux/deletePopupHandlerAction";

const popUpParent = document.body;

function DeletePopup({ firstName, lastName, setIsDeletePopup, deleteContact }) {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        Do you realy want to delete{" "}
        <span>
          {firstName} {lastName}
        </span>
        ?
      </div>
      <div className={styles.buttons}>
        <Button clickHandler={deleteContact} isRed={true} text="Yes, delete" />
        <Button clickHandler={setIsDeletePopup} text="No, go back" />
      </div>
    </div>,
    popUpParent
  );
}

const mapStateToProps = (state) => {
  const focusContactId = state.contactsReducer.focusContactId;
  const { firstName, lastName } = state.contactsReducer.contacts.find((el) => el.id === focusContactId) || {};
  return {
    firstName,
    lastName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsDeletePopup: () => dispatch(setIsDeletePopup(false)),
    deleteContact: () => dispatch(deleteContact()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePopup);
