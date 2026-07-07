import styled from 'styled-components';

// 1. 전체 바 컨테이너 (하단 고정)
export const NavContainer = styled.nav`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 34px;
  background-color: #ffffff;
  border-top: 1px solid #F7F7F7;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  z-index: 1000;
`;


// 2. 내부 리스트 (균등 정렬)
export const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

// 3. 개별 아이템 (세로 정렬 및 클릭 영역)
export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  height: 100%;
  gap: 6px; /* 아이콘과 글자 사이 간격 */
`;

// 4. 아이콘 이미지 스타일 (img 태그 기반으로 복구)
export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  /*
    활성화되면 주황색(#ff7a00)에 가까운 색상 값을 필터로 계산해 적용합니다.
    비활성화 상태일 때는 약간 흐린 회색으로 유지
  */
  filter: ${(props) => 
    props.$isActive 
      ? 'invert(67%) sepia(60%) saturate(1000%) hue-rotate(365deg) brightness(105%) contrast(101%)' 
      : 'invert(68%) sepia(0%) saturate(12%) hue-rotate(145deg) brightness(91%) contrast(88%)'
  };
  
  transition: filter 0.2s ease;
`;

// 5. 텍스트 라벨 스타일
export const Label = styled.span`
  font-size: 11px;
  font-family: 'Pretendard', sans-serif;
  line-height: 16.8px;
  
  font-weight: ${(props) => (props.$isActive ? '700' : '500')};
  color: ${(props) => (props.$isActive ? '#FF8E3D' : '#9e9e9e')};
  transition: color 0.2s ease, font-weight 0.2s ease;
`;