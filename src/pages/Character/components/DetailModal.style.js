import styled from "styled-components";
import {
  SemiBold_16,
  Regular_12,
  Medium_14,
  SemiBold_14,
} from "../../../styles/Fonts";
import Close from "../../../assets/ic_linear_cancel_24.svg?react";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1001;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18.4375rem;
  background: white;
  border-radius: 1.25rem;
  padding: 56px 1.25rem 1.25rem;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseButton = styled(Close)`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #202023;
  cursor: pointer;
`;

export const CharacterImage = styled.img`
  width: auto;
  height: 154px;
  object-fit: contain;
`;

export const CharacterName = styled.h3`
  font-family: "Jalnan2";
  font-size: 16px;
  font-weight: 400;
  color: var(--Black);
`;

export const CharacterSubTitle = styled.p`
  ${SemiBold_14};
  color: var(--Gray_7);
`;

export const CharacterDescription = styled.p`
  ${Regular_12};
  color: var(--Gray_7);
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
  padding: 0 10px;
`;

export const BuyButton = styled.button`
  width: 100%;
  height: 2.25rem;
  border-radius: 4px;
  border: none;
  background: var(--Black);
  color: var(--White);
  ${SemiBold_14};
  cursor: pointer;
  margin-top: 0.25rem;
`;

export const CharacterCost = styled.span`
  color: var(--Main);
`;
