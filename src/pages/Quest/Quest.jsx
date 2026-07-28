import React, { useState } from 'react';
import * as S from './Quest.style.js';
import { useNavigate } from 'react-router-dom';

// 공통 기존 컴포넌트
import Header from '../../components/Header/Header';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import FloatingButton from '../../pages/Home/pages/Home/components/FloatingAddButton/FloatingAddButton.jsx';
import BottomSheet from '../../pages/Home/pages/Home/components/BottomSheet/BottomSheet.jsx';
// import QuestDetail from '../../pages/Home/pages/QuestDetail/QuestDetail.jsx';


// 하위 작성 컴포넌트
import YearMonthPicker from './components/YearMonthPicker/YearMonthPicker';
import CalendarView from './components/CalendarView/CalendarView';
import QuadrantView from './components/QuadrantView/QuadrantView';

// 목데이터
const INITIAL_DAILY_QUESTS = Array.from({ length: 8 }, (_, i) => ({
  id: `daily-${i + 1}`,
  title: 'EFUB 세미나 과제 제출',
  checked: false,
}));

const INITIAL_PARTY_QUESTS = Array.from({ length: 4 }, (_, i) => ({
  id: `party-${i + 1}`,
  tag: '운동 한시간인증',
  title: '런닝 1시간 인증하기',
  checked: false,
}));

// 사분면 뷰 목데이터
const MOCK_QUADRANT_DATA = {
  q1: [{ id: 'q1-1', title: 'EFUB 세미나 과제 제출', checked: false }],
  q2: [{ id: 'q2-1', title: '프로젝트 회의 준비', checked: false }],
  q3: [{ id: 'q3-1', title: '운동 1시간 인증', checked: true }],
  q4: [{ id: 'q4-1', title: '책 읽기', checked: false }],
};

function QuestPage() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'quadrant'
  const [showPicker, setShowPicker] = useState(false);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);

  const [activeTab, setActiveTab] = useState('daily');
  const [dailyQuests, setDailyQuests] = useState(INITIAL_DAILY_QUESTS);
  const [partyQuests, setPartyQuests] = useState(INITIAL_PARTY_QUESTS);

  // 현재 활성화된 탭에 따라 리스트 선택
  const quests = activeTab === 'daily' ? dailyQuests : partyQuests;
  const setQuests = activeTab === 'daily' ? setDailyQuests : setPartyQuests;

  const updateQuests = (updater) => setQuests((prev) => updater(prev));

  // 3. BottomSheet 조작 및 페이지 이동 핸들러
  const handleToggle = (id) => {
    updateQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, checked: !q.checked } : q))
    );
  };

  // ⭐️ [페이지 이동 방식] 퀘스트 수정 시 QuestDetail 별도 페이지로 이동
  const handleEdit = (id) => {
    navigate('/questdetail', { state: { id } });
  };

  // ⭐️ [페이지 이동 방식] 플로팅 버튼(+) 클릭 시 퀘스트 작성 페이지로 이동
  const handleAddQuest = () => {
    navigate('/floatingadd_questdetail', { state: { type: activeTab } });
  };

  const handlePostpone = (id) => {
    console.log('내일로 미루기', id);
  };

  const handleDeleteToday = (id) => {
    updateQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const handleDeleteForever = (id) => {
    updateQuests((prev) => prev.filter((q) => q.id !== id));
  };

  const handleLeaveParty = (id) => {
    console.log('파티 탈퇴', id);
  };

  return (
    <S.PageWrapper>
      <Header title="퀘스트" />

      <S.ContentArea>
        {/* 상단 컨트롤 영역 (연/월 선택, 뷰 모드 전환) */}
        
        <S.ControlHeader>
          {viewMode === 'calendar' && (
          <S.DateSelectBtn onClick={() => setShowPicker(!showPicker)}>
            {year}. {month} <span>▼</span>
          </S.DateSelectBtn>
          )}

          <S.ToggleViewBtn onClick={() => setViewMode(viewMode === 'calendar' ? 'quadrant' : 'calendar')}>
            ⇆ {viewMode === 'calendar' ? '사분면' : '캘린더'}
          </S.ToggleViewBtn>

          {showPicker && (
            <YearMonthPicker
              currentYear={year}
              currentMonth={month}
              onChange={(y, m) => {
                setYear(y);
                setMonth(m);
                setShowPicker(false);
              }}
            />
          )}
        </S.ControlHeader>

        {/* 캘린더 / 사분면 메인 영역 */}
        <S.ViewContainer>
          {viewMode === 'calendar' ? (
            <CalendarView
              currentYear={year}
              currentMonth={month}
            />
          ) : (
            <QuadrantView mockData={MOCK_QUADRANT_DATA} />
          )}
        </S.ViewContainer>
      </S.ContentArea>

      {/* Home.jsx와 동일한 방식의 공통 BottomSheet */}
      {viewMode === 'calendar' && (
      <BottomSheet
        activeTab={activeTab}
        onTabChange={setActiveTab}
        quests={quests}
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