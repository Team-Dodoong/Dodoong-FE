import * as S from "./ConfirmModal.style";

function ConfirmModal({
  title,
  subTitle,
  confirmLabel = "확인",
  confirmingLabel = "처리 중...",
  onCancel,
  onConfirm,
  submitting,
  error,
}) {
  return (
    <>
      <S.Overlay onClick={onCancel} />
      <S.Modal>
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.ModalButtonWrapper>
          <S.ModalButton $cancel onClick={onCancel} disabled={submitting}>
            취소
          </S.ModalButton>
          <S.ModalButton onClick={onConfirm} disabled={submitting}>
            {submitting ? confirmingLabel : confirmLabel}
          </S.ModalButton>
        </S.ModalButtonWrapper>
      </S.Modal>
    </>
  );
}

export default ConfirmModal;
