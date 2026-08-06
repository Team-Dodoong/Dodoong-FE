import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  background-color: #ffffff;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: -apple-system, sans-serif;
`;

export const Header = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 20px;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const Nickname = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #111111;
  margin-bottom: 4px;
`;

export const UserIdRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const UserId = styled.span`
  font-size: 13px;
  color: #aaaaaa;
`;

export const ArrowIcon = styled.div`
  width: 8px;
  height: 8px;
  border-top: 2px solid #bbbbbb;
  border-right: 2px solid #bbbbbb;
  transform: rotate(45deg);
`;

export const PointBanner = styled.div`
  margin: 0 20px 24px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PointLabel = styled.span`
  font-size: 14px;
  color: #888888;
`;

export const PointValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #ff7a00;
`;

export const MenuDivider = styled.div`
  height: 8px;
  background-color: #f5f5f5;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f9f9f9;
  cursor: pointer;
  
  &:active {
    background-color: #fafafa;
  }
`;

export const MenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const MenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  /* SVG 내부 크기 및 반응형 정렬 처리 */
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    color: var(--Gray_5);

    /* 필요시 아이콘 고유 색상 변경 (SVG 내부 path fill/stroke 처리 방식에 따라) */
    // path { fill: #666666; }
  }
`;

export const MenuText = styled.span`
  font-size: 16px;
  color: var(--Gray_6);
  font-weight: 500;
`;