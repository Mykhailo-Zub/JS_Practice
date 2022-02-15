import React from "react";
import { connect } from "react-redux";
import Contact from "../Contact/Contact";
import Button from "../Button/Button";
import styles from "./Contacts.module.css";
import contactsImg from "../img/contact-list.png";
import { setIsEditPopup } from "../redux/editPopupComponentAction";
import { setFocusContactId } from "../redux/contactsAction";

function Contacts({ contacts, setIsEditPopup, setFocusContact }) {
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
            return <Contact firstName={firstName} lastName={lastName} phone={phone} id={id} key={id} setFocusContact={setFocusContact} />;
          })}
        </div>
        <Button additionalClass={styles.addBtn} clickHandler={setIsEditPopup} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactsReducer.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsEditPopup: () => dispatch(setIsEditPopup(true)),
    setFocusContact: (id) => dispatch(setFocusContactId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
