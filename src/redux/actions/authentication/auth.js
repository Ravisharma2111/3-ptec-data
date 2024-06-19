import { get } from "lodash";
import { Messages } from "../../../shared/constants";
import { customToast } from "../../../shared/func";
import { loginUser } from "../../apis/authentication/auth";

export const actions = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  LOGOUT: "LOGOUT",
};

export const login = (payload) => {
  return async (dispatch) => {
    dispatch({ type: actions.LOGIN_START });
    try {
      const data = await loginUser(payload);
      Object.keys(data).forEach((key) => {
        let value = typeof data[key] === "object" ? JSON.stringify(get(data, [key], "{}")) : get(data, [key], "");
        localStorage.setItem(key, value);
      });
      customToast({ message: Messages.LOGIN_SUCCESS });

      dispatch({ type: actions.LOGIN_SUCCESS, payload: data });
    } catch (error) {
      customToast({ type: "error", message: error });

      dispatch({ type: actions.LOGIN_ERROR, payload: error });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: actions.LOGOUT });
    localStorage.clear();
    window.location.reload();
  };
};
