import styled from 'styled-components';
import { Bold_14, Medium_14 } from "../../../../../../styles/Fonts";

export const Message = styled.p`
  ${Medium_14}
  text-align: center;
`;

export const LevelText = styled.p`
  ${Bold_14}
  margin-top: 4px;
  text-align: center;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px 0;
  border-radius: 14px;
  background-color: var(--Black);
  color: var(--White);
  font-family : "Pretendard";
  font-size : 16px;
`;
