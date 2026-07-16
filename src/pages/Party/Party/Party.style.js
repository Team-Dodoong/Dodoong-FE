import styled from "styled-components";
import More from "../../../assets/ic_regular_more_24.svg";
import Lock from "../../../assets/ic_filled_lock_24.svg?react";
import {
  SemiBold_16,
  Medium_14,
  Bold_14,
  SemiBold_12,
  Medium_12,
  Bold_18,
  Regular_14,
} from "../../../styles/Fonts";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--White);
`;

export const SearchBarWrapper = styled.div`
  margin: 1rem 1.25rem;
`;

export const TabRow = styled.div`
  display: flex;
`;

export const Tab = styled.button`
  ${SemiBold_16};
  flex: 1;
  padding-top: 0.5rem;
  padding-bottom: 0.75rem;
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid  var(--Main)" : "2px solid transparent"};
  color: ${({ $active }) => ($active ? "var(--Black)" : "var(--Gray_5)")};
  cursor: pointer;
`;

export const CategoryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.0938rem;
  border: 0.0625rem solid var(--Gray_0);
`;

export const CategoryTag = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 3.125rem;
  border: 0.0625rem solid var(--Gray_3);
  background: ${({ $active }) => ($active ? "var(--Black)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--White)" : "var(--Gray_6)")};
  ${Medium_14};
  cursor: pointer;
  transition: all 0.15s;
`;

export const PartySetButton = styled.div`
  border: 0.0625rem solid var(--Gray_2);
  text-align: right;
  ${Bold_14};
  color: var(--Main);
  padding: 0.75rem 1.25rem;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0.5rem;
  background: var(--Gray_1);
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostCard = styled.div`
  border-bottom: 0.0625rem solid var(--Gray_1);
  padding: 1.25rem 1rem;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const StatusTag = styled.span`
  ${SemiBold_12};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${({ $active }) => ($active ? " var(--Main)" : " var(--Gray_2)")};
  color: ${({ $active }) => ($active ? " var(--White)" : " var(--Gray_5)")};
  margin-right: 0.25rem;
`;

export const Tag = styled.span`
  ${Medium_12};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: var(--Sub);
  color: var(--Main);
`;

export const MoreIcon = styled(More)`
  color: var(--Gray_6);
  width: 20px;
  height: 20px;
`;

export const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const LockIcon = styled(Lock)`
  color: var(--Gray_7);
  width: 1.25rem;
  height: 1.25rem;
`;

export const PostTitle = styled.h3`
  ${Bold_18};
  color: var(--Black);
`;

export const PostContent = styled.p`
  ${Regular_14};
  color: var(--Black);
`;

export const PostMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #aaa;
`;
