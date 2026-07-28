import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Regular_14,
  Bold_14,
  Medium_12,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff8f0;
`;

export const Header = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px var(--Gray_1);
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

export const MyRankButton = styled.button`
  ${Medium_14};
  color: var(--Main);
  background: none;
  border: none;
  cursor: pointer;
`;

export const Podium = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem 2rem 0;
  background: #fff8f0;
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
  ${Medium_12};
  color: var(--Black);
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const CharacterImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const PodiumBase = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const BottomSheet = styled.div`
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 1.25rem;
  height: 55vh;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--Gray_1);
`;

export const RankBadge = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Bold_14};
  background: ${({ $rank }) =>
    $rank === 1 ? "#FFD700" : $rank === 2 ? "#C0C0C0" : "#CD7F32"};
  color: white;
  flex-shrink: 0;
`;

export const RankNumber = styled.span`
  width: 1.5rem;
  text-align: center;
  ${Medium_14};
  color: var(--Gray_5);
  flex-shrink: 0;
`;

export const RankItemName = styled.span`
  flex: 1;
  ${Medium_14};
  color: var(--Black);
`;

export const RankScore = styled.span`
  ${Regular_14};
  color: var(--Main);
`;
