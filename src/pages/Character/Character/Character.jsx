import { useState } from "react";
import * as S from "./Character.style";
import PointBadge from "../../../components/PointBadge/PointBadge";
import character1 from "../images/character_1.png";
import character2 from "../images/character_2.png";
import character3 from "../images/character_3.png";
import BuyModal from "./components/BuyModal";
import DetailModal from "./components/DetailModal";
const MOCK_CHARACTERS = [
  {
    id: 1,
    name: "두비",
    image: character1,
    owned: true,
    equipped: true,
    price: null,
    subtitle: "꾸준함을 좋아하는 응원냥이",
    description: `나비는 꾸준함의 숲에서 작은 응원냥이에요.\n처음엔 무엇이든 금방 포기하곤 했지만,...`,
  },
  {
    id: 2,
    name: "토토",
    image: character2,
    owned: false,
    equipped: false,
    price: 500,
    subtitle: "꾸준함을 좋아하는 응원냥이",
    description: `나비는 꾸준함의 숲에서 작은 응원냥이에요.\n처음엔 무엇이든 금방 포기하곤 했지만,...`,
  },
  {
    id: 3,
    name: "나비",
    image: character3,
    owned: true,
    equipped: false,
    price: null,
    subtitle: "꾸준함을 좋아하는 응원냥이",
    description: `나비는 꾸준함의 숲에서 작은 응원냥이에요.\n처음엔 무엇이든 금방 포기하곤 했지만,...`,
  },
];

const MOCK_USER = {
  name: "두비",
  point: 1270,
  message: "안녕! 나는 두비야 만나서 반가워!",
  image: character1,
  exp: 300,
  maxExp: 1000,
};

function Character() {
  const [activeTab, setActiveTab] = useState("전체캐릭터");
  const [search, setSearch] = useState("");
  const [equipped, setEquipped] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailCharacter, setDetailCharacter] = useState(null);

  const filtered = MOCK_CHARACTERS.filter((c) => {
    const matchSearch = c.name.includes(search);
    const matchTab = activeTab === "전체캐릭터" ? true : c.owned;
    return matchSearch && matchTab;
  });

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>캐릭터 관리</S.HeaderTitle>
        <S.ChatIcon />
      </S.Header>

      <S.PointRow>
        <PointBadge point={MOCK_USER.point} />
      </S.PointRow>

      <S.CharacterSection>
        <S.CharacterMessage>{MOCK_USER.message}</S.CharacterMessage>
        <S.MainCharacterImage src={MOCK_USER.image} alt={MOCK_USER.name} />
        <S.CharacterName>{MOCK_USER.name}</S.CharacterName>
        <S.ExpBarWrapper>
          <S.ExpBar>
            <S.ExpFill $percent={(MOCK_USER.exp / MOCK_USER.maxExp) * 100} />
          </S.ExpBar>
          <S.ExpText>
            <S.ExpCurrent>{MOCK_USER.exp}</S.ExpCurrent>/
            {MOCK_USER.maxExp.toLocaleString()}
          </S.ExpText>
        </S.ExpBarWrapper>
      </S.CharacterSection>

      <S.SearchWrapper>
        <S.SearchInput
          placeholder="캐릭터 목록을 검색해주세요."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <S.SearchIcon />
      </S.SearchWrapper>

      <S.TabRow>
        {["전체캐릭터", "보유캐릭터"].map((tab) => (
          <S.Tab
            key={tab}
            $active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </S.Tab>
        ))}
      </S.TabRow>

      <S.ScrollArea>
        <S.Grid>
          {filtered.map((character) => (
            <S.CharacterCard key={character.id}>
              <S.CardImage src={character.image} alt={character.name} />
              <S.CardName>{character.name}</S.CardName>
              {character.owned ? (
                <S.ActionButton
                  $equipped={equipped === character.id}
                  onClick={() => setEquipped(character.id)}
                >
                  {equipped === character.id ? "장착중" : "장착하기"}
                </S.ActionButton>
              ) : (
                <S.ActionButton
                  $buy
                  onClick={() => {
                    setSelectedCharacter(character);
                    setShowBuyModal(true);
                  }}
                >
                  {character.price
                    ? `${character.price}P 구매하기`
                    : "장착하기"}
                </S.ActionButton>
              )}
              <S.DetailButton
                onClick={() => {
                  setDetailCharacter(character);
                  setShowDetailModal(true);
                }}
              >
                상세보기
              </S.DetailButton>
            </S.CharacterCard>
          ))}
        </S.Grid>
      </S.ScrollArea>
      {showBuyModal && selectedCharacter && (
        <BuyModal
          character={selectedCharacter}
          userPoint={MOCK_USER.point}
          onCancel={() => setShowBuyModal(false)}
          onConfirm={() => setShowBuyModal(false)}
        />
      )}

      {showDetailModal && detailCharacter && (
        <DetailModal
          character={detailCharacter}
          onClose={() => setShowDetailModal(false)}
          onBuy={() => {
            setShowDetailModal(false);
            setSelectedCharacter(detailCharacter);
            setShowBuyModal(true);
          }}
        />
      )}
    </S.Container>
  );
}

export default Character;
