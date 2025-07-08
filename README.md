### 1. 폴더 구조

- apps: 프로젝트폴더
- packages:
  config: 공통 설정
  shared: 공통 컴포넌트
  backend: 백엔드 서버 코드

### 2. 브랜치 전략

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

### 4. 코드 컨벤션

- 함수/변수 -> 카멜케이스 형태
- 컴포넌트/타입 -> 파스칼케이스 형태
