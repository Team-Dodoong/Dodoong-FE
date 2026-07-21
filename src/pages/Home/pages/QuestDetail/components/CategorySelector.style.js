import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
`;

export const Chip = styled.button`
  padding: 14px 0;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 400;

  color: ${({ $active }) => ($active ? '#FF9142' : '#C7C7CC')};
  background-color: ${({ $active }) =>
    $active ? '#FFF1E4' :  '#F2F2F4'};
  border: 1.4px solid
    ${({ $active }) => ($active ? '#FF9142' : 'transparent')};
`;
