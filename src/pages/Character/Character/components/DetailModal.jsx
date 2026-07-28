import * as S from "./DetailModal.style";

function DetailModal({ character, onClose, onBuy }) {
  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Modal>
        <S.CloseButton onClick={onClose}>✕</S.CloseButton>
        <S.CharacterImage src={character.image} alt={character.name} />
        <S.CharacterName>{character.name}</S.CharacterName>
        <S.CharacterSubTitle>{character.subtitle}</S.CharacterSubTitle>
        <S.CharacterDescription>{character.description}</S.CharacterDescription>
        {!character.owned && (
          <S.BuyButton onClick={onBuy}>{character.price}P 구매하기</S.BuyButton>
        )}
      </S.Modal>
    </>
  );
}

export default DetailModal;
