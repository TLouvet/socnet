import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../ui/Input";
import { Button, Typography } from "@mui/material";
import { useLoginValidation } from "../../../hooks/validation/useLoginValidation";
import { login } from "../../../services/auth/login";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm as TLoginForm } from "../../../types/auth";

// TODO -- add some style to the error message
export function LoginForm() {
  const loginResolver = useLoginValidation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // TODO : make this better
  const onSubmit = async (data: TLoginForm) => {
    try {
      const { data: loginResponse } = await login(data);
      localStorage.setItem("token", loginResponse.token);
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessage(
        axiosError.code === "ERR_NETWORK"
          ? "Network error"
          : "Invalid credentials"
      );
    }
  };

  return (
    <>
      <h2>Login</h2>
      {!!errorMessage && (
        <Typography color="danger" mb={2}>
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              error={!!errors?.email}
              errorMessage={errors?.email?.message}
              fullwidth
              onChange={onChange}
              value={value}
              autoComplete="email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              type="password"
              error={!!errors?.password}
              errorMessage={errors?.password?.message}
              fullwidth
              onChange={onChange}
              value={value}
              autoComplete="current-password"
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ display: "block", marginLeft: "auto" }}
        >
          Login
        </Button>
      </form>
    </>
  );
}
