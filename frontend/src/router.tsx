import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./pages/auth/login/LoginPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
