import { EDIT_USER, SUBMIT_FORM } from "./constant";

const initialState = {
  listUser: [
    { id: 1, manv: "0001", tennv: "luong", email: "luong@gmail.com" },
    { id: 2, manv: "0002", tennv: "huynh", email: "duluong@gmail.com" },
    { id: 3, manv: "0003", tennv: "du", email: "huynhduluong@gmail.com" },
  ],
  userEdit: null,
};

const formValidationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM: {
      state.userEdit = null;
      const index = state.listUser.findIndex((nv) => {
        return nv.id === action.payload.id;
      });

      let listUser = [...state.listUser];
      if (index === -1) {
        const newUser = { ...action.payload };
        newUser.id = Math.random();
        listUser = [...state.listUser, newUser];
      } else {
        listUser[index] = action.payload;
      }
      state.listUser = listUser;
      return { ...state };
    }
    case EDIT_USER: {
      state.userEdit = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default formValidationReducer;
