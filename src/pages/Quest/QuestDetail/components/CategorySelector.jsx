import * as S from './CategorySelector.style';

import UrgentIcon from '../../../../assets/ic_urgent.svg';   // 느낌표
import ImportantIcon from '../../../../assets/ic_star.svg'; // 반짝이
import DelayIcon from '../../../../assets/ic_clock.svg';    // 시계
import NormalIcon from '../../../../assets/ic_minus.svg';   // 마이너스

export const CATEGORIES = [
  { id: 'urgent', label: '긴급한 일이에요!', icon: UrgentIcon},
  { id: 'important', label: '중요한 일이에요!', icon: ImportantIcon },
  { id: 'postponable', label: '미뤄도 괜찮아요!', icon: DelayIcon},
  { id: 'notUrgent', label: '긴급하지 않아요!', icon: NormalIcon },
];

function CategorySelector({ value, onChange }) {
  return (
    <S.Container>
      {CATEGORIES.map(({ id, label, icon }) => {
        const isSelected = value === id;
        return (
          <S.CategoryButton
            key={id}
            type="button"
            $selected={isSelected}
            onClick={() => onChange(id)}
          >
            <img src={icon} alt={label} width={18} height={18} />
            <span>{label}</span>
          </S.CategoryButton>
        );
      })}
    </S.Container>
  );
}

export default CategorySelector;
