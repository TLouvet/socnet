import { LoginForm } from "../../../components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <Link to='/register'>Register</Link>
    </>
  );
}
