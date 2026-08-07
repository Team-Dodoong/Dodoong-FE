import styled from "styled-components";
import DoneQuest from "../../../assets/ic_done_quest_24.svg?react";

import {
  SemiBold_16,
  Regular_14,
  Medium_14,
  Regular_12,
} from "../../../styles/Fonts";

export const Body = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const SectionContent = styled.p`
  ${Regular_14};
  color: var(--Black);
  white-space: pre-line;
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--Gray_1);
`;

export const QuestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--Gray_-1);
  border: 1px solid var(--Gray_2);
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const QuestIcon = styled(DoneQuest)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const QuestText = styled.span`
  ${Medium_14};
  color: var(--Black);
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: ${({ $menu }) => ($menu ? "transparent" : "rgba(0, 0, 0, 0.4)")};
`;

export const ApplyContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  width: 18.4375rem;
  padding: 1.75rem 1.25rem 1.25rem;
  background: var(--White);
  border-radius: 0.5rem;
`;

export const ApplyTitle = styled.p`
  ${SemiBold_16};
  color: var(--Black);
  margin-bottom: 0.75rem;
  text-align: center;
`;

export const ApplySubTitle = styled.p`
  text-align: center;
  ${Medium_14};
`;

export const ApplyButton = styled.button`
  ${SemiBold_16};
  height: 2.75rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: ${({ $cancel }) => ($cancel ? "var(--Gray_5)" : "var(--White)")};
  background: ${({ $cancel }) => ($cancel ? "var(--Gray_2)" : "var(--Black)")};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 3rem;
  background: var(--Gray_0);
  border: 1px solid
    ${({ $isError }) => ($isError ? "var(--Red)" : "var(--Gray_3)")};
  outline: none;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  ${Regular_14};
`;

export const ErrorMessage = styled.p`
  ${Regular_12};
  color: var(--Red);
  min-height: 1rem;
  margin-bottom: 0.75rem;
  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
`;
