import React from 'react';
import * as S from './QuadrantModal.style';

function QuadrantModal({ category, items, onClose }) {
  if (!category) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Badge $bgColor={category.bgColor} $color={category.color}>
          {category.title}
        </S.Badge>

        <S.List>
          {items.map((item) => (
            <S.ListItem key={item.id}>
              <S.Checkbox type="checkbox" defaultChecked={item.completed} />
              <S.ItemText>{item.title}</S.ItemText>
            </S.ListItem>
          ))}
        </S.List>
      </S.ModalContainer>
    </S.Overlay>
  );
}

export default QuadrantModal;