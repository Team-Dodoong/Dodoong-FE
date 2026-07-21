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
  onDeleteToday,
  onDeleteForever,
  onLeaveParty,
}) {
  return (
    <S.Wrapper $highlighted={isMenuOpen}>
      <S.Checkbox
        type="button"
        $checked={quest.checked}
        onClick={() => onToggle(quest.id)}
        aria-label="퀘스트 완료 체크"
      >
        {quest.checked && <CheckIcon size={12} />}
      </S.Checkbox>

      <S.Label $checked={quest.checked}>
        {quest.tag && <S.Tag>[{quest.tag}] </S.Tag>}
        {quest.title}
      </S.Label>

      <S.MoreButton
        type="button"
        onClick={() => onToggleMenu(quest.id)}
        aria-label="더보기"
      >
        <KebabIcon />
      </S.MoreButton>

      {isMenuOpen && (
        <QuestItemMenu
          type={type}
          deleteExpanded={deleteExpanded}
          onEdit={() => onEdit(quest.id)}
          onPostpone={() => onPostpone(quest.id)}
          onRequestDeleteOptions={() => onRequestDeleteOptions(quest.id)}
          onDeleteToday={() => onDeleteToday(quest.id)}
          onDeleteForever={() => onDeleteForever(quest.id)}
          onLeaveParty={() => onLeaveParty(quest.id)}
        />
      )}
    </S.Wrapper>
  );
}


export default QuestItem;
