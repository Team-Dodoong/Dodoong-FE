import React, { useState } from 'react';
import * as S from './Quest.style.js';

// 공통 기존 컴포넌트
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/BottomNav/BottomNav.jsx';
import FloatingButton from '../../pages/Home/pages/Home/components/FloatingAddButton/FloatingAddButton.jsx';
import BottomSheet from '../../components/BottomSheet/BottomSheet.jsx';
import QuestDetail from '../../pages/Home/pages/QuestDetail/QuestDetail.jsx';


// 하위 작성 컴포넌트
import YearMonthPicker from './components/YearMonthPicker/YearMonthPicker';
import CalendarView from './components/CalendarView/CalendarView';
import QuadrantView from './components/QuadrantView/QuadrantView';


function QuestPage() {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'quadrant'
  const [showPicker, setShowPicker] = useState(false);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);
  const [activeTab, setActiveTab] = useState('daily');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 더미 데이터
  const mockQuadrantData = {
    q1: [{ id: 1, title: '오후 4시 임원면접' }, { id: 2, title: 'EFUB 과제 제출' }],
    q2: [{ id: 3, title: '22시 프로젝트 회의' }],
    q3: [{ id: 4, title: '영어단어 30개 암기' }],
    q4: [{ id: 5, title: '운동 1시간하기' }],
  };

  const mockQuests = [
    { id: 1, title: 'EFUB 세미나 과제 제출', completed: false, tag: '운동 한시간인증' },
    { id: 2, title: 'EFUB 세미나 과제 제출', completed: true, tag: '운동 한시간인증' },
  ];

  return (
    <S.PageWrapper>
      <Header title="퀘스트" />

      <S.ContentArea>
        {/* 상단 컨트롤 영역 */}
        <S.ControlHeader>
          <S.DateSelectBtn onClick={() => setShowPicker(!showPicker)}>
            {year}. {month} <span>▼</span>
          </S.DateSelectBtn>

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

        {/* 뷰 모드에 따른 분기 */}
        {viewMode === 'calendar' ? (
          <CalendarView
            currentYear={year}
            currentMonth={month}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            questList={mockQuests}
          />
        ) : (
          <QuadrantView mockData={mockQuadrantData} />
        )}
      </S.ContentArea>

      {/* 플로팅 버튼 (클릭 시 퀘스트 추가 바텀시트 오픈) */}
      <FloatingButton onClick={() => setIsBottomSheetOpen(true)} />

      {/* 바텀시트 & 퀘스트 상세 컴포넌트 */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <QuestDetail onClose={() => setIsBottomSheetOpen(false)} />
      </BottomSheet>

      <NavigationBar />
    </S.PageWrapper>
  );
}

export default QuestPage;