import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("App", () => {
  render(<App />);

  it('should have a h1 with the text "WELCOME"', () => {
    const h1 = screen.getByRole("heading", { name: "WELCOME" });

    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toBe("WELCOME");
  });
});
