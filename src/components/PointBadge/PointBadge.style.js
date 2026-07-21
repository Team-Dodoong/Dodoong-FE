import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: fit-content; 
  align-items: center;
  gap: 6px;
  align-self: flex-end;
  padding: 6px 14px 6px 6px;
  margin-left: auto;
`;

export const Coin = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #FFB800;
  color: var(--White);
  font-size: 11px;
  font-weight: 800;
`;

export const Amount = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1A1A1A;
`;
