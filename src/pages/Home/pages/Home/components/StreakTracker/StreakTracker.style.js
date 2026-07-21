import styled from 'styled-components';


export const Wrapper = styled.section`
  margin-top: 16px;
  padding: 16px;
  border-radius: 20px;
  background-color: var(--White);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

export const StreakText = styled.p`
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #1A1A1A;

  strong {
    color: #FF9142;
    font-weight: 700;
  }
`;

export const WeekRow = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`;

export const DayColumn = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  list-style: none;
`;

export const DayLabel = styled.span`
  font-size: 12px;
  font-weight: 500;

  color: ${({ $isToday, $isSunday }) => {
    if ($isToday) return '#FF9142';
    if ($isSunday) return '#FF5C5C';
    return '#8E8E93';
  }};
  font-weight: ${({ $isToday }) => ($isToday ? 700 : 500)};
`;

export const DayCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $checked }) =>
    $checked ? '#1A1A1A' : '#E5E5EA'};
  border: ${({ $isToday }) =>
    $isToday ? `2px solid #FF9142` : '2px solid transparent'};
  box-sizing: border-box;
`;
