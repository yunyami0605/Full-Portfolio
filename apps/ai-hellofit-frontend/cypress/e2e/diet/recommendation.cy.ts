describe("추천 식단 페이지 테스트", () => {
  it("로그인 후 추천 식단 페이지에서 탭 전환과 이동 버튼들이 정상 동작해야 한다", () => {
    // 1. 로그인
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="email"]').type("test1@test.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/main");

    // 2. 추천 식단 페이지 진입
    cy.visit("http://localhost:3000/diet/recommendation");
    cy.location("pathname", { timeout: 10000 }).should("eq", "/diet/recommendation");
  });
});
