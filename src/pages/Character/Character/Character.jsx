import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Character.style";
import PointBadge from "../../../components/PointBadge/PointBadge";
import character1 from "../../../assets/characters/character_hello_1.png";
import BuyModal from "./components/BuyModal";
import DetailModal from "./components/DetailModal";
import {
  getCharacters,
  getOwnedCharacters,
  getEquippedCharacter,
  equipCharacter,
  getCharacterDetail,
  purchaseCharacter,
} from "../../../api/characterApi";

const basicImageModules = import.meta.glob(
  "../../../assets/characters/character_basic_*.png",
  { eager: true, import: "default" }
);

const CHARACTER_IMAGES = Object.fromEntries(
  Object.entries(basicImageModules).map(([path, src]) => {
    const id = Number(path.match(/character_basic_(\d+)\.png$/)[1]);
    return [id, src];
  })
);

const getCharacterImage = (characterId) =>
  CHARACTER_IMAGES[characterId] ?? character1;

const MOCK_USER = {
  name: "두비",
  point: 1270,
  message: "안녕! 나는 두비야 만나서 반가워!",
  image: character1,
  exp: 300,
  maxExp: 1000,
};

function Character() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체캐릭터");
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [equipped, setEquipped] = useState(null);
  const [equippedCharacter, setEquippedCharacter] = useState(null);
  const [equipping, setEquipping] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailCharacter, setDetailCharacter] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [point, setPoint] = useState(MOCK_USER.point);
  const [purchasing, setPurchasing] = useState(false);

  const cacheRef = useRef({});
  const requestIdRef = useRef(0);

  const loadTab = useCallback(async (tab, { force = false } = {}) => {
    if (!force && cacheRef.current[tab]) {
      const cached = cacheRef.current[tab];
      setCharacters(cached);
      setEquipped(cached.find((c) => c.equipped)?.id ?? null);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const isOwnedTab = tab === "보유캐릭터";
      const response = isOwnedTab
        ? await getOwnedCharacters()
        : await getCharacters();
      if (requestIdRef.current !== requestId) return;
      const list = response.data.data.characters.map((c) => ({
        id: c.characterId,
        name: c.name,
        price: c.price ?? null,
        owned: isOwnedTab ? true : c.owned,
        equipped: c.isEquipped,
        image: getCharacterImage(c.characterId),
      }));
      cacheRef.current[tab] = list;
      setCharacters(list);
      setEquipped(list.find((c) => c.equipped)?.id ?? null);
    } catch (err) {
      if (requestIdRef.current === requestId) {
        console.error("캐릭터 목록 조회 실패", err);
        setError("캐릭터 목록을 불러오지 못했습니다.");
      }
    } finally {
      if (requestIdRef.current === requestId) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTab(activeTab);
  }, [activeTab, loadTab]);

  useEffect(() => {
    let ignore = false;

    const loadEquippedCharacter = async () => {
      try {
        const response = await getEquippedCharacter();
        if (ignore) return;
        const { characterId, name } = response.data.data;
        setEquippedCharacter({
          id: characterId,
          name,
          image: getCharacterImage(characterId),
        });
      } catch (err) {
        if (ignore) return;
        if (err.response?.status !== 404) {
          console.error("장착 캐릭터 조회 실패", err);
        }
        setEquippedCharacter(null);
      }
    };

    loadEquippedCharacter();
    return () => {
      ignore = true;
    };
  }, []);

  const handleEquip = async (character) => {
    if (equipped === character.id || equipping) return;
    setEquipping(true);
    try {
      const response = await equipCharacter(character.id);
      const { characterId, name, isEquipped } = response.data.data;

      setEquipped(characterId);
      setEquippedCharacter({
        id: characterId,
        name,
        image: getCharacterImage(characterId),
      });

      const applyEquip = (list) =>
        list.map((c) => ({
          ...c,
          equipped: c.id === characterId ? isEquipped : false,
        }));
      setCharacters(applyEquip);
      Object.keys(cacheRef.current).forEach((tab) => {
        cacheRef.current[tab] = applyEquip(cacheRef.current[tab]);
      });
    } catch (err) {
      alert(err.response?.data?.message ?? "캐릭터 장착에 실패했습니다.");
    } finally {
      setEquipping(false);
    }
  };

  const handleShowDetail = async (character) => {
    setDetailLoading(true);
    try {
      const response = await getCharacterDetail(character.id);
      const data = response.data.data;
      setDetailCharacter({
        id: data.characterId,
        name: data.name,
        subtitle: data.summary,
        description: data.description,
        price: data.price,
        owned: data.owned,
        equipped: data.isEquipped,
        image: getCharacterImage(data.characterId),
      });
      setShowDetailModal(true);
    } catch (err) {
      alert(err.response?.data?.message ?? "캐릭터 정보를 불러오지 못했습니다.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedCharacter || purchasing) return;
    setPurchasing(true);
    try {
      const response = await purchaseCharacter(selectedCharacter.id);
      const { characterId, remainingCoin } = response.data.data;

      setPoint(remainingCoin);
      setShowBuyModal(false);

      setCharacters((prev) =>
        prev.map((c) => (c.id === characterId ? { ...c, owned: true } : c))
      );
      if (cacheRef.current["전체캐릭터"]) {
        cacheRef.current["전체캐릭터"] = cacheRef.current["전체캐릭터"].map(
          (c) => (c.id === characterId ? { ...c, owned: true } : c)
        );
      }
      delete cacheRef.current["보유캐릭터"];
    } catch (err) {
      alert(err.response?.data?.message ?? "캐릭터 구매에 실패했습니다.");
    } finally {
      setPurchasing(false);
    }
  };

  const filtered = characters.filter((c) => c.name.includes(search));

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitle>캐릭터 관리</S.HeaderTitle>
        <S.ChatIcon onClick={() => navigate('/party/chat')} />
      </S.Header>

      <S.PointRow>
        <PointBadge point={point} />
      </S.PointRow>

      <S.CharacterSection>
        <S.CharacterMessage>
          {equippedCharacter
            ? `안녕! 나는 ${equippedCharacter.name}야 만나서 반가워!`
            : "아직 장착한 캐릭터가 없어요."}
        </S.CharacterMessage>
        <S.MainCharacterImage
          src={equippedCharacter?.image ?? character1}
          alt={equippedCharacter?.name ?? "캐릭터"}
        />
        <S.CharacterName>{equippedCharacter?.name ?? "-"}</S.CharacterName>
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
        {loading && <S.CardName>불러오는 중...</S.CardName>}
        {error && <S.CardName>{error}</S.CardName>}
        {!loading && !error && filtered.length === 0 && (
          <S.CardName>표시할 캐릭터가 없습니다.</S.CardName>
        )}
        <S.Grid>
          {filtered.map((character) => (
            <S.CharacterCard key={character.id}>
              <S.CardImage src={character.image} alt={character.name} />
              <S.CardName>{character.name}</S.CardName>
              {character.owned ? (
                <S.ActionButton
                  $equipped={equipped === character.id}
                  disabled={equipping}
                  onClick={() => handleEquip(character)}
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
                disabled={detailLoading}
                onClick={() => handleShowDetail(character)}
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
          userPoint={point}
          onCancel={() => setShowBuyModal(false)}
          onConfirm={handlePurchase}
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
