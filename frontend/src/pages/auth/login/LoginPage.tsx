import { LoginForm } from "../../../components/auth/LoginForm/LoginForm";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { AuthLayout } from "../../../components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
      <Typography variant="body1" mt={3}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </AuthLayout>
  );
}
