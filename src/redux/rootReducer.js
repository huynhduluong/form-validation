import { combineReducers } from "redux";
import formValidationReducer from "./formValidationReducer";

const rootReducer = combineReducers({
  formValidationReducer,
});

export default rootReducer;
