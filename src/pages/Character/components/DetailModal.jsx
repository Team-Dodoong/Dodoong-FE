import * as S from "./DetailModal.style";

// 백엔드가 description을 줄바꿈 없이 내려줘서, 문장/절 구분(.!?,)마다 임시로 줄바꿈을 넣는다.
// 백엔드가 \n을 포함해서 내려주게 되면 제거해도 된다.
const breakBySentence = (text) =>
  text?.replace(/([.!?,])\s+(?=\S)/g, "$1\n") ?? "";

function DetailModal({ character, onClose, onBuy }) {
  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Modal>
        <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        <S.CharacterImage src={character.image} alt={character.name} />
        <S.CharacterName>{character.name}</S.CharacterName>
        <S.CharacterSubTitle>{character.subtitle}</S.CharacterSubTitle>
        <S.CharacterDescription>
          {breakBySentence(character.description)}
        </S.CharacterDescription>
        {!character.owned && (
          <S.BuyButton onClick={onBuy}>
            <S.CharacterCost>{character.price}P</S.CharacterCost> 구매하기
          </S.BuyButton>
        )}
      </S.Modal>
    </>
  );
}

export default DetailModal;
