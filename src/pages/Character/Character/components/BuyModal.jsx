import * as S from "./BuyModal.style";

function BuyModal({ character, userPoint, onCancel, onConfirm }) {
  const remaining = userPoint - character.price;

  return (
    <>
      <S.Overlay onClick={onCancel} />
      <S.Modal>
        <S.ModalTitle>구매하시겠습니까?</S.ModalTitle>
        <S.InfoTable>
          <S.InfoRow>
            <S.InfoLabel>현재 보유포인트</S.InfoLabel>
            <S.InfoValue>{userPoint.toLocaleString()}P</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>소모 예정 포인트</S.InfoLabel>
            <S.InfoValue>{character.price}P</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>남은 포인트</S.InfoLabel>
            <S.InfoValue>{remaining.toLocaleString()}P</S.InfoValue>
          </S.InfoRow>
        </S.InfoTable>
        <S.BuyButton onClick={onConfirm}>
          {character.price}P 구매하기
        </S.BuyButton>
        <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
      </S.Modal>
    </>
  );
}

export default BuyModal;
