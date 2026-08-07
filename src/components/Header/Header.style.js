import styled from "styled-components";
import { SemiBold_16 } from "../../styles/Fonts";

export const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 48px;
  padding: 0 20px;
  background-color: var(--White);
  border-bottom: 1px var(--Gray_1) solid;
`;

export const Logo = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Jalnan2";
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  color: var(--Main);
  word-wrap: break-word;
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

export const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${SemiBold_16};
  color: var(--Black);
  margin: 0;
  text-align: center;
  white-space: nowrap;
`;

export const ChatButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Black);
`;
