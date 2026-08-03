import React, { useState, useEffect } from 'react';
import * as S from './CalendarView.style';

// 🟢 1. 캘린더 API 불러오기 (프로젝트 경로에 맞게 확인해주세요)
import { getCalendarQuests } from '../../../../api/dailyQuestApi';
import { getStreaks } from '../../../../api/streakApi'; // 🟢 스트릭 API 추가

// 🟢 1. 현재 날짜를 동적으로 가져옵니다.
const today = new Date();
const defaultYear = today.getFullYear();
const defaultMonth = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
const defaultDateNum = today.getDate();

function CalendarView({
  currentYear = defaultYear,
  currentMonth = defaultMonth,
  onSelectDate,
}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // 🟢 3. 선택된 날짜 숫자도 오늘 날짜로 기본 세팅
  const [selectedDateNum, setSelectedDateNum] = useState(defaultDateNum);
  const [calendarData, setCalendarData] = useState({});
  const [streakDays, setStreakDays] = useState(0);

  // 🟢 2. 연/월 변경 시 백엔드 캘린더 데이터 조회
  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await getCalendarQuests(currentYear, currentMonth);
        const daysList = response.data?.days || [];
        
        // 날짜별 조회 속도를 위해 객체(Map) 형태로 정제
        const dateMap = {};
        daysList.forEach((item) => {
          // item 예시: { date: '2026-08-01', totalCount: 3, checkedCount: 3 }
          dateMap[item.date] = item;
        });

        setCalendarData(dateMap);
      } catch (error) {
        console.error('캘린더 데이터 로딩 실패:', error);
      }
    };

    fetchCalendar();
  }, [currentYear, currentMonth]);

  // 2. 스트릭 정보 조회 API
  useEffect(() => {
    const fetchStreakInfo = async () => {
      try {
        const res = await getStreaks();
        if (res.data) {
          setStreakDays(res.data.consecutiveDays || 0);
        }
      } catch (error) {
        console.error('스트릭 조회 중 오류 발생:', error);
      }
    };

    fetchStreakInfo();
  }, []);

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

  // 🟢 4. 날짜 클릭 핸들러 (부모 QuestPage로 YYYY-MM-DD 전달)
  const handleDateClick = (dateNum) => {
    setSelectedDateNum(dateNum);

    if (onSelectDate) {
      const formattedMonth = String(currentMonth).padStart(2, '0');
      const formattedDay = String(dateNum).padStart(2, '0');
      const fullDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
      
      onSelectDate(fullDateStr);
    }
  };

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

          const isSelected = date === selectedDateNum;

          // YYYY-MM-DD 키 생성하여 해당 날짜의 API 데이터 조회
          const formattedMonth = String(currentMonth).padStart(2, '0');
          const formattedDay = String(date).padStart(2, '0');
          const dateKey = `${currentYear}-${formattedMonth}-${formattedDay}`;
          
          const dayInfo = calendarData[dateKey];

          return (
            <S.DateCell
              key={date}
              $isSelected={isSelected}
              onClick={() => setSelectedDate(date)}
            >
              <span>{date}</span>

              {/* 🟢 퀘스트 달성 상태 Dot 표시 */}
              {dayInfo && dayInfo.totalCount > 0 && (
                <S.Dot
                  $color={
                    dayInfo.checkedCount === dayInfo.totalCount
                      ? '#FF8A3D' // 모두 달성 시 주황색
                      : '#CCCCCC' // 일부/미달성 시 회색
                  }
                />
              )}
            </S.DateCell>
          );
        })}
      </S.CalendarGrid>

      {/* 연속 달성 스트릭 배너 */}
      <S.StreakBanner>
        <S.StreakTitle>
          🔥 연속 <span>{streakDays}일째</span>에요!
        </S.StreakTitle>
        <S.StreakDays>
          {days.map((day, i) => (
            <S.StreakItem key={day} $isActive={i < streakDays}>
              <span>{day}</span>
              <S.CheckCircle $isActive={i < streakDays}>
                {i < streakDays ? '✓' : ''}
              </S.CheckCircle>
            </S.StreakItem>
          ))}
        </S.StreakDays>
      </S.StreakBanner>
    </S.Container>
  );
}

export default CalendarView;