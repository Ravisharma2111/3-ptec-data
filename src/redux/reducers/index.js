import { combineReducers } from "redux";
import AuthReducer from "./authentication/auth";
import OrderReducer from "./sales/order";

export default combineReducers({
  auth: AuthReducer,
  order: OrderReducer,
});
