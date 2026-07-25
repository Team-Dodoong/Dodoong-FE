import * as S from "./LeaveModal.style";

function LeaveModal({ onCancel, onConfirm }) {
  return (
    <>
      <S.Overlay onClick={onCancel} />
      <S.Modal>
        <S.ModalTitle>
          채팅방을 나가면 파티도 탈퇴되고{"\n"}대화내역이 모두 삭제됩니다.
        </S.ModalTitle>
        <S.ModalSubTitle>파티를 탈퇴하시겠습니까?</S.ModalSubTitle>
        <S.ModalButtonWrapper>
          <S.ModalButton $cancel onClick={onCancel}>
            취소
          </S.ModalButton>
          <S.ModalButton onClick={onConfirm}>탈퇴하기</S.ModalButton>
        </S.ModalButtonWrapper>
      </S.Modal>
    </>
  );
}

export default LeaveModal;
