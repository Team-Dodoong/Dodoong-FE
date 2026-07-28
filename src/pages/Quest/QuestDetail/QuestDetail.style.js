import styled from 'styled-components';
import { Regular_14 } from "../../../styles/Fonts";

export const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--White);
  padding-bottom: 100px; /* 하단 고정 BottomCta 영역 확보 */
`;

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px #F1F1F1 solid;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
`;

export const TopTitle = styled.h1`
  font-size: 17px;
  font-weight: 700;
  color: #1A1A1A;
`;

export const SaveButton = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: #FF9142;
  font-weight: 700;
`;

export const Section = styled.section`
  padding: 20px 20px 24px;
`;

export const SectionLabel = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1A1A1A;
`;

export const TextareaWrapper = styled.div`
  position: relative;
`;

// 반복헤더 (타이틀 + 토글버튼)
export const RepeatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const RepeatTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RepeatSubText = styled.p`
  font-size: 13px;
  color: #a1a1a1;
`;

// 커스텀 스위치 토글
export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e2e2e2;
    transition: 0.3s;
    border-radius: 28px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #ff9142;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
`;

// 요일 선택 버튼 그룹
export const DaysGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const DayButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  ${Regular_14};
  // font-size: 15px;
  // font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ $active }) => ($active ? '#FF9142' : '#F1F1F1')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#A1A1A1')};
`;

// 반복종료 날짜 행
export const EndDateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #f1f1f1;
  cursor: pointer;
`;

export const EndDateLabel = styled.span`
  font-size: 15px;
  color: #8e8e93;
`;

export const EndDateValue = styled.span`
  font-size: 15px;
  color: #767676;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-size: 13px;
    color: #c7c7cc;
  }
`;
