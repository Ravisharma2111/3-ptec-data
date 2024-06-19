import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { withExtraArgument } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";
import Axios from "../configs/axiosInterceptor";

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(withExtraArgument({ Axios }))));

export default store;
