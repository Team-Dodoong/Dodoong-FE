import { useState } from 'react';
import QuestItem from '../QuestItem/QuestItem';
import * as S from './QuestList.style';

// 일일퀘스트/파티퀘스트 리스트.
// 열려있는 메뉴(openMenuId)와 삭제 옵션 확장 여부를 여기서 관리해서
// "한 번에 하나의 메뉴만 열린다" 를 보장합니다.
function QuestList({
  quests,
  type,
  onToggle,
  onEdit,
  onPostpone,
  onDeleteToday,
  onDeleteForever,
  onLeaveParty,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteExpandedId, setDeleteExpandedId] = useState(null);

  const closeMenu = () => {
    setOpenMenuId(null);
    setDeleteExpandedId(null);
  };

  const handleToggleMenu = (id) => {
    if (openMenuId === id) {
      closeMenu();
      return;
    }
    setOpenMenuId(id);
    setDeleteExpandedId(null);
  };

  if (quests.length === 0) {
    return <S.Empty>등록된 퀘스트가 없어요. + 버튼으로 추가해보세요!</S.Empty>;
  }

  return (
    <S.List>
      {quests.map((quest) => (
        <QuestItem
          key={quest.id}
          quest={quest}
          type={type}
          isMenuOpen={openMenuId === quest.id}
          deleteExpanded={deleteExpandedId === quest.id}
          onToggle={onToggle}
          onToggleMenu={handleToggleMenu}
          onEdit={(id) => {
            closeMenu();
            onEdit(id);
          }}
          onPostpone={(id) => {
            closeMenu();
            onPostpone(id);
          }}
          onRequestDeleteOptions={(id) => setDeleteExpandedId(id)}
          onDeleteToday={(id) => {
            closeMenu();
            onDeleteToday(id);
          }}
          onDeleteForever={(id) => {
            closeMenu();
            onDeleteForever(id);
          }}
          onLeaveParty={(id) => {
            closeMenu();
            onLeaveParty(id);
          }}
        />
      ))}
    </S.List>
  );
}


export default QuestList;
