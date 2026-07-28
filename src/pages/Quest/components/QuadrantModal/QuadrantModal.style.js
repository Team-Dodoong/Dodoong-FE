import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const ModalContainer = styled.div`
  width: 85%;
  max-width: 320px;
  background: #ffffff;
  border-radius: 20px;
  padding: 24px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Badge = styled.div`
  background-color: ${({ $bgColor }) => $bgColor || '#FF8A3D'};
  color: ${({ $color }) => $color || '#FFFFFF'};
  font-size: 15px;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 20px;
  margin-top: -38px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

export const List = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #333333;
  cursor: pointer;
`;

export const ItemText = styled.span`
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
`;