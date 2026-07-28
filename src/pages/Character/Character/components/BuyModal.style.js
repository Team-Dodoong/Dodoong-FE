import styled from "styled-components";
import { SemiBold_16, Medium_14, Regular_14 } from "../../../../styles/Fonts";

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
  gap: 1rem;
`;

export const ModalTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
  text-align: center;
`;

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--Gray_1);
  border-bottom: 1px solid var(--Gray_1);
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  ${Regular_14};
  color: var(--Gray_5);
`;

export const InfoValue = styled.span`
  ${Medium_14};
  color: var(--Main);
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
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 8px;
  border: none;
  background: var(--Gray_1);
  color: var(--Gray_5);
  ${SemiBold_16};
  cursor: pointer;
`;
