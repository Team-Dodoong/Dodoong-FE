import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import Chevron from "../../../assets/ic_regular_chevron_down_24.svg?react";
import Check from "../../../assets/ic_thin_check_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Regular_12,
  Regular_14,
  Bold_14,
  Medium_12,
  Bold_18,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Body = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FilterWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  ${Medium_14};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--Gray_2);
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  color: var(--Black);
`;

export const ChevronIcon = styled(Chevron)`
  width: 1rem;
  height: 1rem;
  color: var(--Gray_6);
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;
`;

export const FilterMenu = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  z-index: 100;
  width: 9.6875rem;
  overflow: hidden;
`;

export const FilterMenuItem = styled.div`
  ${Medium_14};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  color: var(--Black);
  cursor: pointer;
  &:hover {
    background: var(--Gray_0);
  }
`;

export const CheckIcon = styled(Check)`
  width: 1rem;
  height: 1rem;
  color: var(--Main);
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SectionTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const DateText = styled.span`
  ${Medium_12};
  color: var(--Gray_5);
`;

export const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const ProgressLabel = styled.span`
  ${Regular_14};
  color: var(--Gray_4);
`;

export const MainColorLabel = styled.span`
  color: var(--Main);
`;

export const ProgressPercent = styled.span`
  ${Bold_18};
  color: var(--Main);
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background: #ededed;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: var(--Main);
  border-radius: 999px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--Gray_1);
`;

export const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const DateLabel = styled.p`
  ${SemiBold_16};
  color: var(--Black);
  align-items: center;
`;

export const DateSubLabel = styled.span`
  ${Medium_14};
  color: var(--Gray_4);
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

export const RecordCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const MemberImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
`;

export const MemberName = styled.p`
  ${Medium_14};
  color: var(--Black);
`;

export const MemberTime = styled.p`
  ${Regular_12};
  color: var(--Gray_4);
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const MemberWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;
export const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--Gray_2);
`;

export const CertImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--Gray_2);
`;

export const PendingBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: var(--Gray_0);
  border: 1px solid var(--Gray_2);
  display: flex;
  align-items: center;
  justify-content: center;
  ${Regular_12};
  color: var(--Gray_5);
  text-align: center;
  white-space: pre-line;
`;
