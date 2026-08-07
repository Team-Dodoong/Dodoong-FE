import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPartyMonthlyRanking } from "../../../api/partyApi";
import { getCharacterHelloImage } from "../../../utils/characterImage";
import * as S from "./Ranking.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import podium1 from "./images/podium_1.png";
import podium2 from "./images/podium_2.png";
import podium3 from "./images/podium_3.png";
import Rank1Icon from "./images/ic_1_rank.svg?react";
import Rank2Icon from "./images/ic_2_rank.svg?react";
import Rank3Icon from "./images/ic_3_rank.svg?react";

const RANK_ICONS = { 1: Rank1Icon, 2: Rank2Icon, 3: Rank3Icon };

function Ranking() {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [search, setSearch] = useState("");
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadRanking = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPartyMonthlyRanking(partyId);
        if (!ignore) {
          const rankings = response.data.data.rankings ?? [];
          setRanking(
            rankings.map((item) => ({
              rank: item.rank,
              name: item.nickname,
              score: item.score,
              characterId: item.characterId,
            })),
          );
        }
      } catch (err) {
        if (!ignore) {
          console.error("월간 랭킹 조회 실패", err);
          setError("랭킹을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadRanking();
    return () => {
      ignore = true;
    };
  }, [partyId]);

  const top3 = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  const filtered = rest.filter((m) => m.name.includes(search));

  return (
    <S.Container>
      <S.Header>
        <S.BackIcon onClick={() => navigate(-1)} />
        <S.HeaderTitle>월간랭킹</S.HeaderTitle>
        <S.MyRankButton>내 순위</S.MyRankButton>
      </S.Header>

      {loading && <S.RankName>불러오는 중...</S.RankName>}
      {error && <S.RankName>{error}</S.RankName>}

      <S.Podium>
        <S.PodiumItem>
          {top3[1] && (
            <>
              <S.RankName>{top3[1].name}</S.RankName>
              <S.CharacterImage
                src={getCharacterHelloImage(top3[1].characterId)}
                alt="2등"
              />
            </>
          )}
          <S.PodiumBase src={podium2} alt="2등 단상" />
        </S.PodiumItem>

        <S.PodiumItem $first>
          {top3[0] && (
            <>
              <S.RankName>{top3[0].name}</S.RankName>
              <S.CharacterImage
                src={getCharacterHelloImage(top3[0].characterId)}
                alt="1등"
              />
            </>
          )}
          <S.PodiumBase src={podium1} alt="1등 단상" />
        </S.PodiumItem>

        <S.PodiumItem>
          {top3[2] && (
            <>
              <S.RankName>{top3[2].name}</S.RankName>
              <S.CharacterImage
                src={getCharacterHelloImage(top3[2].characterId)}
                alt="3등"
              />
            </>
          )}
          <S.PodiumBase src={podium3} alt="3등 단상" />
        </S.PodiumItem>
      </S.Podium>

      <S.BottomSheet>
        <S.SheetHandle />
        <S.SearchBarWrapper>
          <SearchBar
            placeholder="유저 이름을 검색해주세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </S.SearchBarWrapper>

        <S.RankList>
          {top3.map((member) => {
            const RankIcon = RANK_ICONS[member.rank];
            return (
              <S.RankItem key={member.rank}>
                <S.RankBadgeIcon>
                  <RankIcon />
                </S.RankBadgeIcon>
                <S.RankItemName>{member.name}</S.RankItemName>
                <S.RankScore>{member.score}점</S.RankScore>
              </S.RankItem>
            );
          })}

          {(search ? filtered : rest).map((member) => (
            <S.RankItem key={member.rank}>
              <S.RankNumber>{member.rank}</S.RankNumber>
              <S.RankItemName>{member.name}</S.RankItemName>
              <S.RankScore>{member.score}점</S.RankScore>
            </S.RankItem>
          ))}
        </S.RankList>
      </S.BottomSheet>
    </S.Container>
  );
}

export default Ranking;
