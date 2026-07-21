import * as S from './CharacterCard.style';
import character_doobi from "../../../../../../assets/character_두비.png";

// 인사말 + 캐릭터(두비) + 경험치 프로그레스바
function CharacterCard({
  userName,
  characterName,
  exp,
  maxExp,
}) {
  const percent = Math.min(100, Math.round((exp / maxExp) * 100));

  return (
    <S.Wrapper>
      <S.GreetingBubble>
        안녕하세요 <strong>{userName}</strong>님 오늘도 힘내볼까요?!
      </S.GreetingBubble>

      <S.CharacterArea>
        <S.Decoration $position="left: 14%; top: 32%;">✨</S.Decoration>
        <S.Decoration $position="right: 12%; bottom: 26%;">🧡</S.Decoration>
        <S.CharacterImage src={character_doobi} alt={characterName} />
      </S.CharacterArea>

      <S.CharacterName>{characterName}</S.CharacterName>

      <S.ProgressWrapper>
        <S.ProgressTrack>
          <S.ProgressFill $percent={percent} />
        </S.ProgressTrack>
        <S.ProgressLabel>
          {exp.toLocaleString()}/{maxExp.toLocaleString()}
        </S.ProgressLabel>
      </S.ProgressWrapper>
    </S.Wrapper>
  );
}

export default CharacterCard;
