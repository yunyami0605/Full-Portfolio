describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    // cy.intercept("GET", "/_next/static/**", { statusCode: 200 });
    // cy.intercept("GET", "/_next/image*", { statusCode: 200 });
    // cy.intercept("GET", "/main?_rsc*", { statusCode: 200 });
    // cy.intercept("GET", "/api/diets/**", { statusCode: 200 });
    cy.visit("http://localhost:3000/login");
  });

  //   context("페이지 url 확인 -> 로그인 성공", () => {
  //     it("올바른 이메일과 비밀번호를 입력하면 메인 페이지로 이동해야 합니다.", () => {
  //       //   cy.intercept("POST", "/api/auth/login").as("login");

  //       cy.get('input[id="email"]').type("test1@test.com");
  //       cy.get('input[id="password"]').type("test1234");
  //       cy.get('button[type="submit"]').click();

  //       cy.url({ timeout: 6000 }).should("include", "/main");

  //       //   cy.wait(1000);
  //       cy.end();

  //       //   cy.contains("로그인", { timeout: 4000 }).should("be.visible");

  //       //   cy.wait("@login");

  //       //   cy.contains("오늘의 식단", { timeout: 10000 }).should("be.visible");
  //     });
  //   });

  context("미가입 에러 텍스트 확인 -> 로그인 실패", () => {
    it("존재하지 않는 이메일로 로그인을 시도하면 에러 메시지가 표시되어야 합니다.", () => {
      cy.get('input[id="email"]').type("nonexistent@test.com");
      cy.get('input[id="password"]').type("wrongpassword");

      cy.get('button[type="submit"]').click();

      // 로그인 실패 확인
      cy.contains("아이디 또는 비밀번호가 잘못 되었습니다.").should("be.visible");

      cy.url().should("include", "/login");
    });

    // it("비밀번호 미일치 에러 텍스트 확인 -> 로그인 실패", () => {
    //   cy.get('input[id="email"]').type("test1@test.com");
    //   cy.get('input[id="password"]').type("wrongpassword");

    //   cy.get('button[type="submit"]').click();

    //   // 에러 메시지를 확인합니다.
    //   cy.contains("비밀번호가 일치하지 않습니다.").should("be.visible");

    //   cy.url().should("include", "/login");
    // });
  });
});
