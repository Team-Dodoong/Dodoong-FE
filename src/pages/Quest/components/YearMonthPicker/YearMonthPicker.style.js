import styled from 'styled-components';

export const PickerContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 100;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const SelectButton = styled.button`
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 10px;
    color: #888888;
  }
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  width: 100px;
  max-height: 200px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  list-style: none;
  padding: 6px 0;
  z-index: 101;
`;

export const DropdownItem = styled.li`
  padding: 8px 14px;
  font-size: 14px;
  color: ${({ $isSelected }) => ($isSelected ? '#FF8A3D' : '#333333')};
  font-weight: ${({ $isSelected }) => ($isSelected ? '700' : '400')};
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;