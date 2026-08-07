import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Bold_16,
  Medium_12,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--White);
`;

export const Header = styled.div`
  padding: 0.8125rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--Gray_1);
`;

export const BackIcon = styled(Back)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Gray_5);
  cursor: pointer;
  justify-self: start;
`;

export const HeaderTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
  justify-self: center;
`;

export const MyRankButton = styled.button`
  ${Bold_16};
  color: var(--Main);
  background: none;
  border: none;
  cursor: pointer;
  justify-self: end;
`;

export const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem 2rem 0;
  background:
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 247, 230, 0.5) 35%,
      rgba(255, 247, 230, 0.5) 57%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 247, 230, 0.5) 27%,
      rgba(255, 255, 255, 0.5) 100%
    );
  background-blend-mode: multiply;
  flex: 1;
`;

export const PodiumItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  margin-top: ${({ $first }) => ($first ? "0" : "2rem")};
`;

export const RankName = styled.p`
  font-family: "Jalnan2";
  font-size: 16px;
  font-weight: 400;
  color: var(--Black);
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const CharacterImage = styled.img`
  width: auto;
  height: 8.5rem;
  object-fit: contain;
`;

export const PodiumBase = styled.img`
  width: 80%;
  object-fit: contain;
`;

export const BottomSheet = styled.div`
  background: white;
  border-radius: 20px 20px 0 0;
  padding-top: 0.75rem;
  height: 55vh;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
`;

export const SheetHandle = styled.span`
  display: block;
  width: 3.25rem;
  height: 0.25rem;
  margin: 0 auto;
  border-radius: 999px;
  background: var(--Gray_2);
`;

export const SearchBarWrapper = styled.div`
  padding: 0 1.25rem;
`;

export const RankList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const RankItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--Gray_2);
`;

export const RankBadgeIcon = styled.div`
  width: 1.5625rem;
  height: 1.5625rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const RankNumber = styled.span`
  width: 1.5625rem;
  height: 1.5625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Medium_14};
  color: var(--Gray_4);
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid var(--Gray_2);
`;

export const RankItemName = styled.span`
  flex: 1;
  ${Medium_12};
  color: var(--Black);
`;

export const RankScore = styled.span`
  ${Medium_12};
  color: var(--Main);
`;
