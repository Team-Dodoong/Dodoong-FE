import React from 'react';
import * as S from './QuadrantModal.style';


function QuadrantModal({ category, items = [], onClose, onToggle }) {
  if (!category) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Badge $bgColor={category.bgColor} $color={category.color}>
          {category.title}
        </S.Badge>

        <S.List>
          {items.map((item) => {
            // 백엔드 필드명(dailyQuestId, content, isChecked)과 
            // 혹시 남아있을 수 있는 기존 프론트 필드명(id, title, completed)을 모두 지원
            const questId = item.dailyQuestId || item.id;
            const contentText = item.content || item.title;
            const isChecked = item.isChecked ?? item.completed ?? false;

            return (
              <S.ListItem key={questId}>
                <S.Checkbox
                  type="checkbox"
                  checked={isChecked}
                  // 체크 상태를 반전(!isChecked)시켜서 부모에 (questId, targetCheckedState) 전달
                  onChange={() => onToggle(category.id, questId)}
                />
                <S.ItemText $completed={isChecked}>
                  {contentText}
                </S.ItemText>
              </S.ListItem>
            );
          })}
        </S.List>
      </S.ModalContainer>
    </S.Overlay>
  );
}

export default QuadrantModal;