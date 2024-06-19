import { get } from "lodash";
import axios from "axios";
import { API_URL, Headers, Messages } from "../../../shared/constants";

export const loginUser = async (credentials) => {
  console.log('credentials',credentials)
  try {
    const result = await axios.get(`${API_URL}/userauth`, {
      headers: { ...Headers, ...credentials, txnSource: "Application", timeoffset: "330" },
    });
    if (result.status === 200) {
      console.log('result',result)
      return result.data;
    } else {
      let error = { failed: "Login failed please try again" };
      throw error;
    }
  } catch (error) {
    const err = get(error, "response.data", Messages.UNAUTHORISED);
    throw err;
  }
};
