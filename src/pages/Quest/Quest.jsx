import React, { useState, useEffect, useCallback } from "react";
import * as S from "./Quest.style.js";
import { useNavigate } from "react-router-dom";

// 공통 기존 컴포넌트
import Header from "../../components/Header/Header";
import BottomNav from "../../components/BottomNav/BottomNav.jsx";
import FloatingButton from "../../pages/Home/pages/Home/components/FloatingAddButton/FloatingAddButton.jsx";
import BottomSheet from "../../pages/Home/pages/Home/components/BottomSheet/BottomSheet.jsx";
// import QuestDetail from '../../pages/Home/pages/QuestDetail/QuestDetail.jsx';

// 하위 작성 컴포넌트
import YearMonthPicker from "./components/YearMonthPicker/YearMonthPicker";
import CalendarView from "./components/CalendarView/CalendarView";
import QuadrantView from "./components/QuadrantView/QuadrantView";

// 🟢 dailyQuestApi의 모든 API 함수 불러오기
import {
  getDailyQuestsByDate,
  toggleCheckDailyQuest,
  postponeDailyQuest,
  deleteDailyQuest,
  deleteRoutine,
} from "../../api/dailyQuestApi.js"; // 파일 경로에 맞춰 조정해주세요.

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const formattedToday = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

function QuestPage() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("calendar"); // 'calendar' | 'quadrant'
  const [showPicker, setShowPicker] = useState(false);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  const [activeTab, setActiveTab] = useState("daily");
  const [dailyQuests, setDailyQuests] = useState([]);
  const [partyQuests, setPartyQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 현재 활성화된 탭에 따라 리스트 선택
  const quests = activeTab === "daily" ? dailyQuests : partyQuests;

  // 🟢 2. 특정 날짜의 퀘스트 목록 조회 API 호출 함수
  const fetchDailyQuests = useCallback(async (date) => {
    setIsLoading(true);
    try {
      const response = await getDailyQuestsByDate(date);
      // 서버 데이터 구조: { status, code, message, data: { date, quests: [...] } }
      const questList = response.data?.quests || [];

      // BottomSheet / UI에서 필요한 필드명 구조 정제
      const formattedQuests = questList.map((q) => ({
        id: q.dailyQuestId,
        dailyQuestId: q.dailyQuestId,
        title: q.content,
        checked: q.isChecked,
        isRoutine: q.isRoutine,
        routineId: q.routineId,
        questCategory: q.questCategory,
      }));

      setDailyQuests(formattedQuests);
    } catch (error) {
      console.error("일일퀘스트 목록 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🟢 3. 선택된 날짜가 변경될 때마다 서버 데이터 조회
  useEffect(() => {
    if (activeTab === "daily" && viewMode === "calendar") {
      fetchDailyQuests(selectedDate);
    }
  }, [selectedDate, activeTab, viewMode, fetchDailyQuests]);

  // 🟢 4. 달성 / 달성 취소 토글
  const handleToggle = async (id) => {
    const targetQuest = dailyQuests.find((q) => q.dailyQuestId === id);
    if (!targetQuest) return;

    const nextChecked = !targetQuest.checked;

    // UI 선반영
    setDailyQuests((prev) =>
      prev.map((q) =>
        q.dailyQuestId === id ? { ...q, checked: nextChecked } : q,
      ),
    );

    try {
      await toggleCheckDailyQuest(id, nextChecked);
    } catch (error) {
      // 실패 시 UI 롤백
      setDailyQuests((prev) =>
        prev.map((q) =>
          q.dailyQuestId === id ? { ...q, checked: !nextChecked } : q,
        ),
      );
      alert("달성 상태 변경에 실패했습니다.");
    }
  };

  // 🟢 5. 일정 미루기 (다음 날로 이동)
  const handlePostpone = async (id) => {
    const targetQuest = dailyQuests.find((q) => q.dailyQuestId === id);
    if (targetQuest?.isRoutine) {
      alert("루틴은 일정을 미룰 수 없습니다.");
      return;
    }

    try {
      await postponeDailyQuest(id);
      alert("일정이 내일로 미뤄졌습니다.");
      fetchDailyQuests(selectedDate); // 목록 새로고침
    } catch (error) {
      alert("일정 미루기에 실패했습니다.");
    }
  };

  // 🟢 6. 오늘만 삭제 (단건 일일퀘스트 삭제)
  const handleDeleteToday = async (id) => {
    if (!window.confirm("오늘의 퀘스트를 삭제하시겠습니까?")) return;

    try {
      await deleteDailyQuest(id);
      fetchDailyQuests(selectedDate); // 목록 새로고침
    } catch (error) {
      alert("퀘스트 삭제에 실패했습니다.");
    }
  };

  // 🟢 7. 루틴 삭제 (영구 삭제)
  const handleDeleteForever = async (id) => {
    const targetQuest = dailyQuests.find((q) => q.dailyQuestId === id);
    if (!targetQuest?.routineId) {
      alert("삭제할 루틴 정보가 존재하지 않습니다.");
      return;
    }

    if (
      !window.confirm(
        "이 루틴을 삭제하시겠습니까? 이후 반복 퀘스트도 함께 삭제됩니다.",
      )
    )
      return;

    try {
      await deleteRoutine(targetQuest.routineId);
      alert("루틴이 성공적으로 삭제되었습니다.");
      fetchDailyQuests(selectedDate); // 목록 새로고침
    } catch (error) {
      alert("루틴 삭제에 실패했습니다.");
    }
  };

  // 8. 페이지 이동 관련 이벤트 핸들러
  const handleEdit = (id) => {
  const targetQuest = dailyQuests.find((q) => q.dailyQuestId === id);
  navigate(`/questdetail/${id}`, { state: { quest: targetQuest } });
};

  const handleAddQuest = () => {
    navigate("/floatingadd_questdetail", { state: { type: activeTab } });
  };

  const handleLeaveParty = (id) => {
    console.log("파티 탈퇴", id);
  };

  return (
    <S.PageWrapper>
      <Header title="퀘스트" />

      <S.ContentArea>
        {/* 상단 컨트롤 영역 (연/월 선택, 뷰 모드 전환) */}

        <S.ControlHeader>
          {viewMode === "calendar" && (
            <S.DateSelectBtn onClick={() => setShowPicker(!showPicker)}>
              {year}. {month} <span>▼</span>
            </S.DateSelectBtn>
          )}

          <S.ToggleViewBtn
            onClick={() =>
              setViewMode(viewMode === "calendar" ? "quadrant" : "calendar")
            }
          >
            ⇆ {viewMode === "calendar" ? "사분면" : "캘린더"}
          </S.ToggleViewBtn>

          {showPicker && (
            <YearMonthPicker
              currentYear={year}
              currentMonth={month}
              onChange={(y, m) => {
                setYear(y);
                setMonth(m);
                // 선택한 연/월의 1일로 selectedDate 업데이트 (예: '2026-08-01')
                const formattedMonth = String(m).padStart(2, "0");
                setSelectedDate(`${y}-${formattedMonth}-01`);
                setShowPicker(false);
            }}
          />
          )}
        </S.ControlHeader>

        {/* 캘린더 / 사분면 메인 영역 */}
        <S.ViewContainer>
          {viewMode === "calendar" ? (
            <CalendarView
              currentYear={year}
              currentMonth={month}
              onSelectDate={(date) => setSelectedDate(date)}
            />
          ) : (
            <QuadrantView />
          )}
        </S.ViewContainer>
      </S.ContentArea>

      {/* Home.jsx와 동일한 방식의 공통 BottomSheet */}
      {viewMode === "calendar" && (
        <BottomSheet
          activeTab={activeTab}
          onTabChange={setActiveTab}
          quests={quests}
          isLoading={isLoading}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onPostpone={handlePostpone}
          onDeleteToday={handleDeleteToday}
          onDeleteForever={handleDeleteForever}
          onLeaveParty={handleLeaveParty}
        />
      )}

      <FloatingButton onClick={handleAddQuest} />
      <BottomNav active="quest" onNavigate={(key) => navigate(`/${key}`)} />
    </S.PageWrapper>
  );
}

export default QuestPage;
