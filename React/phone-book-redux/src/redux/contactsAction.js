import { getAllContacts } from "../requests";
import { GET_ALL } from "./types";

const getAll = (contacts) => {
  return {
    type: GET_ALL,
    payload: contacts,
  };
};

const getContactsToStore = () => (dispatch) => getAllContacts().then((data) => dispatch(getAll(data)));

export default getContactsToStore;
