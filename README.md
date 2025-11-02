### 0. 참고사항

- 현재 ai-hellofit-frontend 헬로핏 프로젝트만 개발 중입니다.
- 다른 프로젝트는 모노레포 구성을 위한 더미 프로젝트입니다.

### 1. 앱 서버, LLM 서버, 프론트 깃 링크

1. [프론트 깃 링크](https://github.com/yunyami0605/Full-Portfolio)

<br />

2. [앱 서버 깃 링크](https://github.com/yunyami0605/hellofit_server)

<br />

3. [LLM 서버 깃 링크](https://github.com/yunyami0605/hellofit_llm)

### 2. 산출물

1. [헬로핏 프로젝트 기획서 링크](https://cookiejy.notion.site/29e75abb802d808ab2afd94e32524708?source=copy_link)

<br />

2. [시스템 아키텍처 설계서 링크](https://cookiejy.notion.site/29f75abb802d803b8ffedb2a1af0915f?source=copy_link)

<br />

3. [데이터베이스 설계서 링크](https://cookiejy.notion.site/29f75abb802d8006b09dc395b8797c6c?source=copy_link)

<br />

### 3. 폴더 구조 (모노레포식 프로젝트 개발)

- apps: 프로젝트폴더
- packages:
  config: 공통 설정
  shared: 공통 컴포넌트
  backend: 백엔드 서버 코드

'''
.
├── apps : 프로젝트 폴더
│ ├── ai-hellofit-frontend : 헬로핏 프로젝트
│ └── ... : 다른 프로젝트
├── backend
├── packages : 공통 설정/훅/ui 프로젝트 폴더
│ ├── config
│ ├── hooks
│ └── ui
├── shell-script: 명령어 쉘스크립트 폴더
│ └── create-feature.sh
'''

### 4. 주요 기술

- Yarn 4 Workspaces\*\*
- Next.js 15 + React 19
- TypeScript
- React-query, zustand
- Vitest + React Testing Library
- SCSS
- MSW(Mock Service Worker)

### 5. 실행 방법

- 루트에서 다음 명령어를 실행합니다.

```bash
# 의존성 설치
yarn install

# HelloFit 실행
yarn dev:fit

# 테스트 실행
yarn test:fit

# Lint 검사
yarn lint:fit

```

### 6. 브랜치 전략

1. 형태

- [프로젝트]/[액션]
- ex) ai-diary/feature

2. 브랜치 전략

- feature: 개발 브랜치
- main : 통합 브랜치
- release: 배포 브랜치
- hotfix: 긴급 수정 브랜치

3. 깃 커밋 prefix

- feat: 서비스 로직 추가
- chore: 라이브러리 설치/셋팅/에셋추가
- git: git ignore, setting 추가
- docs: 문서 추가 및 수정
- refactor: 서비스 로직 수정
- style: ui 추가/수정

### 7. 코드 컨벤션

#### 파일 및 폴더 구조

- 컴포넌트별 1:1 SCSS Module
- src/app : 페이지 단위 폴더
- src/feature : 기능 단위 폴더
- src/shared : 공통 컴포넌트, 스타일, 타입
- src/libs : 공통 유틸

#### 파일명

- 함수/변수 : 카멜케이스 형태
- 컴포넌트 함수 및 컴포넌트 함수의 scss 명 : 파스칼 케이스 형태
- 컴포넌트/타입 : 파스칼케이스 형태

#### css 규칙

- css classname : 스네이크 형태
- css 색상 : 색상 변수 사용
- mixin 사용
- rem 단위 사용 : 10px -> 1rem
- 전역 scss 제외, 모두 모듈형식
