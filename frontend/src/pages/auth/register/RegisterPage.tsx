import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { AuthLayout } from "../../../components/auth/AuthLayout";
import { RegisterForm } from "../../../components/auth/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
      <Typography variant="body1" mt={3}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </AuthLayout>
  );
}
