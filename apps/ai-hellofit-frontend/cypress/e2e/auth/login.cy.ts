describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  context("로그인 성공", () => {
    it("올바른 이메일과 비밀번호를 입력하면 메인 페이지로 이동해야 합니다.", () => {
      cy.get('input[id="email"]').type("test1@test.com");
      cy.get('input[id="password"]').type("test1234");
      cy.get('button[type="submit"]').click();

      cy.url({ timeout: 10000 }).should("include", "/main");
    });
  });

  context("로그인 실패", () => {
    it("존재하지 않는 이메일로 로그인을 시도하면 에러 메시지가 표시되어야 합니다.", () => {
      cy.get('input[id="email"]').type("nonexistent@test.com");
      cy.get('input[id="password"]').type("wrongpassword");

      cy.get('button[type="submit"]').click();

      cy.contains("아이디 또는 비밀번호가 잘못 되었습니다.").should("be.visible");

      cy.url().should("include", "/login");
    });

    it("비밀번호가 일치하지 않으면 에러 메시지가 표시되어야 합니다.", () => {
      cy.get('input[id="email"]').type("test1@test.com");
      cy.get('input[id="password"]').type("wrongpassword");

      cy.get('button[type="submit"]').click();

      cy.contains("아이디 또는 비밀번호가 잘못 되었습니다.").should("be.visible");

      cy.url().should("include", "/login");
    });
  });

  context("페이지 이동", () => {
    it("회원가입 버튼을 클릭하면 회원가입 페이지로 이동해야 합니다.", () => {
      cy.contains("회원가입").click();
      cy.url().should("include", "/signup");
    });
  });
});
