import styled from "styled-components";
import {
  SemiBold_16,
  Medium_14,
  Regular_14,
  SemiBold_14,
  Medium_12,
  SemiBold_12,
} from "../../../styles/Fonts";

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
  border-radius: 0.5rem;
  padding: 1.75rem 1rem 1rem;
  z-index: 1002;
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h3`
  ${SemiBold_14};
  color: var(--Black);
  text-align: center;
  margin-bottom: 1rem;
`;

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-top: 1px solid var(--Gray_1);
  background: var(--Gray_-1);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  ${Medium_12};
  color: var(--Gray_6);
`;

export const InfoValue = styled.span`
  ${SemiBold_12};
  color: var(--Main);
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--Gray_2);
  width: 100%;
`;

export const BuyButton = styled.button`
  width: 100%;
  height: 2.75rem;
  border-radius: 8px;
  border: none;
  background: var(--Black);
  color: var(--White);
  ${SemiBold_16};
  letter-spacing: 0;
  cursor: pointer;
  margin-bottom: 0.25rem;
`;

export const CharacterCost = styled.span`
  color: var(--Main);
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 2.75rem;
  border-radius: 8px;
  border: none;
  background: var(--Gray_2);
  color: var(--Gray_5);
  ${SemiBold_16};
  letter-spacing: 0;
  cursor: pointer;
`;
