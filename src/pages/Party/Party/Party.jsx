import { React, useState } from "react";
import * as S from "./Party.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import LockIcon from "../../../assets/ic_filled_lock_24.svg?react";
const CATEGORIES = ["공부", "운동", "일상", "외국어", "취업"];

const POSTS = [
  {
    id: 1,
    tags: ["모집중", "공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: true,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "마지막 대화 32분 전",
  },
  {
    id: 2,
    tags: ["모집중", "공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: false,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "마지막 대화 32분 전",
  },
  {
    id: 3,
    tags: ["모집중", "공부", "스터디", "외국어"],
    title: "일본어 같이 공부하실분?",
    isLocked: true,
    content:
      "저는 현재 JLPT 3급 있고 일본어로 취업준비중입니다. 이를 위해 JLPT 2급 따는걸 목표로 하고있는데 같이 이야기 나누면서 공...",
    members: "7/20",
    time: "마지막 대화 32분 전",
  },
];

function Party() {
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
      <S.PartySetLink>파티개설 +</S.PartySetLink>
      <S.PostList>
        {POSTS.map((post) => (
          <S.PostCard key={post.id}>
            <S.TagRow>
              {post.tags.map((tag, i) => (
                <S.Tag key={i} $primary={tag === "모집중"}>
                  {tag}
                </S.Tag>
              ))}
            </S.TagRow>
            <S.PostTitle>
              {post.isLocked && <LockIcon width={20} height={20} />}
              {post.title}
            </S.PostTitle>
            <S.PostContent>{post.content}</S.PostContent>
            <S.PostMeta>
              <span>👥 {post.members}</span>
              <span>{post.time}</span>
            </S.PostMeta>
          </S.PostCard>
        ))}
      </S.PostList>
    </S.Container>
  );
}

export default Party;
