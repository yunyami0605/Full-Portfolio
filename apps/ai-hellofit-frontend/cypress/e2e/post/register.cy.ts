describe("게시글 등록 테스트", () => {
  it("로그인 후 커뮤니티 → 글쓰기 → 등록 성공 시 목록으로 복귀해야 한다", () => {
    const ts = Date.now();
    const title = `테스트 제목 ${ts}`;
    const content = `테스트 내용 ${ts}`;

    // 1. 로그인
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="email"]').type("test1@test.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/main");

    // 2. 하단 탭에서 커뮤니티 이동
    cy.contains("커뮤니티").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/post");

    // 3. 글쓰기 버튼 클릭 → 등록 페이지 이동
    cy.contains("글쓰기").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/post/register");

    // 4. 제목/내용 입력 후 제출
    cy.get('input[id="title"]').type(title);
    cy.get('textarea[id="content"]').type(content);
    cy.get('button[type="submit"]').click();

    // 목록으로 복귀 확인
    cy.location("pathname", { timeout: 10000 }).should("eq", "/post");

    // 방금 등록한 게시글 상세로 이동 (제목으로 식별)
    cy.contains(title, { timeout: 10000 }).should("be.visible").click();
    cy.location("pathname", { timeout: 10000 }).should("include", "/post/");
    cy.contains(title).should("be.visible");

    // 상세 경로에서 ID 추출 후 수정 페이지로 이동
    cy.location("pathname").then((pathname) => {
      const id = pathname.split("/").pop();
      expect(id).to.match(/^[0-9a-zA-Z_-]+$/);

      cy.visit(`http://localhost:3000/post/update/${id}`);

      // 수정 입력 후 제출
      const updatedTitle = `${title} - 수정`;
      const updatedContent = `${content} - 수정`;
      cy.get('input[id="title"]').clear().type(updatedTitle);
      cy.get('textarea[id="content"]').clear().type(updatedContent);
      cy.get('button[type="submit"]').click();

      // 수정 성공 시 상세 페이지로 복귀 및 변경 반영 확인
      cy.location("pathname", { timeout: 10000 }).should("eq", `/post/${id}`);
      cy.contains(updatedTitle, { timeout: 10000 }).should("be.visible");
    });
  });
});
