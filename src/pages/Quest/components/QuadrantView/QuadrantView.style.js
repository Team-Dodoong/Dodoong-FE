import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 16px;
  padding: 12px;
  position: relative;
  min-height: 220px;
  cursor: pointer;
`;

export const Badge = styled.div`
  display: inline-block;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  accent-color: #333333;
`;

export const Title = styled.span`
  font-size: 11px;
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;