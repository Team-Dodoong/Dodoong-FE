import styled from 'styled-components';


export const Wrapper = styled.section`
  margin-top: 18px;
  border-radius: 24px 24px 0 0;
  background-color: var(--White);
  box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.04);
`;

export const DragHandle = styled.span`
  display: block;
  width: 36px;
  height: 4px;
  margin: 10px auto 0;
  border-radius: 999px;
  background-color: #E5E5EA;
`;

export const TabRow = styled.div`
  display: flex;
  margin-top: 12px;
  border-bottom: 1px solid #E5E5EA;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 14px 0;
  font-size: 17px;
  font-weight: 700;

  color: ${({ $active }) => ($active ? '#1A1A1A' : '#C7C7CC')};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? '#FF9142' : 'transparent')};
`;
