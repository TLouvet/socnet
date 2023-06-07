import { RegisterForm } from "../../types/auth";
import { API_ROUTES } from "../apiroutes";
import axios from "axios";
import { AxiosResponse } from "axios";

export const register = async (
  registerForm: RegisterForm
): Promise<AxiosResponse<void>> =>
  await axios.post(API_ROUTES.REGISTER, { ...registerForm });
