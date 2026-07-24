import * as S from './Modal.style';

// 공통 모달 껍데기(백드롭 + 카드). LevelUpModal 등 여러 모달에서 재사용합니다.
function Modal({ children, onBackdropClick }) {
  return (
    <S.Backdrop onClick={onBackdropClick}>
      <S.Card onClick={(e) => e.stopPropagation()}>{children}</S.Card>
    </S.Backdrop>
  );
}


export default Modal;