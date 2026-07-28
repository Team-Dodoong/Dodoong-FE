// PartyDetail.style.js
import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import Chat from "../../../assets/ic_chat_24.svg?react";
import Share from "../../../assets/ic_share_24.svg?react";
import More from "../../../assets/ic_regular_more_24.svg?react";
import Lock from "../../../assets/ic_filled_lock_24.svg?react";
import Social from "../../../assets/ic_social_24.svg?react";
import DoneQuest from "../../../assets/ic_done_quest_24.svg?react";
import Trophy from "../../../assets/ic_trophy.svg?react";
import Dart from "../../../assets/ic_dart.svg?react";
import Smile from "../../../assets/ic_smile.svg?react";
import Rank from "../../../assets/ic_rank_24.svg?react";
import Camera from "../../../assets/ic_filled_camera_24.svg?react";

import {
  SemiBold_16,
  Regular_14,
  Medium_14,
  Bold_18,
  SemiBold_12,
  Medium_12,
  Regular_12,
  Bold_14,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ScrollArea = styled.div`
  height: calc(100vh - 7.4375rem);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 16.6875rem;
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
`;

export const HeaderIcons = styled.div`
  position: absolute;
  top: 0.25rem;
  left: 0;
  right: 0;
  padding: 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderRight = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const BackIcon = styled(Back)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`;

export const ChatIcon = styled(Chat)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`;

export const ShareIcon = styled(Share)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`;

export const MoreIcon = styled(More)`
  width: 1.5rem;
  height: 1.5rem;
  color: white;
`;

export const ImageContent = styled.div`
  position: absolute;
  bottom: 0.75rem;
  left: 1.25rem;
  right: 1.25rem;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const StatusTag = styled.span`
  ${SemiBold_12};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: var(--Main);
  color: var(--White);
  margin-right: 0.25rem;
`;

export const Tag = styled.span`
  ${Medium_12};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: var(--Sub);
  color: var(--Main);
`;

export const Title = styled.h2`
  ${Bold_18};
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const LockIcon = styled(Lock)`
  width: 1.75rem;
  height: 1.75rem;
  color: white;
  flex-shrink: 0;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SocialIcon = styled(Social)`
  width: 1rem;
  height: 1rem;
  color: white;
`;

export const MemberCount = styled.span`
  font-size: 0.75rem;
  color: white;
`;

export const Divider = styled.div`
  width: 1px;
  height: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
`;

export const LastConversation = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const TimeHighlight = styled.span`
  color: var(--Main);
`;

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

export const EmptyCheckbox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid var(--Gray_3);
  border-radius: 4px;
  flex-shrink: 0;
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

export const MenuContainer = styled.div`
  position: absolute;
  width: 6.5625rem;
  top: 2.3125rem;
  right: 1.25rem;
  padding: 1rem;
  background: var(--White);
  border-radius: 0.5rem;
  z-index: 1002;
`;

export const MenuItem = styled.p`
  ${Medium_14};
  color: ${({ $report }) => ($report ? "var(--Red)" : "var(--Gray_6)")};
`;

export const MenuDivider = styled.div`
  height: 0.0625rem;
  width: 100%;
  margin: 0.5rem 0;
  background: var(--Gray_2);
`;

export const ApplyContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  width: 18.4375rem;
  padding: 1.25rem;
  padding-top: 1.75rem;
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
  margin-bottom: 32px;
  ${Regular_14};
`;

export const ErrorMessage = styled.p`
  ${Regular_14}
  color: var(--Red);
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const TrophyIcon = styled(Trophy)`
  width: 1.875rem;
  height: 2.1875rem;
`;

export const DartIcon = styled(Dart)`
  width: 2.5rem;
  height: 2.625rem;
`;

export const SmileIcon = styled(Smile)`
  width: 2.5rem;
  height: 2.5rem;
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

export const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecordMore = styled.span`
  ${Regular_12};
  color: var(--Black);
  cursor: pointer;
`;

export const RecordRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RecordImage = styled.img`
  width: 5.3125rem;
  height: 5.3125rem;
  border-radius: 0.25rem;
  object-fit: cover;
`;

export const RankIcon = styled(Rank)`
  width: 2rem;
  height: 2rem;
  color: var(--White);
`;

export const RankingButton = styled.button`
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 6.1875rem;
  background: var(--Black);
  display: grid;
  align-items: center;
  justify-content: center;
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
  border-radius: 16px 16px 0 0;
  padding: 1rem 1.25rem 3rem;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MenuHandle = styled.span`
  display: block;
  width: 2.25rem;
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
  ${Regular_12};
  color: var(--Gray_5);
  margin-top: -0.5rem;
`;

export const VerifyImageBox = styled.div`
  width: 100%;
  height: 9rem;
  border: 1px dashed var(--Gray_3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  background: var(--Gray_0);
`;

export const VerifyPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const VerifyImageLabel = styled.p`
  ${Medium_14};
  color: var(--Gray_6);
`;

export const VerifyImageSub = styled.p`
  ${Regular_12};
  color: var(--Gray_4);
  text-align: center;
`;

export const VerifyNotice = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1rem;
`;

export const VerifyNoticeItem = styled.li`
  ${Regular_12};
  color: var(--Gray_5);
  list-style: disc;
`;

export const CameraIcon = styled(Camera)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--Gray_4);
`;
