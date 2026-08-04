import * as S from "./LeaveModal.style";

function LeaveModal({ onCancel, onConfirm, submitting, error }) {
  return (
    <>
      <S.Overlay onClick={onCancel} />
      <S.Modal>
        <S.ModalTitle>
          채팅방을 나가면 파티도 탈퇴되고{"\n"}대화내역이 모두 삭제됩니다.
        </S.ModalTitle>
        <S.ModalSubTitle>파티를 탈퇴하시겠습니까?</S.ModalSubTitle>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.ModalButtonWrapper>
          <S.ModalButton $cancel onClick={onCancel} disabled={submitting}>
            취소
          </S.ModalButton>
          <S.ModalButton onClick={onConfirm} disabled={submitting}>
            {submitting ? "탈퇴 중..." : "탈퇴하기"}
          </S.ModalButton>
        </S.ModalButtonWrapper>
      </S.Modal>
    </>
  );
}

export default LeaveModal;
