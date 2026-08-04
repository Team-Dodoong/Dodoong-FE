import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Party.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { searchParties, getMyParties } from "../../../api/partyApi";

const CATEGORY_MAP = {
  공부: "STUDY",
  취업: "CAREER",
  일상: "DAILY",
  외국어: "LANGUAGE",
  운동: "FITNESS",
};

const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([ko, en]) => [en, ko]),
);

const CATEGORIES = Object.keys(CATEGORY_MAP);

const PAGE_SIZE = 20;

function Party() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체 파티");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [parties, setParties] = useState([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategory = (cat) => {
    setSelectedCategory(selectedCategory === cat ? null : cat);
  };

  const fetchPage = useCallback(
    (targetPage) => {
      const categories = selectedCategory
        ? [CATEGORY_MAP[selectedCategory]]
        : undefined;
      return activeTab === "내 파티"
        ? getMyParties({ page: targetPage, size: PAGE_SIZE })
        : searchParties({
            keyword: searchKeyword || undefined,
            categories,
            page: targetPage,
            size: PAGE_SIZE,
          });
    },
    [activeTab, selectedCategory, searchKeyword],
  );

  useEffect(() => {
    let ignore = false;

    const loadFirstPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPage(0);
        if (ignore) return;
        const result = response.data.data;
        setParties(result.content);
        setPage(0);
        setIsLast(result.last);
      } catch (err) {
        if (!ignore) {
          console.error("파티 목록 조회 실패", err);
          setError("파티 목록을 불러오지 못했습니다.");
          setParties([]);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadFirstPage();
    return () => {
      ignore = true;
    };
  }, [activeTab, selectedCategory, searchKeyword]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      const response = await fetchPage(nextPage);
      const result = response.data.data;
      setParties((prev) => [...prev, ...result.content]);
      setPage(nextPage);
      setIsLast(result.last);
    } catch (err) {
      console.error("파티 목록 추가 조회 실패", err);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchKeyword(keyword.trim());
    }
  };

  return (
    <S.Container>
      <S.SearchBarWrapper>
        <SearchBar
          placeholder="파티아이템을 검색해주세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
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
        {loading && parties.length === 0 && (
          <S.PostContent>불러오는 중...</S.PostContent>
        )}
        {error && <S.PostContent>{error}</S.PostContent>}
        {!loading && !error && parties.length === 0 && (
          <S.PostContent>표시할 파티가 없습니다.</S.PostContent>
        )}
        <S.PostList>
          {parties.map((party) => (
            <S.PostCard
              key={party.id}
              onClick={() => navigate(`/party/${party.id}`)}
            >
              <S.TagWrapper>
                <S.TagRow>
                  <S.StatusTag $active={!party.isFull}>
                    {party.isFull ? "마감" : "모집중"}
                  </S.StatusTag>
                  {party.categories.map((cat) => (
                    <S.Tag key={cat}>{CATEGORY_LABELS[cat] ?? cat}</S.Tag>
                  ))}
                </S.TagRow>
                <S.MoreIcon />
              </S.TagWrapper>
              <S.PostTitle>
                {!party.isPublic && <S.LockIcon />}
                {party.name}
              </S.PostTitle>
              <S.PostContent>{party.description}</S.PostContent>
              <S.PostMeta>
                <S.MemberWrapper>
                  <S.SocialIcon />
                  <S.MemberCount>{party.currentMembers}명</S.MemberCount>
                </S.MemberWrapper>
              </S.PostMeta>
            </S.PostCard>
          ))}
        </S.PostList>
      </S.ScrollArea>
    </S.Container>
  );
}

export default Party;
