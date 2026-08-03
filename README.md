# Dodoong (두둥) - Frontend

습관/퀘스트 인증과 파티(그룹) 활동을 중심으로 한 리액트 기반 웹 서비스의 프론트엔드 레포지토리입니다.

## 기술 스택

| 분류       | 스택                                       |
| ---------- | ------------------------------------------ |
| Core       | React 19, Vite 8                           |
| Routing    | React Router DOM 7 (`createBrowserRouter`) |
| Styling    | styled-components 6                        |
| Animation  | Framer Motion                              |
| SVG        | vite-plugin-svgr (SVG를 컴포넌트로 import) |
| Lint       | ESLint 10 (flat config)                    |
| API (예정) | Axios                                      |

## 시작하기

```bash
npm install
npm run dev       # 개발 서버 실행
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint 검사
```

## 폴더 구조

```
src/
├── api/                  # axios 인스턴스 및 도메인별 API 함수
│   ├── instance.js       # axios 공통 인스턴스 (baseURL, 인터셉터)
│   ├── partyApi.js
│   ├── chatApi.js
│   ├── characterApi.js
│   ├── memberApi.js
│   ├── dailyQuestApi.js
│   └── streakApi.js
├── assets/               # 이미지, 아이콘(svg) 등 정적 리소스
├── components/           # 여러 페이지에서 공통으로 쓰는 컴포넌트 (BottomNav, Header, Modal 등)
├── pages/                # 라우트 단위 페이지. 페이지별 폴더에 .jsx + .style.js + 하위 components/
│   ├── Home/
│   ├── Quest/
│   ├── Character/
│   ├── Party/
│   ├── PartyDetail/
│   ├── PartyChat/        # 실시간 채팅 UI (현재는 mockChats.js 목데이터 기반)
│   ├── MyPage/
│   ├── Login/
│   └── OnBoarding/
├── styles/               # 전역 컬러(Colors.css), 폰트 css 변수(Fonts.js)
├── router.jsx            # 전체 라우팅 정의
├── main.jsx              # 엔트리 포인트
└── App.jsx
```

### 페이지 구성 규칙

- 페이지 폴더명 = 라우트 단위 기능. `PageName.jsx` + `PageName.style.js` 쌍으로 구성합니다.
- 해당 페이지에서만 쓰이는 하위 컴포넌트는 `components/` 하위 폴더에 같은 방식(`.jsx` + `.style.js`)으로 둡니다.
- 스타일은 별도 `.style.js` 파일에 styled-components로 분리하고, 색상은 `src/styles/Colors.css`의 CSS 변수(`var(--Main)` 등), 텍스트 스타일은 `src/styles/Fonts.js`의 css 변수(`SemiBold_16` 등)를 사용합니다.

## 라우팅

`src/router.jsx`에서 `createBrowserRouter`로 전체 라우트를 관리합니다. 공통 `Layout`이 `max-width: 480px`의 모바일 뷰 프레임과 하단 `BottomNav`를 담당하며, 로그인/온보딩/채팅방 등 일부 경로에서는 네비게이션 바를 숨깁니다.

주요 경로:

| 경로                        | 페이지      |
| --------------------------- | ----------- |
| `/`                         | Login       |
| `/onboarding`               | OnBoarding  |
| `/home`                     | Home        |
| `/quest`                    | Quest       |
| `/character`                | Character   |
| `/party`                    | Party       |
| `/party/create`             | PartyCreate |
| `/party/:partyId`           | PartyDetail |
| `/party/:partyId/ranking`   | Ranking     |
| `/party/:partyId/certified` | Certified   |
| `/party/chat`               | ChatList    |
| `/party/chat/:roomId`       | ChatRoom    |
| `/mypage`                   | MyPage      |

## API 연동

현재 UI는 대부분 목데이터(`mockChats.js` 등)로 동작하며, 백엔드 API 연동은 아직 진행 중입니다. 아래 구조로 진행할 예정입니다.

- **`src/api/instance.js`**: axios 공통 인스턴스. `VITE_API_BASE_URL` 환경 변수로 `baseURL`을 설정하고, 요청 인터셉터에서 `localStorage`의 `token`을 `Authorization: Bearer` 헤더로 자동 첨부합니다.
- **도메인별 `xxxApi.js`**: `partyApi.js`, `chatApi.js`, `characterApi.js`, `memberApi.js`, `dailyQuestApi.js`, `streakApi.js` 파일에 도메인별 API 함수를 작성합니다. 현재는 빈 파일 상태이며, `instance.js`를 import해서 함수를 채워나갈 예정입니다.
- 루트에 `.env` 파일을 만들고 `VITE_API_BASE_URL=<API 서버 주소>`를 설정해야 API 인스턴스가 동작합니다 (`.env`는 `.gitignore`에 포함되어 있으므로 각자 로컬에 생성).
- API 연동을 시작하려면 우선 `npm install axios`가 필요합니다.

## 실시간 채팅

`src/pages/PartyChat/` 아래 `ChatList`, `ChatRoom` UI와 `mockChats.js` 목데이터로 화면만 구성되어 있으며, 실시간 통신(WebSocket/STOMP 등) 연동은 아직 진행되지 않았습니다. API 연동 이후 실시간 채팅 기능을 구현할 예정입니다.

## 코딩 컨벤션

- 컴포넌트/스타일 분리: 로직은 `.jsx`, 스타일은 `.style.js`.
- 색상: `src/styles/Colors.css`의 CSS 변수 사용.
- 타이포그래피: `src/styles/Fonts.js`의 css 변수 사용 (예: `SemiBold_16`, `Regular_14`).
- 아이콘: `vite-plugin-svgr` 덕분에 `.svg`를 리액트 컴포넌트로 바로 import 가능.
