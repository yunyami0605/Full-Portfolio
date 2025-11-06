describe("회원가입 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/signup");
  });

  context("페이지 렌더링", () => {
    it("필수 입력 요소와 버튼이 보여야 한다", () => {
      cy.get('input[id="email"]').should("be.visible");
      cy.get('input[id="password"]').should("be.visible");
      cy.get('input[id="password_check"]').should("be.visible");
      cy.get('input[id="nickname"]').should("be.visible");

      cy.get('button[type="submit"]').should("be.disabled");
      cy.contains("개인정보 처리방침 동의").should("be.visible");
    });
  });

  context("닉네임 중복 검사", () => {
    it("중복 닉네임일 경우 에러 메시지가 표시되어야 한다", () => {
      cy.get('input[id="email"]').type("user@example.com");
      cy.get('input[id="password"]').type("password1");
      cy.get('input[id="password_check"]').type("password1");

      cy.get('input[id="nickname"]').type("test1");
      cy.wait(3000);

      cy.contains("중복된 닉네임입니다.").should("be.visible");
    });
  });

  context("페이지 이동", () => {
    it("개인정보 처리방침 버튼 클릭 시 개인정보 페이지로 이동해야 한다", () => {
      cy.contains("개인정보 처리방침 동의").click();
      cy.url().should("include", "/privacy");
    });
  });

  context("회원가입 성공", () => {
    it("정상 응답이면 /user/register 로 이동해야 한다", () => {
      // 닉네임 중복 아님 모킹
      cy.intercept("GET", "**/auth/check-nickname*", {
        statusCode: 200,
        body: { isDuplicate: false },
      }).as("checkNickname");

      // 개인정보 동의 플로우 수행 (동의 후 이전 페이지로 복귀)
      cy.contains("개인정보 처리방침 동의").click();
      cy.url().should("include", "/privacy");

      cy.get('[data-testid="policy-content"]').scrollTo("bottom", { duration: 500 });
      cy.contains("동의").should("be.visible").click({ force: true });

      // 폼 입력
      cy.get('input[id="email"]').type("user@example.com");
      cy.get('input[id="password"]').type("password1");
      cy.get('input[id="password_check"]').type("password1");
      cy.get('input[id="nickname"]').type("tester");
      cy.wait("@checkNickname");

      // 회원가입 성공 모킹
      cy.intercept("POST", "**/auth/signup", {
        statusCode: 201,
        body: { access: "mock-access-token" },
      }).as("signup");

      // 제출 및 이동 검증
      cy.get('button[type="submit"]').click();
      cy.wait("@signup");
      cy.url({ timeout: 10000 }).should("include", "/user/register");
    });
  });
});
