// src/router.jsx
import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Login from "./pages/Login/Login.jsx";
import OnBoarding from "./pages/OnBoarding/OnBoarding.jsx";
import Home from "./pages/Home/pages/Home/Home.jsx";
import QuestDetail from "./pages/Home/pages/QuestDetail/QuestDetail.jsx";
import FloatingAddButtonPage from "./pages/Quest/QuestDetail/QuestDetail.jsx"
import Quest from "./pages/Quest/Quest.jsx";
import Character from "./pages/Character/Character/Character.jsx";
import Party from "./pages/Party/Party/Party.jsx";
import ChatList from "./pages/PartyChat/ChatList/ChatList.jsx";
import ChatRoom from "./pages/PartyChat/ChatRoom/ChatRoom.jsx";
import Ranking from "./pages/PartyDetail/Ranking/Ranking.jsx";
import Certified from "./pages/PartyDetail/Certified/Certified.jsx";
import PartyDetail from "./pages/PartyDetail/PartyDetail/PartyDetail.jsx";
import PartyCreate from "./pages/Party/PartyCreate/PartyCreate.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";
import AccountInfo from "./pages/MyPage/AccountInfo/AccountInfo.jsx";
import ProfileEdit from "./pages/MyPage/ProfileEdit/ProfileEdit.jsx";
import ServiceWithdraw from "./pages/MyPage/ServiceWithdraw/ServiceWithdraw.jsx";

// 공통 레이아웃 컴포넌트
const Layout = () => {
  const location = useLocation(); // 현재 브라우저의 주소 경로를 가져옴

  // 현재 경로가 '/' (로그인 화면)이 아닐 때만 BottomNav를 노출하도록 설정
  const showBottomNav =
    location.pathname !== "/" &&
    location.pathname !== "/onboarding" &&
    location.pathname !== "/accountinfo" &&
    location.pathname !== "/profile/servicewithdraw" &&
    location.pathname !== "/questdetail" &&
    location.pathname !== "/floatingadd_questdetail" &&
    !location.pathname.startsWith("/party/");

  return (
    <div
      style={{
        position: "relative", // 하단 바가 이 안에서만 절대 위치(absolute)를 잡도록 기준점이 되어줌.
        maxWidth: "480px", // index.css에서 지정한 최대 넓이
        margin: "0 auto", // 화면 중앙 정렬
        minHeight: "100vh", // 화면 세로 꽉 채우기
      }}
    >
      {/* Outlet - 현재 주소에 맞는 하위 페이지(Home, Quest 등)가 갈아끼워져 나오는 공간 */}
      <Outlet />

      {/* 모든 페이지 하단에 공통으로 노출될 네비게이션 바 */}
      {showBottomNav && <BottomNav />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Login /> },
      { path: "onboarding", element: <OnBoarding /> }, // '/onboarding' 주소일 때
      { path: "home", element: <Home /> }, // '/home' 주소일 때
      { path: "questdetail", element: <QuestDetail /> },
      { path: "floatingadd_questdetail", element: <FloatingAddButtonPage /> }, // '/queestdetail' 주소일 때
      { path: "quest", element: <Quest /> }, // '/quest' 주소일 때
      { path: "party", element: <Party /> }, // '/party' 주소일 때
      { path: "party/chat", element: <ChatList /> },
      { path: "party/chat/:roomId", element: <ChatRoom /> },
      { path: "party/:partyId", element: <PartyDetail /> },
      { path: "party/:partyId/ranking", element: <Ranking /> },
      { path: "party/:partyId/certified", element: <Certified /> },
      { path: "party/create", element: <PartyCreate /> },
      { path: "party/:partyId/edit", element: <PartyCreate /> },
      { path: "character", element: <Character /> },
      { path: "profile/edit", element: <ProfileEdit /> },
      { path: "mypage", element: <MyPage /> },
      { path: "accountinfo", element: <AccountInfo /> },
      { path: "profile/servicewithdraw", element: <ServiceWithdraw /> },
    ],
  },
]);

export default router;
