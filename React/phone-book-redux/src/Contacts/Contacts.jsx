import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import Button from "../Button/Button";
import styles from "./Contacts.module.css";
import contactsImg from "../img/contact-list.png";
import { setIsEditPopup } from "../redux/editPopupComponentAction";

function Contacts() {
  const dispatch = useDispatch();
  const { contacts } = useSelector((store) => store.contactsReducer);

  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.header}>
          <img src={contactsImg} alt="Contacts" />
          <div>Contacts</div>
        </div>
        <div className={styles.contacts}>
          {contacts?.map((el) => {
            const { firstName, lastName, phone, id } = el;
            return <Contact firstName={firstName} lastName={lastName} phone={phone} id={id} key={id} />;
          })}
        </div>
        <Button additionalClass={styles.addBtn} clickHandler={() => dispatch(setIsEditPopup(true))} />
      </div>
    </div>
  );
}

export default Contacts;
