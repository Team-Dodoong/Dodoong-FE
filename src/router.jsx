// src/router.jsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Home from "./pages/Home/Home.jsx";
import Quest from "./pages/Quest/Quest/Quest.jsx";
import Character from "./pages/Character/Character/Character.jsx";
import Party from "./pages/Party/Party/Party.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";

// 공통 레이아웃 컴포넌트
const Layout = () => {
  return (
    <div style={{ 
      position: 'relative',    // 하단 바가 이 안에서만 절대 위치(absolute)를 잡도록 기준점이 되어줌.
      maxWidth: '480px',       // index.css에서 지정한 최대 넓이
      margin: '0 auto',        // 화면 중앙 정렬
      minHeight: '100vh',      // 화면 세로 꽉 채우기
    }}>
      {/* Outlet - 현재 주소에 맞는 하위 페이지(Home, Quest 등)가 갈아끼워져 나오는 공간 */}
      <Outlet />

      {/* 모든 페이지 하단에 공통으로 노출될 네비게이션 바 */}
      {/*<BottomNav />*/}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> }, // '/' 주소일 때
      { path: "quest", element: <Quest /> }, // '/quest' 주소일 때
      { path: "party", element: <Party /> }, // '/party' 주소일 때
      { path: "character", element: <Character /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
