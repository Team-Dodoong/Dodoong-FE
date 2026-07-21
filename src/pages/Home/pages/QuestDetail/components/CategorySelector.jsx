import * as S from './CategorySelector.style';

export const CATEGORY_OPTIONS = [
  { key: 'urgent', label: '긴급한 일이에요!' },
  { key: 'important', label: '중요한 일이에요!' },
  { key: 'postponable', label: '미뤄도 괜찮아요!' },
  { key: 'notUrgent', label: '긴급하지 않아요!' },
];

// 아이젠하워 매트릭스 스타일의 퀘스트 카테고리 선택
function CategorySelector({ value, onChange }) {
  return (
    <S.Grid>
      {CATEGORY_OPTIONS.map(({ key, label }) => (
        <S.Chip
          key={key}
          type="button"
          $active={value === key}
          onClick={() => onChange(key)}
        >
          {label}
        </S.Chip>
      ))}
    </S.Grid>
  );
}

export default CategorySelector;
