import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import Exit from "../../../assets/ic_out_24.svg?react";
import Chevron from "../../../assets/ic_regular_chevron_down_24.svg?react";
import Send from "../../../assets/ic_send_24.svg?react";
import {
  SemiBold_16,
  Regular_12,
  Medium_12,
  SemiBold_12,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const Header = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--Gray_1);
`;

export const BackIcon = styled(Back)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Black);
  cursor: pointer;
  flex-shrink: 0;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const HeaderCount = styled.span`
  ${SemiBold_12};
  color: var(--Gray_9);
  padding: 0.125rem 0.25rem;
  background: var(--Gray_1);
  border-radius: 0.25rem;
`;

export const ExitIcon = styled(Exit)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Red);
  cursor: pointer;
  flex-shrink: 0;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NoticeText = styled.p`
  ${Regular_12};
  color: var(--Gray_4);
  text-align: center;
`;

export const DateText = styled.p`
  ${Regular_12};
  color: var(--Gray_6);
  padding: 0.25rem 0.75rem;
  background: var(--Gray_0);
  border-radius: 50px;
  text-align: center;
  margin: 0.75rem 0;
  align-self: center;
`;

export const MyMessageRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MyBubble = styled.div`
  ${Regular_12};
  background: var(--Black);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ $last }) => ($last ? "1rem 1rem 0 1rem" : "1rem")};
  max-width: 70%;
  word-break: break-word;
  white-space: pre-line;
`;

export const OtherMessageRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
`;

export const AvatarSpacer = styled.div`
  width: 2.25rem;
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const OtherContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 70%;
  min-width: 0;
`;

export const OtherName = styled.p`
  ${Regular_12};
  color: var(--Black);
`;

export const OtherBubble = styled.div`
  ${Regular_12};
  background: var(--Gray_1);
  color: var(--Black);
  padding: 0.5rem 0.75rem;
  border-radius: ${({ $last }) => ($last ? "1rem 1rem 1rem 0" : "1rem")};
  width: fit-content;
  max-width: 100%;
  word-break: break-word;
  white-space: pre-line;
`;

export const ScrollButton = styled.button`
  position: absolute;
  bottom: 6.5rem;
  right: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

export const ChevronIcon = styled(Chevron)`
  width: 1.25rem;
  height: 1.25rem;
  color: #6f6f6f;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem 2.5rem;
  border-top: 1px solid var(--Gray_1);
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  ${Medium_12};
  padding: 0.75rem 1.25rem;
  border-radius: 40px;
  background: var(--Gray_0);
  color: var(--Black);
  &::placeholder {
    color: var(--Gray_5);
  }
`;

export const SendButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? "var(--Black)" : "var(--Gray_2)")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
`;

export const SendIcon = styled(Send)`
  width: 1.25rem;
  height: 1.25rem;
  color: white;
`;
