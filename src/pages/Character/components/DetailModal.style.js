import styled from "styled-components";
import { SemiBold_16, Regular_14, Medium_14 } from "../../../styles/Fonts";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18.4375rem;
  background: white;
  border-radius: 1rem;
  padding: 1.75rem 1.25rem 1.25rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--Gray_5);
  cursor: pointer;
`;

export const CharacterImage = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
`;

export const CharacterName = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const CharacterSubTitle = styled.p`
  ${Medium_14};
  color: var(--Gray_6);
`;

export const CharacterDescription = styled.p`
  ${Regular_14};
  color: var(--Gray_5);
  text-align: center;
  line-height: 1.7;
  white-space: pre-line;
`;

export const BuyButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: none;
  background: var(--Black);
  color: var(--Main);
  ${SemiBold_16};
  cursor: pointer;
  margin-top: 0.5rem;
`;
