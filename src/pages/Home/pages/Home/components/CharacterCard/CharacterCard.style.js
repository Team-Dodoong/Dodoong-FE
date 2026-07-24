import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 360px; /* 상황에 맞게 조절 */
  margin: 0 auto;
`;

// 1. 인사말 말풍선 (흰색 배경 + 말풍선 꼬리 추가)
export const GreetingBubble = styled.div`
  position: relative;
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  padding: 12px 20px;
  border-radius: 16px;
  background-color: #ffffff;
  color: #555555;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);

  strong {
    color: #e88b4d; /* 필요시 var(--Main)으로 변경 */
    font-weight: 700;
  }

  /* 말풍선 꼬리 */
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px 6px 0 6px;
    border-style: solid;
    border-color: #ffffff transparent transparent transparent;
  }
`;

// 2. 캐릭터 영역 (은은한 크림빛 방사형 그라데이션)
export const CharacterArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 10px 0;
  /* background 관련 속성은 전부 지워주세요! */
`;

export const CharacterImage = styled.img`
  width: 170px;
  height: 170px;
  object-fit: contain;
  z-index: 2;
`;

export const Decoration = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;             /* 전체 너비에 맞춤 */
  max-width: 280px;        /* 필요시 장식 위치 폭 조절 (260~300px 사이로 조정해보세요) */
  pointer-events: none;    /* 클릭 방지 */
  z-index: 1;              /* 캐릭터(z-index: 2) 뒤에 배치 */
`;

export const CharacterName = styled.p`
  font-family: "Jalnan2", "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-top: 8px;
  color: #333333;
`;

// 3. 프로그레스 바 (흰색 둥근 바깥 컨테이너 추가)
export const ProgressWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #ffffff;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.02);
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background-color: #f0f0f0;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background-color: #e88b4d; /* 필요시 var(--Main)으로 변경 */
  width: ${({ $percent }) => $percent}%;
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #a0a0a0;
  white-space: nowrap;

  span {
    color: #e88b4d; /* 현재 경험치 숫자에만 주황색 적용 */
  }
`;
