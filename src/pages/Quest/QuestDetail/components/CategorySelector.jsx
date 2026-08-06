import * as S from './CategorySelector.style';

import UrgentIcon from '../../../../assets/ic_urgent.svg';   // 느낌표
import ImportantIcon from '../../../../assets/ic_star.svg'; // 반짝이
import DelayIcon from '../../../../assets/ic_clock.svg';    // 시계
import NormalIcon from '../../../../assets/ic_minus.svg';   // 마이너스

// 백엔드 enum 값과 매핑된 카테고리 목록
export const CATEGORIES = [
  { 
    id: 'urgent', 
    categoryEnum: 'IMPORTANT_URGENT', 
    label: '긴급한 일이에요!', 
    icon: UrgentIcon 
  },
  { 
    id: 'important', 
    categoryEnum: 'IMPORTANT_NOT_URGENT', 
    label: '중요한 일이에요!', 
    icon: ImportantIcon 
  },
  { 
    id: 'postponable', 
    categoryEnum: 'NOT_IMPORTANT_URGENT', 
    label: '미뤄도 괜찮아요!', 
    icon: DelayIcon 
  },
  { 
    id: 'notUrgent', 
    categoryEnum: 'NOT_IMPORTANT_NOT_URGENT', 
    label: '긴급하지 않아요!', 
    icon: NormalIcon 
  },
];

function CategorySelector({ value, onChange }) {
  return (
    <S.Container>
      {CATEGORIES.map(({ id, categoryEnum, label, icon }) => {
        // value가 id('urgent')일 수도 있고 enum('IMPORTANT_URGENT')일 수도 있으므로 둘 다 비교
        const isSelected = value === id || value === categoryEnum;

        return (
          <S.CategoryButton
            key={id}
            type="button"
            $selected={isSelected}
            onClick={() => onChange(categoryEnum)} // 백엔드로 넘길 enum 값을 전달
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
