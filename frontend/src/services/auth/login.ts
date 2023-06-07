import axios from "axios";
import { AxiosResponse } from "axios";
import { LoginForm, LoginResponse } from "../../types/auth";
import { API_ROUTES } from "../apiroutes";

export const login = async (
  loginForm: LoginForm
): Promise<AxiosResponse<LoginResponse>> =>
  await axios.post(API_ROUTES.LOGIN, { ...loginForm });
