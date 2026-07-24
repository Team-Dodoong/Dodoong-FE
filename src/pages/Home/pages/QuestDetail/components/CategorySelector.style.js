import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  /* 선택(selected) 상태별 스타일 정의 */
  background-color: ${props => (props.$selected ? '#FFF7ED' : '#F8F9FA')};
  border: ${props => (props.$selected ? '1.5px solid #FF9142' : '1.5px solid transparent')};
  color: ${props => (props.$selected ? '#FF9142' : '#C7C7CC')};

  svg {
    flex-shrink: 0;
  }
`;
