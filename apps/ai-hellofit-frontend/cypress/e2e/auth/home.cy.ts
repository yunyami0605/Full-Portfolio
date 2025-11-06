describe("홈 화면", () => {
  it("메인 페이지가 정상적으로 표시된다", () => {
    cy.visit("/");
    cy.contains("카카오로 시작하기").should("be.visible");
  });
});
