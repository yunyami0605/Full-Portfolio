#!/bin/bash

# 사용법 안내
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "사용법: $0 featureName appName"
  echo "예시:   $0 auth ai-hellofit-frontend"
  exit 1
fi

APP_NAME=$1
FEATURE_NAME=$2
BASE_DIR="apps/$APP_NAME/src/features/$FEATURE_NAME"

# 폴더 중복 체크
if [ -d "$BASE_DIR" ]; then
  echo "❌ $BASE_DIR 이미 존재합니다."
  exit 1
fi

# 폴더 구조 생성
mkdir -p "$BASE_DIR"/{_apis,_components,_constants,_hooks,_schemas,_test,_types}

# 통합 배럴 파일 생성
cat <<EOF > "$BASE_DIR/index.ts"
// $FEATURE_NAME feature barrel file

// export * from './_constants';
// export * from './_schemas';
// export * from './_types';
// export * from './_hooks';
// export * from './_apis';
// export * from './_components';
EOF

echo "✅ $APP_NAME 앱에 $FEATURE_NAME feature 생성 완료!"
tree "$BASE_DIR" -L 1
