import styled from "styled-components";
import DoneQuest from "../../../assets/ic_done_quest_24.svg?react";
import Trophy from "../../../assets/ic_trophy.svg?react";
import Fire from "../../../assets/ic_fire.svg?react";
import Dart from "../../../assets/ic_dart.svg?react";
import Smile from "../../../assets/ic_smile.svg?react";
import Camera from "../../../assets/ic_filled_camera_24.svg?react";
import More from "../../../assets/ic_bold_chevron_right_24.svg?react";
import {
  SemiBold_16,
  Regular_14,
  Medium_14,
  Medium_12,
  Regular_12,
  Bold_14,
} from "../../../styles/Fonts";

export const Body = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 27.5px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
`;

export const TrophyIcon = styled(Trophy)`
  width: 1.875rem;
  height: 2.1875rem;
`;

export const FireIcon = styled(Fire)`
  width: 2.25rem;
  height: 2.25rem;
`;

export const DartIcon = styled(Dart)`
  width: 2.5rem;
  height: 2.625rem;
`;

export const SmileIcon = styled(Smile)`
  width: 2.5rem;
  height: 2.5rem;
`;

export const StatBackground = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 999px;
  background: var(--Gray_-1);
  border: 1px solid var(--Gray_0);
  display: grid;
  place-items: center;
  margin-bottom: 0.375rem;
`;

export const StatLabel = styled.p`
  ${Medium_12};
  color: var(--Black);
  text-align: center;
`;

export const StatValue = styled.p`
  ${Bold_14};
  color: var(--Main);
`;

export const StatDivider = styled.div`
  width: 100%;
  height: 1.25rem;
  background: var(--Gray_-1);
`;

export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--Gray_1);
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuestCtaGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const EmptyCheckbox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid var(--Gray_3);
  border-radius: 2px;
  flex-shrink: 0;
  background: var(--White);
`;

export const QuestText = styled.span`
  ${Medium_14};
  color: var(--Black);
`;

export const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecordMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const MoreText = styled.span`
  ${Regular_12};
  color: #202023;
  cursor: pointer;
`;

export const MoreIcon = styled(More)`
  width: 0.8125rem;
  height: 0.8125rem;
  color: var(--Gray_5);
`;

export const RecordRow = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--Gray_-1);
  border-radius: 0.25rem;
  overflow-x: auto;
`;

export const RecordImage = styled.img`
  width: 5.3125rem;
  height: 5.3125rem;
  border-radius: 0.25rem;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: ${({ $menu }) => ($menu ? "transparent" : "rgba(0, 0, 0, 0.4)")};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ApplyButton = styled.button`
  ${SemiBold_16};
  height: 51px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: ${({ $cancel }) => ($cancel ? "var(--Gray_6)" : "var(--White)")};
  background: ${({ $cancel }) => ($cancel ? "var(--White)" : "var(--Black)")};
  border: ${({ $cancel }) => ($cancel ? "1px solid var(--Gray_4)" : "none")};
`;

export const ErrorMessage = styled.p`
  ${Regular_14}
  color: var(--Red);
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const VerifySheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 20px 20px 0 0;
  padding: 0.75rem 1.25rem 1.75rem;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MenuHandle = styled.span`
  display: block;
  width: 3.25rem;
  height: 0.25rem;
  margin: 0 auto;
  border-radius: 999px;
  background: var(--Gray_2);
`;

export const VerifyTitle = styled.h3`
  ${SemiBold_16};
  color: var(--Black);
`;

export const VerifySubTitle = styled.p`
  ${Regular_14};
  color: var(--Gray_5);
  margin-top: -0.75rem;
`;

export const VerifyImageBox = styled.div`
  width: 100%;
  height: 10.75rem;
  border: 1px dashed var(--Gray_3);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  background: var(--Gray_-1);
`;

export const VerifyPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
`;

export const VerifyImageLabel = styled.p`
  ${Medium_14};
  color: var(--Gray_6);
`;

export const VerifyImageSub = styled.p`
  ${Regular_12};
  color: var(--Gray_4);
  text-align: center;
  margin-top: -0.25rem;
`;

export const VerifyNotice = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1.125rem;
`;

export const VerifyNoticeItem = styled.li`
  ${Regular_12};
  color: var(--Black);
  list-style: disc;
`;

export const CameraIcon = styled(Camera)`
  width: 2rem;
  height: 2rem;
  color: var(--Gray_6);
`;
