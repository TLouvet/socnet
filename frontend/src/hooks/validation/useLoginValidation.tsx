import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import contents from "../../contents.json";

export function useLoginValidation() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(contents.fr.errors.email_invalid)
      .required(contents.fr.errors.email_required),
    password: yup.string().required(contents.fr.errors.password_required),
  });

  return yupResolver(schema);
}
