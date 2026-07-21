import Modal from '../../../../../../components/Modal/Modal';
import * as S from './LevelUpModal.style';

// 레벨업 축하 모달
function LevelUpModal({ level, onConfirm }) {
  return (
    <Modal onBackdropClick={onConfirm}>
      <S.Message>레벨업을 축하합니다!</S.Message>
      <S.LevelText>Lv. {level} 를 달성했어요!</S.LevelText>
      <S.ConfirmButton type="button" onClick={onConfirm}>
        확인
      </S.ConfirmButton>
    </Modal>
  );
}


export default LevelUpModal;
