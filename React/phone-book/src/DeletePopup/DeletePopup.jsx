import React from "react";
import Button from "../Button/Button";
import styles from "./DeletePopup.module.css";

function DeletePopup({ contact, confirmHandler, closeHandler }) {
  const { firstName, lastName } = contact || {};
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        Do you realy want to delete{" "}
        <span>
          {firstName} {lastName}
        </span>
        ?
      </div>
      <div className={styles.buttons}>
        <Button clickHandler={confirmHandler} isRed={true} text="Yes, delete" />
        <Button clickHandler={closeHandler} text="No, go back" />
      </div>
    </div>
  );
}

export default DeletePopup;
