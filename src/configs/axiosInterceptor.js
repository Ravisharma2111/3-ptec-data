import axios from "axios";
import { get, size } from "lodash";
import { API_URL, Headers, Messages } from "../shared/constants";
import { customToast, history } from "../shared/func";

const Axios = axios.create({
  baseURL: API_URL,
  headers: Headers,
  timeout: 15000,
});

const restrictUser = (errorMessage) => {
  customToast({ type: "error", message: errorMessage });
  localStorage.clear();
  setTimeout(() => {
    history.push("/");
    window.location.reload();
  }, 1500);
};

const requestHandler = (request) => {
  request.headers.apiToken = localStorage.getItem("apiToken") || null;
  if (size(request.extraHeaders)) {
    request.headers = { ...request.headers, ...request.extraHeaders };
  }

  return request;
};

const errorHandler = (error) => {
  let errorCode = get(error, "response.status");

  if (error.code === "ECONNABORTED") {
    Object.assign(error, { failed: "Request timed out" });
  }

  if (errorCode === 401) {
    const err = get(error, "response.data", Messages.UNAUTHORISED);
    restrictUser(err);
  }

  return Promise.reject(error);
};

Axios.interceptors.request.use(
  (request) =>  {
    console.log("Request URL:", request.url);
    return requestHandler(request)
  },
  (error) => {
    customToast({ type: "error", message: get(error, "response.data.message", Messages.SOMETHING_WENT_WRONG) });

    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,

  (error) => errorHandler(error)
);

export default Axios;
