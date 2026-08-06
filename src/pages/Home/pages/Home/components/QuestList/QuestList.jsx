import { useState, useEffect } from 'react';
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
  onSuccess,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteExpandedId, setDeleteExpandedId] = useState(null);

  // 🟢 [수정 2] 날짜 변경이나 탭 변경 등으로 quests 데이터 리스트가 바뀌면 열려있던 메뉴 닫기!
  useEffect(() => {
    setOpenMenuId(null);
    setDeleteExpandedId(null);
  }, [quests]);

  const closeMenu = () => {
    setOpenMenuId(null);
    setDeleteExpandedId(null);
  };

  const handleToggleMenu = (id) => {
    const targetId = String(id);
    if (openMenuId === id) {
      closeMenu();
      return;
    }
    setOpenMenuId(id);
    setDeleteExpandedId(null);
  };

  if (quests?.length === 0) {
    return <S.Empty>등록된 퀘스트가 없어요. + 버튼으로 추가해보세요!</S.Empty>;
  }

  return (
    <S.List>
      {quests?.map((quest) => {
        const questId = String(quest.dailyQuestId ?? quest.id);


        return (
          <QuestItem
            key={questId}
            quest={quest} // 🟢 QuestItemMenu에서 사용할 전체 데이터 객체 전달
            type={type}
            isMenuOpen={openMenuId !== null && String(openMenuId) === questId}
            deleteExpanded={deleteExpandedId === questId}
            onToggle={onToggle}
            onToggleMenu={() => handleToggleMenu(questId)}
            onEdit={() => {
            closeMenu();
            onEdit(questId);
          }}
          onPostpone={() => {
            closeMenu();
            onPostpone(questId);
          }}
          onRequestDeleteOptions={() => setDeleteExpandedId(questId)}
          onDeleteToday={() => {
            closeMenu();
            if (onDeleteToday) onDeleteToday(questId);
          }}
          onDeleteForever={() => {
            closeMenu();
            if (onDeleteForever) onDeleteForever(quest.routineId);
          }}
          onLeaveParty={() => {
            closeMenu();
            if (onLeaveParty) onLeaveParty(questId);
          }}
          onSuccess={() => {
              closeMenu();
              if (onSuccess) onSuccess();
            }}
        />
        );
      })}
    </S.List>
  );
}


export default QuestList;
