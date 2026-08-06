import styled from "styled-components";
import {
  Regular_14,
  Regular_12,
  SemiBold_16,
  SemiBold_14,
} from "../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem; /* Sheet 모서리(border-radius 24px)가 항상 크림 배경 위에 걸치도록 여유 확보 */
  background-color: #fff8f0;
  background-image: url(${(props) => props.$bgImage});
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
`;

export const PointRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1.25rem 0;
`;

export const CharacterSection = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CharacterMessage = styled.p`
  ${Regular_14};
  letter-spacing: 0;
  position: relative;
  color: #707070;
  background: white;
  padding: 0.75rem 0.75rem;
  align-self: stretch;
  margin: 0 20px;
  text-align: center;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

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
  width: auto;
  height: 8.9375rem;
  object-fit: contain;
  position: relative;
  z-index: 2;
`;

export const CharacterName = styled.p`
  font-family: "Jalnan2";
  font-size: 16px;
  font-weight: 400;
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

export const Sheet = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: white;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  margin-top: -24px;
  position: relative;
  z-index: 2;
`;

export const SheetHandle = styled.span`
  display: block;
  width: 52px;
  height: 4px;
  margin: 12px auto 12px;
  border-radius: 40px;
  background: var(--Gray_2);
`;

export const SearchWrapper = styled.div`
  padding: 0 1.25rem;
  margin-bottom: 0.75rem;
`;

export const TabRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--Gray_2);
  margin: 0;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid var(--Main)" : "2px solid transparent"};
  ${SemiBold_16};
  color: ${({ $active }) => ($active ? "var(--Black)" : "var(--Gray_5)")};
  cursor: pointer;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem 6rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
`;

export const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const CardImage = styled.img`
  width: auto;
  height: 8.25rem;
  object-fit: contain;
`;

export const CardName = styled.p`
  font-family: "Jalnan2";
  font-size: 14px;
  font-weight: 400;
  color: var(--Black);
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: ${({ $equipped }) =>
    $equipped ? "1px solid var(--Gray_2)" : "none"};
  ${SemiBold_14};
  cursor: pointer;
  background: ${({ $equipped, $buy }) =>
    $buy ? "var(--Black)" : $equipped ? "var(--Gray_1)" : "var(--Black)"};
  color: ${({ $equipped }) => ($equipped ? "var(--Gray_5)" : "white")};
`;

export const CharacterCost = styled.span`
  color: var(--Main);
`;

export const DetailButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--Gray_1);
  background: white;
  ${SemiBold_14};
  color: var(--Gray_5);
  cursor: pointer;
`;
