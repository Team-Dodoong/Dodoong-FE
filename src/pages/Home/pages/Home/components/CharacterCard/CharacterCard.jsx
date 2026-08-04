import * as S from './CharacterCard.style';
import character_doobi from "../../../../../../assets/character_두비.png";
import bgGradient from "../../../../../../assets/Rectangle 3410.png";
import CharacterIcon_Img from '../../../../../../assets/character-icon.png'; // ✨ 이미지 경로


function CharacterCard({
  userName,
  characterName,
  characterImage,
  exp,
  maxExp,
}) {
  const percent = Math.min(100, Math.round((exp / maxExp) * 100));

  return (
    <S.Wrapper>
      <S.GreetingBubble>
        안녕하세요 <strong>{userName}</strong>님 오늘도 힘내볼까요?!
      </S.GreetingBubble>

      <S.CharacterArea $bgImage={bgGradient}>
        <S.Decoration  src={CharacterIcon_Img} alt="character-icon" />
        <S.CharacterImage src={characterImage ?? character_doobi} alt={characterName} />
      </S.CharacterArea>

      <S.CharacterName>{characterName}</S.CharacterName>

      <S.ProgressWrapper>
        <S.ProgressTrack>
          <S.ProgressFill $percent={percent} />
        </S.ProgressTrack>
        <S.ProgressLabel>
          <span>{exp.toLocaleString()}</span>/{maxExp.toLocaleString()}
        </S.ProgressLabel>
      </S.ProgressWrapper>
    </S.Wrapper>
  );
}

export default CharacterCard;
