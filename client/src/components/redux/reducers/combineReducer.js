

import { combineReducers } from "redux";
import {productReducer,authReducer,inventoryReducer} from "./productReducer";

export default combineReducers({
  products : productReducer,
  auth : authReducer,
  inventory : inventoryReducer
});