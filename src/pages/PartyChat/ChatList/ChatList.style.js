import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Regular_12,
  Regular_14,
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
  justify-content: space-between;
  align-items: center;
`;

export const BackIcon = styled(Back)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Black);
  cursor: pointer;
`;

export const HeaderTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const Placeholder = styled.div`
  width: 1.5rem;
`;

export const SearchBarWrapper = styled.div`
  padding: 0.75rem 1.25rem;
`;

export const ChatListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  position: relative;
  cursor: pointer;
  &:active {
    background: var(--Gray_0);
  }
`;

export const ChatImage = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 0.25rem;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ChatInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ChatTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const ChatName = styled.span`
  ${Medium_14};
  color: var(--Black);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatCount = styled.span`
  ${Regular_12};
  color: var(--Gray_4);
`;

export const ChatTime = styled.span`
  ${Regular_12};
  color: var(--Gray_4);
  white-space: nowrap;
`;

export const ChatMessage = styled.p`
  ${Regular_12};
  color: var(--Gray_5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LeaveButton = styled.button`
  ${SemiBold_12};
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--White);
  color: var(--Red);
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  z-index: 10;
`;
