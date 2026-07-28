import styled from "styled-components";
import { Medium_12 } from "../../styles/Fonts";

// 1. 전체 바 컨테이너 (하단 고정)
export const NavContainer = styled.nav`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 34px;
  border-top: 1px solid #f7f7f7;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  z-index: 199;
  background-color: var(--White);
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

// 4. 아이콘 이미지 스타일
export const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

// 5. 텍스트 라벨 스타일
export const Label = styled.span`
  ${Medium_12};
  line-height: 16.8px;

  font-weight: ${(props) => (props.$isActive ? "700" : "500")};
  color: ${(props) => (props.$isActive ? "var(--Main)" : "var(--Gray_5)")};
  transition:
    color 0.2s ease,
    font-weight 0.2s ease;
`;
