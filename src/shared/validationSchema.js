
import * as yup from "yup";

export const LoginSchema = yup.object({
  userLoginId: yup.string().email("Enter Valid Email").required("Email Required"),
  userLoginPwd: yup.string().required("Password Required"),
});
