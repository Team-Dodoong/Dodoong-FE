import React, { useState } from 'react';
import * as S from './CalendarView.style';

function CalendarView({ currentYear = 2026, currentMonth = 2, activeTab, setActiveTab, questList }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDate, setSelectedDate] = useState(10); // 클릭한 날짜 관리

// 1. 해당 월의 1일 시작 요일 (0: 일요일 ~ 6: 토요일)
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
  // 2. 해당 월의 마지막 날짜 (예: 28, 30, 31일)
  const totalDays = new Date(currentYear, currentMonth, 0).getDate();

  // 3. 빈 칸(null)과 실제 날짜(1~totalDays)를 포함하는 캘린더 배열 생성
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null); // 1일 전 빈 칸들
  }
  for (let d = 1; d <= totalDays; d++) {
    calendarDays.push(d); // 실제 날짜
  }

  return (
    <S.Container>
      {/* 캘린더 그리드 */}
      <S.CalendarGrid>
        {days.map((d, idx) => (
          <S.DayHeader key={d} $isSun={idx === 0} $isSat={idx === 6}>
            {d}
          </S.DayHeader>
        ))}

        {calendarDays.map((date, index) => {
          // 1일 시작 전 빈 셀 처리
          if (date === null) {
            return <div key={`empty-${index}`} />;
          }

          const isSelected = date === selectedDate;

          return (
            <S.DateCell
              key={date}
              $isSelected={isSelected}
              onClick={() => setSelectedDate(date)}
            >
              <span>{date}</span>
              {/* 목데이터 점 표시 예시 */}
              {date === 1 && <S.Dot $color="#FF8A3D" />}
              {date === 2 && <S.Dot $color="#CCCCCC" />}
              {date === 3 && <S.Dot $color="#FF8A3D" />}
            </S.DateCell>
          );
        })}
      </S.CalendarGrid>

      {/* 연속 달성 스트릭 배너 */}
      <S.StreakBanner>
        <S.StreakTitle>🔥 연속 <span>3일째</span>에요!</S.StreakTitle>
        <S.StreakDays>
          {days.map((day, i) => (
            <S.StreakItem key={day} $isActive={i <= 2}>
              <span>{day}</span>
              <S.CheckCircle $isActive={i <= 2}>{i <= 2 ? '✓' : ''}</S.CheckCircle>
            </S.StreakItem>
          ))}
        </S.StreakDays>
      </S.StreakBanner>
    </S.Container>
  );
}

export default CalendarView;