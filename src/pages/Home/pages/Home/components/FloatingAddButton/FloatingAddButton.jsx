import PlusIcon from '../../../../../../assets/ic_quest_add_50.svg?react'
import * as S from './FloatingAddButton.style';

// 퀘스트 추가 플로팅 버튼
function FloatingAddButton({ onClick }) {
  return (
    <S.Button type="button" onClick={onClick} aria-label="퀘스트 추가">
      <PlusIcon />
    </S.Button>
  );
}


export default FloatingAddButton;
