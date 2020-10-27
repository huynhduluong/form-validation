import { EDIT_USER, SUBMIT_FORM } from "./constant";

export const actSubmit = (user) => {
  return {
    type: SUBMIT_FORM,
    payload: user,
  };
};

export const actEdit = (user) => {
  return {
    type: EDIT_USER,
    payload: user,
  };
};
