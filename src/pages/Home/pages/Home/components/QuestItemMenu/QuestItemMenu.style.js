import styled from 'styled-components';

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 12px;
  z-index: 20;
  min-width: 128px;
  padding: 6px 0;
  border-radius: 12px;
  background-color: var(--White);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 14px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  color: ${({ $danger }) => ($danger ? '#FF4D4F' : '#1A1A1A')};
`;
