import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  min-height: 100vh;
`;

export const SearchBarWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const TabRow = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 0.75rem 0;
  background: none;
  border: none;
  border-bottom: ${({ $active }) =>
    $active ? "2px solid  var(--Main)" : "2px solid transparent"};
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#000" : "#aaa")};
  cursor: pointer;
`;

export const CategoryRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const CategoryTag = styled.button`
  padding: 0.375rem 1rem;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? "#000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
`;

export const PartySetLink = styled.div`
  text-align: right;
  font-size: 0.8125rem;
  color: #f97316;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostCard = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
`;

export const TagRow = styled.div`
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
`;

export const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: ${({ $primary }) => ($primary ? " var(--Main)" : " var(--Sub)")};
  color: ${({ $primary }) => ($primary ? " var(--White)" : " var(--Main)")};
`;

export const PostTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.375rem;
`;

export const PostContent = styled.p`
  font-size: 0.8125rem;
  color: #666;
  margin: 0 0 0.75rem;
  line-height: 1.5;
`;

export const PostMeta = styled.div`
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: #aaa;
`;
