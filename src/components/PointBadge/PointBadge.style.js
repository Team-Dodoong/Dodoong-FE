import styled from "styled-components";
import pointIcon from "../../assets/img_point_80.png";
import { Medium_14 } from "../../styles/Fonts";

export const Wrapper = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  align-self: flex-end;
  padding: 6px 20px 16px 6px;
  margin-left: auto;
`;

export const Coin = styled.img.attrs({ src: pointIcon, alt: "" })`
  width: 20px;
  height: 20px;
`;

export const Amount = styled.span`
  ${Medium_14};
  color: var(--Black);
`;

export const AmountNumber = styled.span`
  color: var(--Main);
`;
