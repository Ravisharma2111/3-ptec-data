import { createBrowserHistory } from "history";
import toast from "react-hot-toast";
import { get } from "lodash";
import { Messages } from "./constants";

export const history = createBrowserHistory();

// Toast types=["success","error","custom","loading","promise"]
export const customToast = ({ message = Messages.SOMETHING_WENT_WRONG, type = "success", config = {} }) => {
  return toast[type](message, { ...config });
};

// Get error message from response
export const prepareError = (error, msg = Messages.SOMETHING_WENT_WRONG) => {
  const message = get(error, "response.data.error") || get(error, "failed") || get(error, "response.data.message", msg);
  return message;
};
