import CheckIcon from '../../../../../../assets/ic_quest_check.svg?react'; //ic_quest_check
import KebabIcon from '../../../../../../assets/ic_bold_more_24.svg?react'; //ic_bold_more_24
import QuestItemMenu from '../QuestItemMenu/QuestItemMenu';
import * as S from './QuestItem.style';

// 퀘스트 리스트의 한 행. 체크박스, 라벨(태그 포함), 케밥 메뉴로 구성됩니다.
function QuestItem({
  quest,
  type,
  isMenuOpen,
  deleteExpanded,
  onToggle,
  onToggleMenu,
  onEdit,
  onPostpone,
  onRequestDeleteOptions,
  // onDeleteToday,
  // onDeleteForever,
  onLeaveParty,
  onSuccess,
}) {
  // 🟢 [수정] 백엔드 PK인 dailyQuestId를 최우선 적용하여 undefined 에러 방지
  const questId = quest?.dailyQuestId || quest?.id;

  // 🟢 [수정] API 응답 데이터 키값(isChecked, content) 및 프론트 Mock 키값(checked, title) 호환 처리
  const isChecked = quest?.isChecked ?? quest?.checked ?? false;
  const titleText = quest?.content || quest?.title;

  return (
    <S.Wrapper $highlighted={isMenuOpen}>
      <S.Checkbox
        type="button"
        $checked={isChecked}
        onClick={() => onToggle(questId)}
        aria-label="퀘스트 완료 체크"
      >
        {isChecked && <CheckIcon size={12} />}
      </S.Checkbox>

      <S.Label $checked={isChecked}>
        {quest.tag && <S.Tag>[{quest.tag}] </S.Tag>}
        {titleText}
      </S.Label>

      <S.MoreButton
        type="button"
        onClick={() => onToggleMenu(questId)}
        aria-label="더보기"
      >
        <KebabIcon />
      </S.MoreButton>

      {isMenuOpen && (
        <QuestItemMenu
          type={type}
          item={quest}
          deleteExpanded={deleteExpanded}
          deleteExpanded={deleteExpanded}
          onEdit={() => onEdit(questId)} // 🟢 [수정] 인자 없는 화살표 함수로 넘기거나 questId 전달
          onPostpone={() => onPostpone(questId)} // 🟢 [수정] questId 전달
          onRequestDeleteOptions={() => onRequestDeleteOptions(questId)} // 🟢 [수정] questId 전달
          onLeaveParty={() => onLeaveParty(questId)} // 🟢 [수정] questId 전달
          onSuccess={onSuccess} // 🟢 [수정] QuestItemMenu 내부 API 성공 후 목록 리프레시용 콜백 전달
          // 💡 onDeleteToday, onDeleteForever는 QuestItemMenu 내부에서 API를 직접 호출하므로 삭제하였습니다.
        />
      )}
    </S.Wrapper>
  );
}


export default QuestItem;
