import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./Ranking.style";
import SearchBar from "../../../components/SearchBar/SearchBar";
import character1 from "../../../assets/characters/character_hello_1.png";
import character2 from "../../../assets/characters/character_basic_3.png";
import character3 from "../../../assets/characters/character_basic_6.png";
import podium1 from "./images/podium_1.png";
import podium2 from "./images/podium_2.png";
import podium3 from "./images/podium_3.png";

const MOCK_PARTY_ID = 1;

const MOCK_RANKING = [
  { rank: 1, name: "김일등", score: 520 },
  { rank: 2, name: "박이등", score: 520 },
  { rank: 3, name: "이삼등", score: 520 },
  { rank: 4, name: "송사등", score: 520 },
  { rank: 5, name: "최오등", score: 520 },
  { rank: 6, name: "자육등", score: 520 },
  { rank: 7, name: "박칠등", score: 520 },
];

function Ranking() {
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [search, setSearch] = useState("");

  const ranking = Number(partyId) === MOCK_PARTY_ID ? MOCK_RANKING : [];

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

      <S.Podium>
        <S.PodiumItem>
          <S.RankName>{top3[1]?.name}</S.RankName>
          <S.CharacterImage src={character2} alt="2등" />
          <S.PodiumBase src={podium2} alt="2등 단상" />
        </S.PodiumItem>

        <S.PodiumItem $first>
          <S.RankName>{top3[0]?.name}</S.RankName>
          <S.CharacterImage src={character1} alt="1등" />
          <S.PodiumBase src={podium1} alt="1등 단상" />
        </S.PodiumItem>

        <S.PodiumItem>
          <S.RankName>{top3[2]?.name}</S.RankName>
          <S.CharacterImage src={character3} alt="3등" />
          <S.PodiumBase src={podium3} alt="3등 단상" />
        </S.PodiumItem>
      </S.Podium>

      <S.BottomSheet>
        <SearchBar placeholder="유저 이름을 검색해주세요." />

        <S.RankList>
          {top3.map((member) => (
            <S.RankItem key={member.rank}>
              <S.RankBadge $rank={member.rank}>{member.rank}</S.RankBadge>
              <S.RankItemName>{member.name}</S.RankItemName>
              <S.RankScore>{member.score}점</S.RankScore>
            </S.RankItem>
          ))}

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
