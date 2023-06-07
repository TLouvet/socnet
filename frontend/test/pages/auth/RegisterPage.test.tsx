import { render, screen } from "@testing-library/react";
import RegisterPage from "../../../src/pages/auth/register/RegisterPage";
import { BrowserRouter } from "react-router-dom";

describe("RegisterPage", () => {
  beforeEach(() => {
    render(<RegisterPage />, { wrapper: BrowserRouter });
  });

  it("should have a link to the login page", () => {
    const loginLink = screen.getByText("Login");

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
