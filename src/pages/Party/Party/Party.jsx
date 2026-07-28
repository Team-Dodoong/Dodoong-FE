import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Party.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import DividerIcon from "../../../assets/ic_party_divider_13.svg?react";

const CATEGORIES = ["공부", "운동", "일상", "외국어", "취업"];

const POSTS = [
  {
    id: 1,
    status: "모집중",
    tags: ["공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: true,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "32분 전",
  },
  {
    id: 2,
    status: "모집중",
    tags: ["공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: false,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "32분 전",
  },
  {
    id: 3,
    status: "모집중",
    tags: ["공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: true,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "32분 전",
  },
  {
    id: 4,
    status: "모집중",
    tags: ["공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: true,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "32분 전",
  },
];

function Party() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체 파티");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategory = (cat) => {
    setSelectedCategory(selectedCategory === cat ? null : cat);
  };
  return (
    <S.Container>
      <S.SearchBarWrapper>
        <SearchBar placeholder="파티아이템을 검색해주세요." />
      </S.SearchBarWrapper>

      <S.TabRow>
        {["전체 파티", "내 파티"].map((tab) => (
          <S.Tab
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </S.Tab>
        ))}
      </S.TabRow>

      <S.CategoryRow>
        {CATEGORIES.map((cat) => (
          <S.CategoryTag
            key={cat}
            $active={selectedCategory === cat}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </S.CategoryTag>
        ))}
      </S.CategoryRow>
      <S.PartySetButton onClick={() => navigate("/party/create")}>
        파티개설 +
      </S.PartySetButton>
      <S.Divider />
      <S.ScrollArea>
        <S.PostList>
          {POSTS.map((post) => (
            <S.PostCard
              key={post.id}
              onClick={() => navigate(`/party/${post.id}`)}
            >
              <S.TagWrapper>
                <S.TagRow>
                  <S.StatusTag $active={true}>{post.status}</S.StatusTag>
                  {post.tags.map((tag, i) => (
                    <S.Tag key={i}>{tag}</S.Tag>
                  ))}
                </S.TagRow>
                <S.MoreIcon />
              </S.TagWrapper>
              <S.PostTitle>
                {post.isLocked && <S.LockIcon />}
                {post.title}
              </S.PostTitle>
              <S.PostContent>{post.content}</S.PostContent>
              <S.PostMeta>
                <S.MemberWrapper>
                  <S.SocialIcon />
                  <S.MemberCount>{post.members}</S.MemberCount>
                </S.MemberWrapper>
                <DividerIcon />
                <S.LastConversation>
                  마지막 대화 <S.TimeHighlight>{post.time}</S.TimeHighlight>
                </S.LastConversation>
              </S.PostMeta>
            </S.PostCard>
          ))}
        </S.PostList>
      </S.ScrollArea>
    </S.Container>
  );
}

export default Party;
