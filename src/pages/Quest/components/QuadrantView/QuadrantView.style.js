import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px 0; /* 여백을 자연스럽게 조정 */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 상하 가운데 정렬 */
  min-height: calc(100vh - 200px); /* 헤더와 컨트롤바를 제외한 남은 여백 수용 */
  padding: 16px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid Var(--Gray_2);
  border-radius: 16px;
  padding: 16px;
  position: relative;
  min-height: 340px;
  cursor: pointer;
`;

export const Badge = styled.div`
  display: inline-block;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 12px;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #333333;
`;

export const Title = styled.span`
  font-size: 13px;
  font-weight: 500; 
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;