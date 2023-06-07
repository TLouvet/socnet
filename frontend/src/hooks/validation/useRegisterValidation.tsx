import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import contents from "./validation-content.json";

// TODO - revalidation des mdp
export function useRegisterValidation() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(contents.fr.errors.email_invalid)
      .required(contents.fr.errors.email_required),
    password: yup
      .string()
      .oneOf(
        [yup.ref("confirmPassword"), undefined],
        contents.fr.errors.password_match
      )
      .required(contents.fr.errors.password_required),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        contents.fr.errors.password_match
      ),
  });

  return yupResolver(schema);
}
