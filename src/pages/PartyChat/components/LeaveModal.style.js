import styled from "styled-components";
import { Medium_14, SemiBold_16 } from "../../../styles/Fonts";

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
  border-radius: 0.5rem;
  padding: 1.75rem 1.25rem 1.25rem;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ModalTitle = styled.p`
  ${Medium_14};
  color: var(--Black);
  text-align: center;
  white-space: pre-line;
  line-height: 1.6;
`;

export const ModalSubTitle = styled.p`
  ${Medium_14};
  color: var(--Red);
  text-align: center;
  margin-bottom: 1rem;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

export const ModalButton = styled.button`
  flex: 1;
  height: 2.75rem;
  border-radius: 0.5rem;
  border: none;
  ${SemiBold_16};
  cursor: pointer;
  background: ${({ $cancel }) => ($cancel ? "var(--Gray_2)" : "var(--Red)")};
  color: ${({ $cancel }) => ($cancel ? "var(--Gray_5)" : "white")};
`;
