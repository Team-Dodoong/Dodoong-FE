# Dodoong (두둥) - Frontend

일상을 플레이! 퀘스트로 함께 완성해가는 우리의 하루<br>
퀘스트 인증과 파티 활동을 중심으로 한 리액트 기반 게이미피케이션 투두 웹 서비스의 프론트엔드 레포지토리입니다.

## 기술 스택

| 분류      | 스택                                        |
| --------- | ------------------------------------------- |
| Core      | React 19, Vite 8                            |
| Routing   | React Router DOM 7 (`createBrowserRouter`)  |
| Styling   | styled-components 6                         |
| Animation | Framer Motion                               |
| SVG       | vite-plugin-svgr (SVG를 컴포넌트로 import)  |
| API       | Axios                                       |
| 실시간    | `@stomp/stompjs`, `sockjs-client` (STOMP)   |
| Lint      | ESLint 10 (flat config)                     |
| 배포      | Vercel (`vercel.json` rewrites로 API/WS 프록시) |

## 시작하기

```bash
npm install
npm run dev       # 개발 서버 실행
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint 검사
```

루트에 `.env` 파일을 만들고 아래 값을 설정해야 API/웹소켓이 정상 동작합니다 (`.env`는 `.gitignore`에 포함되어 있으므로 각자 로컬에 생성).

```bash
VITE_API_BASE_URL=https://api.dodoong.p-e.kr
VITE_WS_URL=wss://api.dodoong.p-e.kr/ws
```

## 폴더 구조

```
src/
├── api/                  # axios 인스턴스 및 도메인별 API 함수
│   ├── instance.js       # axios 공통 인스턴스 (baseURL, 인터셉터로 토큰 자동 첨부)
│   ├── stompClient.js    # STOMP 클라이언트 생성/연결/해제
│   ├── index.js          # 도메인별 API 재export
│   ├── partyApi.js
│   ├── chatApi.js
│   ├── characterApi.js
│   ├── memberApi.js
│   ├── dailyQuestApi.js
│   └── streakApi.js
├── assets/               # 이미지, 아이콘(svg) 등 정적 리소스
├── components/           # 여러 페이지에서 공통으로 쓰는 컴포넌트 (BottomNav, Header, Modal, Button, Input 등)
├── hooks/                # 커스텀 훅 (useChatRoom 등 STOMP 구독 관리)
├── utils/                # 캐릭터/파티 이미지 매핑 등 유틸
├── pages/                # 라우트 단위 페이지. 페이지별 폴더에 .jsx + .style.js + 하위 components/
│   ├── Home/
│   ├── Quest/
│   ├── Character/
│   ├── Party/            # Party, PartyCreate
│   ├── PartyDetail/       # PartyDetail, Ranking, Certified
│   ├── PartyChat/         # ChatList(목데이터), ChatRoom(STOMP 실시간 연동)
│   ├── MyPage/            # MyPage, AccountInfo, ProfileEdit, ServiceWithdraw
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

`src/router.jsx`에서 `createBrowserRouter`로 전체 라우트를 관리합니다. 공통 `Layout`이 `max-width: 480px`의 모바일 뷰 프레임과 하단 `BottomNav`를 담당하며, 로그인/온보딩/파티 상세/마이페이지 하위 일부 경로 등에서는 네비게이션 바를 숨깁니다.

주요 경로:

| 경로                        | 페이지      |
| --------------------------- | ----------- |
| `/`                         | Login       |
| `/onboarding`               | OnBoarding  |
| `/home`                     | Home        |
| `/questdetail`              | QuestDetail (Home 진입) |
| `/floatingadd_questdetail`  | QuestDetail (플로팅 버튼 진입) |
| `/quest`                    | Quest       |
| `/character`                | Character   |
| `/party`                    | Party       |
| `/party/create`             | PartyCreate |
| `/party/:partyId`           | PartyDetail |
| `/party/:partyId/edit`      | PartyCreate (수정 모드) |
| `/party/:partyId/ranking`   | Ranking     |
| `/party/:partyId/certified` | Certified   |
| `/party/chat`               | ChatList    |
| `/party/chat/:roomId`       | ChatRoom    |
| `/mypage`                   | MyPage      |
| `/accountinfo`              | AccountInfo |
| `/profile/edit`             | ProfileEdit |
| `/profile/servicewithdraw`  | ServiceWithdraw |

## API 연동

`src/api/`에 도메인별 API 함수가 구현되어 있으며, 실제 백엔드(`https://api.dodoong.p-e.kr`)와 연동되어 동작합니다.

- **`src/api/instance.js`**: axios 공통 인스턴스. `VITE_API_BASE_URL` 환경 변수로 `baseURL`을 설정하고, 요청 인터셉터에서 `localStorage`의 `token`을 `Authorization: Bearer` 헤더로 자동 첨부합니다.
- **도메인별 `xxxApi.js`**: `partyApi.js`(파티 생성/조회/검색/랭킹/인증 등), `memberApi.js`(회원/프로필), `dailyQuestApi.js`(일일 퀘스트), `characterApi.js`, `streakApi.js`, `chatApi.js`(채팅방 목록/이력 조회)로 구성되며, `src/api/index.js`에서 한번에 re-export합니다.
- 배포 환경(Vercel)에서는 `vercel.json`의 rewrites로 `/api/*`, `/ws` 요청을 백엔드 서버로 프록시합니다.

## 실시간 채팅

`src/api/stompClient.js`와 `src/hooks/useChatRoom.js`를 통해 STOMP(WebSocket) 기반 실시간 채팅이 연동되어 있습니다.

- `ChatRoom`(`src/pages/PartyChat/ChatRoom/`)은 `useChatRoom` 훅으로 `/topic/parties/:partyId`를 구독해 실시간 메시지를 받고, `chatApi.getChatHistory`로 이전 대화 이력을 불러옵니다.
- `activateStomp` / `deactivateStomp`로 로그인/로그아웃 시점에 STOMP 연결을 관리하며, 토큰이 있으면 연결 헤더에 `Authorization`을 첨부합니다.
- `ChatList`(`src/pages/PartyChat/ChatList/`)는 아직 `mockChats.js` 목데이터로 화면이 구성되어 있어, 실제 채팅방 목록 API 연동이 남아있습니다.

## 코딩 컨벤션

- 컴포넌트/스타일 분리: 로직은 `.jsx`, 스타일은 `.style.js`.
- 색상: `src/styles/Colors.css`의 CSS 변수 사용.
- 타이포그래피: `src/styles/Fonts.js`의 css 변수 사용 (예: `SemiBold_16`, `Regular_14`).
- 아이콘: `vite-plugin-svgr` 덕분에 `.svg`를 리액트 컴포넌트로 바로 import 가능.
