import CheckIcon from '../../../../../../assets/ic_streak_24.svg?react';
import FlameIcon from '../../../../../../assets/ic_flame.svg?react';
import * as S from './StreakTracker.style';

const WEEK_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 연속 출석일 + 이번 주 요일별 체크 현황
function StreakTracker({ streakDays, checkedDays, today }) {
  return (
    <S.Wrapper>
      <S.StreakText>
        <FlameIcon size={16} />
        연속 <strong>{streakDays}일째</strong>에요!
      </S.StreakText>

      <S.WeekRow>
        {WEEK_LABELS.map((day) => {
          const isToday = day === today;
          const isChecked = checkedDays.includes(day);
          return (
            <S.DayColumn key={day}>
              <S.DayLabel $isToday={isToday} $isSunday={day === 'Sun'}>
                {day}
              </S.DayLabel>
              <S.DayCircle $checked={isChecked} $isToday={isToday}>
                {isChecked && <CheckIcon size={12} />}
              </S.DayCircle>
            </S.DayColumn>
          );
        })}
      </S.WeekRow>
    </S.Wrapper>
  );
}

export default StreakTracker;
