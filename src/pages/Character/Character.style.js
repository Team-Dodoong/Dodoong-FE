import styled from "styled-components";
import Chat from "../../assets/ic_chat_24.svg?react";
import Search from "../../assets/ic_search_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Regular_14,
  Regular_12,
  Medium_12,
} from "../../styles/Fonts";

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

export const HeaderTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const ChatIcon = styled(Chat)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Gray_5);
  cursor: pointer;
`;

export const PointRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.25rem;
`;

export const CharacterSection = styled.div`
  background: #fff8f0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CharacterMessage = styled.p`
  ${Regular_12};
  position: relative;
  color: var(--Gray_6);
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 999px;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 5px 0 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

export const CharacterArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
`;

export const Decoration = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 17.5rem;
  pointer-events: none;
  z-index: 1;
`;

export const MainCharacterImage = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: contain;
  position: relative;
  z-index: 2;
`;

export const CharacterName = styled.p`
  ${SemiBold_16};
  color: var(--Black);
`;

export const ExpBarWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border-radius: 999px;
  padding: 0.375rem 0.875rem;
`;
export const ExpBar = styled.div`
  flex: 1;
  height: 6px;
  background: var(--Gray_2);
  border-radius: 999px;
  overflow: hidden;
`;

export const ExpFill = styled.div`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: var(--Main);
  border-radius: 999px;
`;

export const ExpText = styled.span`
  ${Regular_12};
  color: var(--Gray_4);
  white-space: nowrap;
`;

export const ExpCurrent = styled.span`
  ${Regular_12};
  color: var(--Main);
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 1.25rem;
  padding: 0.625rem 1rem;
  background: var(--Gray_0);
  border-radius: 999px;
  border: 1px solid var(--Gray_2);
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  ${Regular_14};
  color: var(--Black);
  &::placeholder {
    color: var(--Gray_4);
  }
`;

export const SearchIcon = styled(Search)`
  width: 1.25rem;
  height: 1.25rem;
  color: var(--Gray_4);
`;

export const TabRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--Gray_1);
  margin: 0 1.25rem;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid var(--Black)" : "2px solid transparent"};
  ${Medium_14};
  color: ${({ $active }) => ($active ? "var(--Black)" : "var(--Gray_4)")};
  cursor: pointer;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
`;

export const CardImage = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: contain;
`;

export const CardName = styled.p`
  ${Medium_14};
  color: var(--Black);
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  ${Medium_12};
  cursor: pointer;
  background: ${({ $equipped, $buy }) =>
    $buy ? "var(--Black)" : $equipped ? "var(--Gray_2)" : "var(--Black)"};
  color: ${({ $equipped }) => ($equipped ? "var(--Gray_5)" : "white")};
`;

export const DetailButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--Gray_2);
  background: white;
  ${Medium_12};
  color: var(--Gray_5);
  cursor: pointer;
`;
