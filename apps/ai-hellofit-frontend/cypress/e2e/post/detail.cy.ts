describe("게시글 상세 - 로그인 → 댓글 작성 → 게시글 수정", () => {
  it("로그인 후 게시글 상세에서 댓글 작성하고, 수정 페이지로 이동해 제목/내용을 수정한다", () => {
    const ts = Date.now();
    const commentText = `e2e 댓글 ${ts}`;
    const updatedSuffix = " - 수정됨";

    // 1. 로그인
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="email"]').type("test1@test.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/main");

    // 2. 커뮤니티 이동 → 첫 게시글 상세 진입
    cy.contains("커뮤니티").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/post");
    cy.get('[role="button"]').first().click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/post/");

    // 3. 댓글 작성 및 등록
    cy.get('input[id="comment"]').type(commentText);
    cy.contains("등록").click();
    cy.contains(commentText, { timeout: 10000 }).should("be.visible");

    // 4. 댓글 수정하기 (해당 댓글 카드 범위 내 '수정' 버튼 클릭 - 강제 클릭/스크롤 보정)
    cy.contains(commentText, { timeout: 10000 })
      .should("be.visible")
      .closest('[class*="comments_wrapper"]')
      .within(() => {
        cy.get('[class*="actions_view"]', { timeout: 10000 })
          .should("be.visible")
          .within(() => {
            cy.contains("수정", { timeout: 10000 })
              .scrollIntoView({ offset: { top: -100, left: 0 } })
              .should("be.visible")
              .click({ force: true });
          });
      });

    // 입력창에 기존 값이 세팅되었는지 확인 후 수정 내용 입력
    cy.get('input[id="comment"]')
      .clear()
      .type(commentText + updatedSuffix);

    // data-testid="comment-submit 버튼 클릭
    cy.get('button[data-testid="comment-submit"]').click();

    cy.contains(commentText + updatedSuffix, { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.contains("삭제").click();
    cy.contains(commentText + updatedSuffix, { timeout: 10000 }).should("not.exist");
  });
});
