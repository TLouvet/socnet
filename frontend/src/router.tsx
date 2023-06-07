import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./pages/auth/login/LoginPage.tsx";
import RegisterPage from "./pages/auth/register/RegisterPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
