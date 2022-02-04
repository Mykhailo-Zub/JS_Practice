import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Button from "../Button/Button";
import styles from "./DeletePopup.module.css";
import { deleteContact } from "../redux/contactsAction";
import { setIsDeletePopup } from "../redux/deletePopupHandlerAction";
import { focusContact } from "../redux/selectors";

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
  const { firstName, lastName } = focusContact(state);
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
