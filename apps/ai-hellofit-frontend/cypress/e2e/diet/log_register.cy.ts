describe("식단 기록 등록 페이지 테스트", () => {
  it("파라미터 없이 진입 시 이전 페이지로 돌아가야 한다", () => {
    // 로그인
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="email"]').type("test1@test.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/main");

    // 추천 식단 페이지에서 '직접 입력하기' 클릭 → 파라미터 없이 이동 → back 동작 확인
    cy.visit("http://localhost:3000/diet/recommendation");
    cy.contains("직접 입력하기").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/diet/recommendation");
  });

  it("date/tab 파라미터로 진입해 검색 → 추가 → 기록 버튼까지 동작해야 한다", () => {
    // 로그인
    cy.visit("http://localhost:3000/login");
    cy.get('input[id="email"]').type("test1@test.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 10000 }).should("include", "/main");

    // 히스토리 설정 (등록 성공 후 back 대상)
    cy.visit("http://localhost:3000/diet/recommendation");

    // 오늘 날짜(YYYY-MM-DD) 생성
    const date = new Date().toISOString().slice(0, 10);
    cy.visit(`http://localhost:3000/diet/log/register?date=${date}&tab=0`);
    cy.location("pathname", { timeout: 10000 }).should("eq", "/diet/log/register");

    // 검색어 입력 (일반적인 음식 키워드)
    cy.get('input[type="text"]').first().type("밥");

    // 첫 번째 음식 행에서 추가 버튼 클릭 (요소가 있을 경우에만)
    cy.get('[class*=\"food_item\"]').its("length").then((len) => {
      if (len > 0) {
        cy.get('[class*=\"food_item\"]').first().within(() => {
          cy.get("button").last().click();
        });

        // 기록한 식단 영역에 항목이 추가되었는지 확인
        cy.get('[class*=\"selected_food\"]').should("have.length.at.least", 1);
      }
    });

    // '아침 식단 기록' 버튼 클릭 → 성공 시 back 되어 추천 식단 페이지로 이동
    cy.contains("아침 식단 기록").click();
    cy.location("pathname", { timeout: 10000 }).should("eq", "/diet/recommendation");
  });
});


