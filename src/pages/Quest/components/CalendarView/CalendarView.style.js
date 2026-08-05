import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 10px;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`;

export const DayHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 6px;
  color: ${({ $isSun, $isSat }) => ($isSun ? '#FF5A5A' : $isSat ? '#4A90E2' : '#888888')};
`;

export const DateCell = styled.div`
  width: 36px;
  height: 42px;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  font-size: 13px;
  background: ${({ $isSelected }) => ($isSelected ? '#FFF8F0' : 'transparent')};
  border-radius: 8px; /* 👈 요 숫자로 꺾임 정도를 조절 가능 (예: 6px ~ 10px) */

  position: relative;

  span {
    font-weight: ${({ $isSelected }) => ($isSelected ? '700' : '400')};
    color: ${({ $isSelected }) => ($isSelected ? '#FF8A3D' : '#333333')};
    line-height: 1;
  }
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color || '#FF8A3D'};
  position: absolute;
  bottom: 7px;
`;

export const StreakBanner = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  margin-bottom: 20px;
`;

export const StreakTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 12px;

  span {
    color: #FF8A3D;
  }
`;

export const StreakDays = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StreakItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  span {
    font-size: 11px;
    color: ${({ $isActive }) => ($isActive ? '#FF8A3D' : '#888888')};
  }
`;

export const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? '#333333' : '#EFEFEF')};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

{/* export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 12px;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 700;
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? '#333333' : '#CCCCCC')};
  border-bottom: ${({ $active }) => ($active ? '2px solid #FF8A3D' : 'none')};
  cursor: pointer;
`;

export const QuestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const QuestItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${({ $isParty }) => ($isParty ? '#FFF8F0' : '#FFFFFF')};
`;

export const QuestLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

export const PartyTag = styled.span`
  font-weight: 700;
  color: #333333;
`;

export const MoreBtn = styled.button`
  background: none;
  border: none;
  color: #888888;
  font-size: 16px;
  cursor: pointer;
`; */}