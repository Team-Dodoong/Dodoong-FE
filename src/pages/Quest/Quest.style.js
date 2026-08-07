import styled from "styled-components";

export const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #ffffff;
`;

export const ContentArea = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 80px; /* 아래쪽 바텀시트 및 네비바 공간 확보 */
  box-sizing: border-box;
`;

export const ControlHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 12px;
  width: 100%;
  position: relative;
`;

export const DateSelectBtn = styled.button`
  font-size: 1.5rem;
  font-weight: 700;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #111111;
  margin-left: 1rem;

  span {
    font-size: 12px;
    color: #888888;
  }
`;

export const DropdownIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const ToggleViewBtn = styled.button`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #444444;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  margin-left: auto;
  // display: flex;
  // align-items: center;
  // gap: 4px;
`;

export const ViewContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
