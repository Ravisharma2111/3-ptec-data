import { get } from "lodash";
import { actions } from "../../actions/authentication/auth";
import { Messages } from "../../../shared/constants";

const ObjKeys = [
  "functionalmodules",
  "entitytypeaccess",
  "createZoneRequired",
  "featuresaccess",
  "tenantFeatures",
  "tenantGstStateCodes",
  "dashboardreportaccess",
  "childzoneflag",
  "entityreportaccess",
  "orgStockFlag",
  "entityHierarchyExists",
  "mobilereportaccess",
  "functionalzones",
  "zoneprivileges",
  "zoneHierarchyRequired",
  "zoneHierarchyExists",
  "allhierarchyflag",
];

const getAllLocalStorageKeys = () => {
  const allKeys = {};
  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach((key) => {
      if (ObjKeys.includes(key)) {
        allKeys[key] = JSON.parse(localStorage[key]);
      } else {
        allKeys[key] = localStorage[key];
      }
    });
  }
  return allKeys;
};

let initialState = {
  ...getAllLocalStorageKeys(),
  isLoading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return { ...state, isLoading: true, error: "" };

    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: "",
        isLoading: false,
      };

    case actions.LOGIN_ERROR:
      return {
        ...state,
        error: get(action, "payload", Messages.SOMETHING_WENT_WRONG),
        isLoading: false,
      };

    case actions.LOGOUT:
      return { isLoading: false, error: "" };

    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: "",
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
