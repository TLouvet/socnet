describe("auth spec", () => {
  it("auth flow", () => {
    cy.visit("http://localhost:5173/register");

    cy.intercept("POST", "http://localhost:4000/api/auth/register", {});

    cy.get("input").first().type("test@test.com");
    cy.get("input").eq(1).type("password");
    cy.get("input").eq(2).type("password");
    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:5173/login");

    cy.intercept("POST", "http://localhost:4000/api/auth/login", {
      token: "test",
    });

    cy.get("input").first().type("test@test.com");
    cy.get("input").eq(1).type("password");
    cy.get("button[type=submit]").click();

    cy.url().should("eq", "http://localhost:5173/");
  });
});
