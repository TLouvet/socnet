import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../../../src/pages/auth/login/LoginPage";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
  beforeEach(() => {
    render(<LoginPage />, { wrapper: BrowserRouter });
  });

  it("should have a form with email and password fields with empty values", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    expect(emailInput).toHaveAttribute("type", "email");
    expect(passwordInput).toHaveAttribute("type", "password");

    expect(emailInput.textContent).toBe("");
    expect(passwordInput.textContent).toBe("");
  });

  it("should have a link to the register page", () => {
    const registerLink = screen.getByText("Register");

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
