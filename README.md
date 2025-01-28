# Express PostgreSQL CRUD API

Express.js와 PostgreSQL을 사용한 RESTful API 서버입니다.

## 기능

- 앱 관리 API (`/api/app`)
- 메뉴 관리 API (`/api/menu`)
- 툴바 관리 API (`/api/toolbar`)
- 스타일 관리 API (`/api/style`)
- FCM 토픽 관리 API (`/api/fcm_topic`)

## 기술 스택

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- Docker 및 Docker Compose
- PostgreSQL

### 설치 방법

1. 저장소 클론
2. 환경변수 설정
3. Docker Compose 실행

## API 엔드포인트

### 앱 관리
- `GET /api/app` - 앱 목록 조회
- `POST /api/app` - 새 앱 생성
- `PUT /api/app/:id` - 앱 정보 수정
- `DELETE /api/app/:id` - 앱 삭제

### 메뉴 관리
- `GET /api/menu` - 메뉴 목록 조회
- `POST /api/menu` - 새 메뉴 생성
- `PUT /api/menu/:id` - 메뉴 정보 수정
- `DELETE /api/menu/:id` - 메뉴 삭제

[나머지 API 엔드포인트도 같은 형식으로 작성...]

## 환경 변수 설정

`.env.production` 파일에 다음 환경 변수들을 설정해야 합니다:

- `NODE_ENV`: 실행 환경 (production/development)
- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 문자열

## 데이터베이스 스키마

프로젝트의 데이터베이스 구조는 `db/index.js`에 정의되어 있습니다.

## 도커 구성

- `Dockerfile`: Node.js 애플리케이션 컨테이너 설정
- `docker-compose.yml`: 애플리케이션과 PostgreSQL 데이터베이스 컨테이너 구성
- 볼륨을 통한 데이터 영속성 보장
- 자동 재시작 및 헬스체크 설정

## 문제 해결

일반적인 문제들과 해결 방법:

1. 데이터베이스 연결 오류
   - 환경 변수 설정 확인
   - PostgreSQL 서비스 실행 상태 확인

2. 도커 관련 문제
   - 도커 로그 확인: `docker-compose logs`
   - 컨테이너 상태 확인: `docker-compose ps`


## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

