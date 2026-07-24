import React, { useState } from 'react';
import * as S from './CalendarView.style';

function CalendarView({ currentYear, currentMonth, activeTab, setActiveTab, questList }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // 달력 날짜 시뮬레이션
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <S.Container>
      {/* 캘린더 그리드 */}
      <S.CalendarGrid>
        {days.map((d, idx) => (
          <S.DayHeader key={d} $isSun={idx === 0} $isSat={idx === 6}>
            {d}
          </S.DayHeader>
        ))}
        {calendarDays.map((date) => (
          <S.DateCell key={date} $isSelected={date === 10}>
            <span>{date}</span>
            {date === 1 && <S.Dot $color="#FF8A3D" />}
            {date === 2 && <S.Dot $color="#CCCCCC" />}
            {date === 3 && <S.Dot $color="#FF8A3D" />}
          </S.DateCell>
        ))}
      </S.CalendarGrid>

      {/* 연속 달성 스트릭 배너 */}
      <S.StreakBanner>
        <S.StreakTitle>🔥 연속 <span>3일째</span>에요!</S.StreakTitle>
        <S.StreakDays>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <S.StreakItem key={day} $isActive={i <= 2}>
              <span>{day}</span>
              <S.CheckCircle $isActive={i <= 2}>{i <= 2 ? '✓' : ''}</S.CheckCircle>
            </S.StreakItem>
          ))}
        </S.StreakDays>
      </S.StreakBanner>

      {/* 탭 구분 (일일퀘스트 / 파티퀘스트) */}
      <S.TabContainer>
        <S.Tab $active={activeTab === 'daily'} onClick={() => setActiveTab('daily')}>
          일일퀘스트
        </S.Tab>
        <S.Tab $active={activeTab === 'party'} onClick={() => setActiveTab('party')}>
          파티퀘스트
        </S.Tab>
      </S.TabContainer>

      {/* 퀘스트 목록 */}
      <S.QuestList>
        {questList.map((quest) => (
          <S.QuestItem key={quest.id} $isParty={activeTab === 'party'}>
            <S.QuestLeft>
              <input type="checkbox" defaultChecked={quest.completed} />
              {activeTab === 'party' && <S.PartyTag>[{quest.tag}]</S.PartyTag>}
              <span>{quest.title}</span>
            </S.QuestLeft>
            <S.MoreBtn>⋮</S.MoreBtn>
          </S.QuestItem>
        ))}
      </S.QuestList>
    </S.Container>
  );
}

export default CalendarView;