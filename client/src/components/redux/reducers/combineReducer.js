

import { combineReducers } from "redux";
import {productReducer,authReducer} from "./productReducer";

export default combineReducers({
  products : productReducer,
  auth : authReducer
});