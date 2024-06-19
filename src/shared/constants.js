export const AppInfo = {
  name: "3P Technologies",
  shortName: "3PTEC",
  version: "6.2.32",
};

export const  API_URL = process.env.REACT_APP_API_URL || "http://35.232.116.200:80/dms-demo/api";

export const Paths = {
  login: "/login",
  reports: "/reports",
  sales: { base: "sales", invoice: "/invoice", item: "/item", order: "/order", purchase: "/purchase", stock: "/stock" },
  administration: {
    base: "administration",
    connector: "/connector",
    emailReports: "/email-reports",
    files: "/files",
    itemMaster: "/item-master",
    orgStructure: "/org-structure",
    routes: "/routes",
    taxes: "/taxes",
    users: "/users",
    zones: "/zones",
  },
  dashboard: "/dashboard",
};

export const ItemPerPage = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
  { label: "500", value: 500 },
];

export const Messages = {
  //Authrization
  UNAUTHORISED: "Unauthorised Access, Please re-login to your account",
  SOMETHING_WENT_WRONG: "Something Went Wrong",
  TOKEN_ERROR: "An Unexpected Error Occurred, Please re-login to your account",
  TOKEN_EXPIRED: "Your session has expired, Please login again",
  LOGIN_SUCCESS: "You are successfully logged in ",
};

export const Headers = {
  // "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "*",
  ["txnSource"]: "Application",
};

export const LocalStorageKeys = {
  apiToken: "apiToken",
};
