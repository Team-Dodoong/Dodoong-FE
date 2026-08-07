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
  height: 3rem;
  border-bottom: 1px solid var(--Gray_1);
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
  padding: 1rem;
  padding-right: 1.25rem;
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
  border: 1px solid var(--Gray_2);
`;

export const ChatInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ChatTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const ChatName = styled.span`
  ${SemiBold_16};
  color: var(--Black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatCount = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--Gray_9);
  padding: 0.125rem 0.25rem;
  background: var(--Gray_1);
  border-radius: 0.25rem;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.5rem;
  overflow: hidden;
`;

export const ChatTime = styled.span`
  font-size: 0.625rem;
  font-weight: 400;
  color: var(--Gray_6);
  white-space: nowrap;
`;

export const ChatMessage = styled.p`
  ${Regular_12};
  color: var(--Gray_7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LeaveButton = styled.button`
  ${Medium_14};
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
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: var(--Gray_0);
  }
`;
