// PartyDetail.style.js
import styled from "styled-components";
import Back from "../../../assets/ic_back_24.svg?react";
import Chat from "../../../assets/ic_chat_24.svg?react";
import Share from "../../../assets/ic_share_24.svg?react";
import More from "../../../assets/ic_regular_more_24.svg?react";
import Lock from "../../../assets/ic_filled_lock_24.svg?react";
import Social from "../../../assets/ic_social_24.svg?react";
import DoneQuest from "../../../assets/ic_done_quest_24.svg?react";
import {
  SemiBold_16,
  Regular_14,
  Medium_14,
  Bold_18,
  SemiBold_12,
  Medium_12,
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

export const QuestText = styled.span`
  ${Medium_14};
  color: var(--Black);
`;
