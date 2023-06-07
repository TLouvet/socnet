import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { RegisterForm as TRegisterForm } from "../../../types/auth";
import { useRegisterValidation } from "../../../hooks/validation/useRegisterValidation";
import { Input } from "../../../ui/Input";
import { register } from "../../../services/auth/register";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const registerResolver = useRegisterValidation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TRegisterForm>({
    resolver: registerResolver,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterForm) => {
    try {
      await register(data);
      navigate("/login");
    } catch (error) {
      // TODO : handle Error => Either it's a network error or the email is already taken
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
              autoComplete="new-password"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirm password"
              type="password"
              error={!!errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
              fullwidth
              onChange={onChange}
              value={value}
              autoComplete="new-password"
            />
          )}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </div>
  );
}
