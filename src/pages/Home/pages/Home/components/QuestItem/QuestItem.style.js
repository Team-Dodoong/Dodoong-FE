import styled from 'styled-components';


export const Wrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px;
  border-radius: 12px;
  background-color: ${({ $highlighted }) =>
    $highlighted ? '#FFF1E4' : 'transparent'};
  list-style: none;
`;

export const Checkbox = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1.6px solid
    ${({ $checked }) => ($checked ? '#1A1A1A' : '#C7C7CC')};
  background-color: ${({ $checked }) =>
    $checked ? '#1A1A1A' : 'var(--White)'};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.p`
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: '#1A1A1A';
  text-align: left;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
  opacity: ${({ $checked }) => ($checked ? 0.5 : 1)};
`;

export const Tag = styled.span`
  color: #FF9142;
  font-weight: 700;
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-shrink: 0;
`;
