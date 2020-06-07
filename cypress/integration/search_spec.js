describe("Search Flow", () => {
  it("Visits page and makes input", () => {
    cy.visit("/");

    cy.get("input").type("exampleuser");
    cy.get("button").click();
  });
});
