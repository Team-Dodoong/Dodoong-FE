import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const Card = styled.div`
  width: min(320px, calc(100% - 48px));
  background-color: var(--White);
  border-radius: 20px;
  padding: 28px 20px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;
