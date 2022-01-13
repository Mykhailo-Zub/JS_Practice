import { GET_ALL } from "./types";

export const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return action.payload;
    default:
      return state;
  }
};
