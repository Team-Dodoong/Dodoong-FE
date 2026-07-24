import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px 8px;
  background-color: var(--White);
  border-bottom: 1px #F1F1F1 solid;
`;

export const Logo = styled.h1`
  font-family: "Jalnan2";
  font-size: 14px;
  font-weight: 400;
  line-height : 28px;
  color: #FF974D;
  word-wrap: break-word;
  margin: 0 auto;
  letter-spacing: -0.3px;
  text-align: center;
`;

export const ChatButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* export const NotificationDot = styled.span`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${colors.primary};
`; */ 
